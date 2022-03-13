import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import './FormSign.scss';
import FooterPartner from '../FooterPartner';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

FormSign.propTypes = {

};

const loginSchema = yup.object().shape({
    Email: yup.string().required("Vui lòng nhập email"),
    passWord: yup.string().required("Vui lòng nhập mật khẩu").min(5),
})
function FormSign(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className='form-site'>
            <div className="form-site__label">
                Đăng nhập để quản lý chỗ nghỉ
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="userName">
                        Email
                    </Label>
                    <Input
                        id="emaiSign"
                        name="email"
                        placeholder="Nhập email"
                        type='email'

                    />
                    {errors.Email && <p className='error-message'>{errors.Email.message}</p>}
                    <FormGroup>
                        <Label for="password">
                            Mật khẩu
                        </Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            type="password"
                            {...register("passWord")}
                        />
                        {errors.passWord && <p className='error-message'>{errors.passWord.message}</p>}
                    </FormGroup>
                    <Button color='primary' type='submit'>
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