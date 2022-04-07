import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./evaluationform.scss";
import { CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function EvaluationForm({ setShowFeedBackForm }) {
  const [number, setNumber] = useState(10);

  const onFinish = (values) => {
    console.log("Success:", {
      MaKhachSan: "",
      MaKH: "",
      MaPhong: "",
      NgayTao: Date.now(),
      Diem: number,
      BinhLuan: values.binhluan,
      TraLoi: "",
    });
    setShowFeedBackForm(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={{
        binhluan: "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item style={{ marginLeft: "8px" }} label="Điểm">
        {/* scores */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          const classname = item === number ? "btn-item active" : "btn-item";
          return (
            <Button
              onClick={() => setNumber(item)}
              className={classname}
              type="default"
              shape="circle"
            >
              {item}
            </Button>
          );
        })}

        {/* Close Button */}
        <Button
          className="btn-item"
          onClick={() => setShowFeedBackForm(false)}
          icon={<CloseOutlined />}
        />
      </Form.Item>
      {/* Text Area */}
      <Form.Item
        label="Đánh giá"
        name="binhluan"
        rules={[
          {
            required: true,
            message: "Viết đánh giá của bạn...!",
          },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gửi đánh giá
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EvaluationForm;
