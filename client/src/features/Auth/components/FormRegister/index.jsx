import React from 'react';

import { Form, Input, Button } from "antd";
import FooterPartner from '../FooterPartner';
import { Link, useNavigate } from 'react-router-dom';
import { NguoiDungApi } from 'api/NguoiDungApi';

import './FormRegister.scss';

FormRegister.propTypes = {

};

function FormRegister(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleRegister = (values) => {
        setIsLoading(true)
        console.log(values);
        const addUser = async () => {
            try {
                await NguoiDungApi.add({ ...values, Quyen: "MANAGER" });
                alert('Đăng kí thành công');
                navigate('/auth/about');
            } catch (error) {
                alert('Email hoặc số điện thoại đã tồn tại');
                console.log(error.message);
                navigate('/auth/register');

            }
        }
        setTimeout(() => {
            setIsLoading(false);
            addUser();
        }, 2000)
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

                layout='vertical'
                name="register"
                className="register-form"
                onFinish={(values) => handleRegister(values)}
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
                <Button type="primary" htmlType="submit" loading={isLoading}>
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