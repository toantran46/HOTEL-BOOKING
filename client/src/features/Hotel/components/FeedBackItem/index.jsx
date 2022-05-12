import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FeedBackItem.scss";
import { ICONS } from "constants";
import { getMessageByScore } from "assets/globaJS";
import { MessageOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { phanHoiApi } from "api/PhanHoiApi";

const { TextArea } = Input;

FeedBackItem.propTypes = {
  fbInfo: PropTypes.object,
  isOwner: PropTypes.bool,
};

FeedBackItem.defaultProps = {
  fbInfo: {},
  isOwner: false,
};

function FeedBackItem(props) {
  const { fbInfo, isOwner } = props;

  const onFinish = async (values) => {
    await phanHoiApi.update(fbInfo._id, values);
    setShowForm(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="feedback-item">
      <div style={{ flexBasis: "35%" }}>
        <div>
          <div className="feedback-item__personal-info">
            <div className="feedback-item__personal-info__avatar">
              {fbInfo?.MaKH.Avatar ? (
                <img src={fbInfo.MaKH.Avatar} alt="avatar" />
              ) : (
                fbInfo?.MaKH?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="feedback-item__personal-info__info">
              <div className="feedback-item__personal-info__info__name">
                {fbInfo.MaKH.name}
              </div>
              <div className="feedback-item__personal-info__info__location">
                <img
                  src="https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png"
                  alt="location"
                />
                <span>Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-item__items">
          <div className="item">
            {ICONS.BED}
            <div>{fbInfo?.MaPhong?.TenPhong}</div>
          </div>
          <div className="item">
            {ICONS.CALENDAR}
            <div>{`Ngày ${new Date(fbInfo?.NgayTao).getDate()} tháng ${new Date(fbInfo?.NgayTao).getMonth() + 1
              } năm ${new Date(fbInfo?.NgayTao).getFullYear()}`}</div>
          </div>
          <div className="item">
            {ICONS.COUPLE}
            <div>Cặp đôi (chưa biết)</div>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1, display: "flex" }}>
        <div className="feedback-item__content">
          <div>
            <div className="date">
              {`ngày ${new Date(fbInfo?.NgayTao).getDate()} tháng ${new Date(fbInfo?.NgayTao).getMonth() + 1
                } năm ${new Date(fbInfo?.NgayTao).getFullYear()}`}
            </div>

            <div className="title-container">
              <div className="title">{getMessageByScore(fbInfo.Diem)}</div>
              {
                isOwner &&
                <MessageOutlined
                  onClick={() => setShowForm(!showForm)}
                  className="response-btn"
                />
              }
            </div>

            {showForm && (
              <Form
                name="response"
                initialValues={{
                  TraLoi: "",
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Phản hồi"
                  name="TraLoi"
                  style={{ marginBottom: "0.8rem" }}
                  rules={[
                    {
                      required: true,
                      message: "Nhập phản hồi của bạn ...!",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gửi phản hồi
                  </Button>
                </Form.Item>
              </Form>
            )}

            <div className="message">· {fbInfo?.BinhLuan}</div>
            {fbInfo?.TraLoi && (
              <div className="response-message">
                <h6>
                  {ICONS.CHAT}
                  Phản hồi của khách sạn:
                </h6>
                <div>{fbInfo.TraLoi}</div>
              </div>
            )}
          </div>
        </div>
        <div className="score">{parseFloat(fbInfo.Diem).toFixed(1)}</div>
      </div>
    </div>
  );
}

export default FeedBackItem;
