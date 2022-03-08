import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import './FormSign.scss';
import FooterPartner from '../FooterPartner';

FormSign.propTypes = {

};

function FormSign(props) {
    return (
        <div className='form-site'>
            <div className="form-site__label">
                Đăng nhập để quản lý chỗ nghỉ
            </div>
            <Form>
                <FormGroup>
                    <Label for="userName">
                        Email/Tên đăng nhập
                    </Label>
                    <Input
                        id="emailExample"
                        name="email"
                        placeholder="Nhập email/tên đăng nhập"
                        type='email'
                    >
                    </Input>
                    <FormGroup>
                        <Label for="password">
                            Mật khẩu
                        </Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            type="password"
                        />
                    </FormGroup>
                    <Button color='primary'>
                        Đăng nhập
                    </Button>
                </FormGroup>
                <div className="forget-pass">
                    <a href="#">Quên mật khẩu ?</a>
                </div>
            </Form>
            <FooterPartner />
        </div>
    );
}

export default FormSign;