import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './FormSign.scss';
import FooterPartner from '../FooterPartner';
import { useDispatch } from 'react-redux';
import { getMe, login } from 'app/userSlice';

import { toastError, toastSucsess } from 'utils/notifi';



FormSign.propTypes = {

};

function FormSign(props) {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const handleLogin = async (values) => {
        // console.log(values);
        // setNotifi("");
        setIsLoading(true);
        const logged = async (getme) => {
            const { error, payload } = await dispatch(login(values));
            // console.log(error)
            // console.log(payload)
            if (error) {
                setIsLoading(false);
                toastError('Tài khoản hoặc mật khẩu không đúng');
            } else {
                toastSucsess('Đăng nhập thành công');
                getme();
            }
        }

        const getme = async () => {
            const response = await dispatch(getMe());
            // console.log(response);
            if (!response.error) {
                setIsLoading(false);
                navigate('/');
                // toastSucsess('Đăng nhập thành công');
            }
        }
        setTimeout(async () => {
            logged(getme);
            setIsLoading(false);
        }, 1500);


    }

    const defaultValues = {
        email: '',
        password: '',
    }

    return (
        <div className='form-site'>
            <div className="form-site__label">
                Đăng nhập tài khoản
            </div>
            <Form
                layout='vertical'
                form={form}
                className="login-form"
                initialValues={defaultValues}
                onFinish={(values) => handleLogin(values)}
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
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
                        Đăng nhập
                    </Button>

                    <div className="loggin-form-link-regis">
                        <Link to={'/auth/register-user'}>
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