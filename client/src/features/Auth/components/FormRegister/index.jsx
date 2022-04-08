import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Button } from "antd";
import FooterPartner from '../FooterPartner';

import './FormRegister.scss';
import { Link } from 'react-router-dom';
import { number } from 'yup';

FormRegister.propTypes = {

};

function FormRegister(props) {
    const onFinish = (values) => {
        console.log(values);
    }
    return (
        <div className='form-site'>
            <div className="form-site__label">
                Tạo tài khoản đối tác
            </div>
            <div className="form-site__text">
                Tạo tài khoản để đăng ký và quản lý khách sạn.
            </div>
            <Form
                name="register"
                className="register-form"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "Vui lòng nhập đúng định dạng email",
                        },
                        {
                            required: true,
                            message: "Vui lòng điền email",
                        }
                    ]}
                >
                    <Input />

                </Form.Item>
                <div className="helper">
                    * Chúng tôi sẽ gửi mã xác thực đến email này để xát nhận tài khoản.
                </div>
                <Form.Item
                    name="name"
                    label="Họ tên"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng điền họ tên",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu",
                        },
                        {
                            min: 4,
                            message: "Mật khẩu có độ dài ít nhất 4 kí tự",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPass"
                    label="Xát nhận mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại"
                        },
                        {
                            min: 10,
                            max: 10,
                            message: "Vui lòng nhập đúng số điện thoại",
                        },
                        {
                            value: [0 - 9],
                            message: "Vui lòng chỉ nhập số",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Đăng kí
                </Button>
                <div className="available-account">
                    <Link to={'/auth/sign-in'}>
                        Đã có tài khoản ? Đăng nhập ngay
                    </Link>
                </div>
            </Form>
            <FooterPartner />
        </div>
    );
}

export default FormRegister;