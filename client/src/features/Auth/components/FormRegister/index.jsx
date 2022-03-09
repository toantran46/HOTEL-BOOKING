import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FooterPartner from '../FooterPartner';

import './FormRegister.scss';
import { Link } from 'react-router-dom';

FormRegister.propTypes = {

};

function FormRegister(props) {
    return (
        <div className='form-site'>
            <div className="form-site__label">
                Tạo tài khoản đối tác
            </div>
            <div className="form-site__text">
                Tạo tài khoản để đăng ký và quản lý khách sạn.
            </div>
            <Form>
                <FormGroup>
                    <FormGroup>
                        <Label for="userName">
                            Địa chỉ email <span> *</span>
                        </Label>
                        <Input
                            id="emailRegis"
                            name="emailRegis"
                            placeholder="Nhập email/tên đăng nhập"
                            type='email'
                        >
                        </Input>
                    </FormGroup>
                    <div className="helper">
                        * Chúng tôi sẽ gửi mã xác thực đến email này để xát nhận tài khoản.
                    </div>
                    <FormGroup>
                        <Label for="name">
                            Họ và tên <span>*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Nhập họ và tên"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">
                            Số điện thoại <span>*</span>
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="rePassword">
                            Mật khẩu <span>*</span>
                        </Label>
                        <Input
                            id="passRegis"
                            name="passRegis"
                            placeholder="Nhập mật khẩu"
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Xát nhận mật khẩu <span>*</span>
                        </Label>
                        <Input
                            id="rePassRegis"
                            name="rePassRegis"
                            placeholder="Nhập mật lại khẩu"
                            type="password"
                        />
                    </FormGroup>
                    <Button color='primary'>
                        Đăng kí
                    </Button>
                </FormGroup>
                <div className="forget-pass">
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