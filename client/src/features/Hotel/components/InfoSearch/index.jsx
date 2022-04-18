import { Button, DatePicker, Form } from "antd";
import { chooseDate } from "features/Hotel/HotelSlice";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import "./InfoSearch.scss";

InfoSearch.propTypes = {};

const formatDate = (moment) => {
  const date = new Date(moment);

  const dayOfWeek = date.getDay() !== 0 ? `T${date.getDay()}` : "Chủ nhật";
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (!date) return "";
  return `${dayOfWeek} Ngày ${day} Tháng ${month} Năm ${year}`;
};

function InfoSearch({ setDateFilter, dateFilter }) {
  const [isEdit, setIsEdit] = React.useState(false);

  const onFinish = (values) => {
    // console.log({ values })

    setDateFilter(values);
    setIsEdit(false);
  };

  return (
    <div className="info-search">
      <div className="info-search__time">
        <div className="info-search__time__receiveDate">
          <div className="title">Ngày nhận phòng</div>
          <div className="date" onClick={() => setIsEdit(true)}>
            {formatDate(dateFilter?.NgayNhanPhong?._d || new Date())}
          </div>
          <div className="hour">Từ 15:00</div>
        </div>
        <div className="info-search__time__returnDate">
          <div className="title">Ngày trả phòng</div>
          <div className="date" onClick={() => setIsEdit(true)}>
            {formatDate(
              dateFilter?.NgayTraPhong?._d ||
              new Date().setDate(new Date().getDate() + 1)
            )}
          </div>
          <div className="hour">Nghỉ 5 đêm</div>
        </div>
      </div>
      <a onClick={() => setIsEdit(true)} className="btn-primary">
        Thay đổi tìm kiếm
      </a>

      {isEdit && (
        <div className="info-search__modal">
          <div className="info-search__modal__formEdit">
            <div className="info-search__modal__formEdit__header">
              <div className="title">Thay đổi chi tiết của bạn</div>
              <i
                onClick={() => setIsEdit(false)}
                class="bi bi-x-octagon-fill"
              />
            </div>
            {/* <Row
              className="info-search__modal__formEdit__main"
              style={{ alignItems: "center" }}
            >
              <Col>
                <InputField
                  label="Ngày nhận phòng"
                  name="receiveDate"
                  type="datetime-local"
                />
              </Col>
              <Col>
                <InputField
                  label="Ngày trả phòng"
                  name="returnDate"
                  type="datetime-local"
                />
              </Col>
              <Col>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: "0.34rem 1rem",
                    marginTop: "8px",
                  }}
                >
                  Kiểm tra phòng trống
                </button>
              </Col>
            </Row> */}

            <Form
              name="search-date-form"
              className="info-search__modal__formEdit__main"
              layout="vertical"
              style={{ display: "flex", alignItems: "center" }}
              initialValues={{
                NgayNhanPhong: dateFilter?.NgayNhanPhong || moment(Date.now()),
                NgayTraPhong:
                  dateFilter?.NgayTraPhong ||
                  moment(new Date().setDate(new Date().getDate() + 1)),
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="NgayNhanPhong"
                style={{ flex: 2 }}
                label="Ngày nhận phòng"
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng chọn ngày!",
                  },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "95%" }} />
              </Form.Item>
              <Form.Item
                name="NgayTraPhong"
                style={{ flex: 2 }}
                label="Ngày trả phòng"
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng chọn ngày!",
                  },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "95%" }} />
              </Form.Item>
              <Form.Item label=" " style={{ flex: 0.5 }}>
                <Button
                  htmlType="submit"
                  style={{ backgroundColor: "#0071c2", color: "#fff" }}
                >
                  Kiểm tra phòng trống
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoSearch;
