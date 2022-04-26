import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Form, Input, message, Upload } from 'antd';
import { FormFeedback } from 'reactstrap';
import { CloudUploadOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

UploadField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    control: PropTypes.object,
    errors: PropTypes.object,
    value: PropTypes.array,
    maxCount: PropTypes.number,
};
UploadField.defaultProps = {
    name: '',
    label: '',
    control: {},
    errors: {},
    value: [],
    maxCount: 1,
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

function UploadField(props) {
    const {
        name,
        label,
        control,
        errors,
        value,
        maxCount
    } = props;

    const [fileList, setFileList] = React.useState(() => value.map((val, index) => (
        {
            uid: index,
            name: `image${index}.png`,
            status: 'done',
            url: val,
        })));

    const handleBeforeUpload = (file) => {
        const typesImage = ['image/jpeg', 'image/png'];
        if (!typesImage.includes(file.type)) {
            message.error(`File không hợp lệ !. Chỉ chấp nhận file ảnh có dạng [ ${typesImage} ]`);
            return true;
        }

        return false;
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const showError = !!errors[name];
                //hanle remove file 
                const handleRemove = async (file) => {
                    const newFileList = fileList.filter(f => f.uid !== file.uid);
                    setFileList(newFileList)
                    field.onChange(newFileList.length > 0 ? newFileList : null)
                    field.onBlur(true)
                }

                const handleUpload = async ({ file, fileList }) => {
                    //uploaded successfully
                    if (!file.status) {
                        // const base64 = await getbase64(file);
                        setFileList(fileList)
                        field.onChange(fileList.length > 0 ? fileList : null)
                        field.onBlur(true)
                    }
                }

                return (
                    <Form.Item
                        style={{ display: "block" }}
                        className="upload-field mb-1 mt-1"
                        label={label}>
                        <Upload
                            onRemove={handleRemove}
                            onChange={handleUpload}
                            maxCount={maxCount}
                            fileList={fileList}
                            beforeUpload={handleBeforeUpload}
                            listType='picture-card'>
                            <CloudUploadOutlined />
                        </Upload>
                        {showError && (
                            <div style={{ fontSize: '0.775rem', color: '#dc3545' }}>{errors[name]["message"]}</div>
                        )}
                    </Form.Item >
                );
            }}
        />
    );
}

export default UploadField;