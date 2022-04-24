import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './FormSign.scss';
import FooterPartner from '../FooterPartner';
import { useDispatch } from 'react-redux';
import { getMe, login } from 'app/userSlice';

FormSign.propTypes = {

};

function FormSign(props) {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    const handleLogin = async (values) => {
        console.log(values);
        // setNotifi("");
        setIsLoading(true);
        const register = async () => {
            const { error, payload } = await dispatch(login(values));
            if (error) {
                setIsLoading(false);
                alert(payload.message);
            } else {
                navigate('/auth/about');
                alert('Đăng nhập thành công !');
            }
        }
        setTimeout(() => {
            register();
            setIsLoading(false);
        }, 2000)

        // // const response = await dispatch(getMe());
        // if (response.error) {
        //     setIsLoading(false);
        //     message.success("Đăng nhập thành công");
        // }
    }

    const defaultValues = {
        email: '',
        password: '',
    }

    return (
        <div className='form-site'>
            <div className="form-site__label">
                Đăng nhập để quản lý chỗ nghỉ
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