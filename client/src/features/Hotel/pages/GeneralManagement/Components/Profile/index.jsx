import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./Profile.scss";

import { Form, message, Spin, Upload } from 'antd'
import InputField from "custom-fields/InputField"
import { CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isObject } from 'lodash';
import { NguoiDungApi } from 'api/NguoiDungApi';
import { getMe } from 'app/userSlice';

Profile.propTypes = {

};

// handle getbase64 file 
const getbase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    })
}
function Profile(props) {
    const { user } = useSelector(state => state.auth)
    const [currentAvatar, setCurrentAvatar] = React.useState(() => user.Avatar);
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();

    const initialValues = {
        _id: user._id,
        Quyen: user.Quyen,
        Avatar: user.Avatar,
        email: user.email,
        name: user.name,
        phone: user.phone
    }

    const [form] = Form.useForm();
    const handleBeforeUpload = (file) => {
        const typesImage = ['image/jpeg', 'image/png'];
        if (!typesImage.includes(file.type)) {
            message.error(`File không hợp lệ !. Chỉ chấp nhận file ảnh có dạng [ ${typesImage} ]`);
            return true;
        }

        return false;
    }

    const handleUpload = async ({ file }) => {
        //uploaded successfully
        if (!file.status) {
            const base64 = await getbase64(file);
            console.log({ base64 });
            setCurrentAvatar(base64);
            form.setFieldsValue({ Avatar: file })
        }
    }

    const handleSaveInfo = async values => {

        try {
            setIsLoading(true);
            let data;
            if (isObject(values.Avatar)) {
                data = new FormData();
                data.append("Avatar", values.Avatar);
                data.append("Quyen", values.Quyen);
                data.append("email", values.email);
                data.append("name", values.name);
                data.append("phone", values.phone);
            } else {
                data = {
                    Quyen: values.Quyen,
                    email: values.email,
                    name: values.name,
                    phone: values.phone,
                }
            }

            //send data to server
            const response = await NguoiDungApi.update(user._id, data)
            setIsLoading(false);
            message.success(response.message);
            //get new data
            dispatch(getMe());

        } catch (error) {
            setIsLoading(false);
            const errMessage = error.response.data.message;
            message.error(errMessage);
        }


    }
    return (
        <div className='profile'>
            <div>
                <Title main='Thông tin cá nhân' sub='Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.' />
                <div className='profile__main-title'>
                    <Form
                        initialValues={initialValues}
                        onFinish={(values) => handleSaveInfo(values)}
                        form={form}
                        layout='vertical'
                        className='profile__main-title__form'>
                        <Form.Item
                            name="Avatar">
                            <div className='profile__main-title__form__avatar'>
                                {currentAvatar ?
                                    <img src={currentAvatar} alt='avatar' />
                                    : <div className='not-avatar'>{user?.name.charAt(0).toUpperCase()}</div>}
                                <Upload
                                    onChange={(e) => handleUpload(e)}
                                    beforeUpload={() => handleBeforeUpload()}>
                                    <CameraOutlined />
                                </Upload>
                            </div>
                        </Form.Item>
                        <InputField name='name' label='Họ tên' rules={[{ required: true, message: 'Họ tên không được để trống' }]} />
                        <InputField name='email' type='email' label='Email' disabled />
                        <InputField name='phone' label='Số điện thoại' rules={[{ required: true, message: 'Số điện thoại không được để trống' }]} />
                        <InputField name='Quyen' label='Quyền' disabled />
                        <button className='btn-primary'>Lưu {isLoading && <Spin size='small' />} </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Profile;