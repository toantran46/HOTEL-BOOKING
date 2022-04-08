import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './FormSign.scss';
import FooterPartner from '../FooterPartner';

FormSign.propTypes = {

};

function FormSign(props) {
    const onFinish = (values) => {
        console.log(values);
    }
    return (
        <div className='form-site'>
            <div className="form-site__label">
                Đăng nhập để quản lý chỗ nghỉ
            </div>
            <Form
                name="login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email',
                        },
                        {
                            type: 'email',
                            message: 'Email phải đúng định dạng'
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        className="input-login-area"
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                        },
                        {
                            min: 4,
                            message: 'Mật khẩu phải ít nhất 4 kí tự',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className="input-login-area"
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Link to={''}>
                        Quên mật khẩu
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                    <div className="loggin-form-link-regis">
                        <Link to={'/auth/register'}>
                            Chưa có tài khoản ? Đăng kí ngay
                        </Link>
                    </div>
                </Form.Item>
            </Form>
            <FooterPartner />
        </div>
    );
}

export default FormSign;