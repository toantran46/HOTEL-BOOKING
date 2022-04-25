import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./Profile.scss";

import { Form, message, Upload } from 'antd'
import InputField from "custom-fields/InputField"
import { CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';

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
    const [currentAvatar, setCurrentAvatar] = React.useState();

    const initialValues = {
        _id: "625d5cb42ded7ddeafe07524",
        Quyen: "USER",
        Avatar: "",
        email: "vietlinhst2013@gmail.com",
        name: "Trương Việt Linh",
        phone: "0362446522"
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

    const handleSaveInfo = values => {
        console.log({ values });
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
                                    : <div className='not-avatar'>L</div>}
                                <Upload
                                    onChange={(e) => handleUpload(e)}
                                    beforeUpload={() => handleBeforeUpload()}>
                                    <CameraOutlined />
                                </Upload>
                            </div>
                        </Form.Item>
                        <InputField name='name' label='Họ tên' rules={[{ required: true, message: 'Họ tên không được để trống' }]} />
                        <InputField name='email' type='email' label='Email' rules={[{ required: true, message: 'Email không được để trống' }]} />
                        <InputField name='phone' label='Số điện thoại' rules={[{ required: true, message: 'Số điện thoại không được để trống' }]} />
                        <InputField name='Quyen' label='Quyền' disabled />
                        <button className='btn-primary'>Lưu</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Profile;