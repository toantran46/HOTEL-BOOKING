import React from 'react';
import PropTypes from 'prop-types';

import "./InputField.scss";
import { Form, Input } from 'antd';

InputField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    rules: PropTypes.array
};

InputField.defaultProps = {
    name: '',
    value: null,
    placeholder: '',
    type: 'text',
    disabled: false,
    label: '',
    onChange: null,
    allowClear: false,
    rules: []
};

function InputField(props) {
    const { name, value, placeholder, type, disabled, label, onChange, allowClear, rules } = props;
    return (
        <Form.Item
            className='input-field'
            name={name}
            rules={rules}
            label={label}>
            {
                type === "textarea" ? <Input.TextArea rows={5} /> :
                    <Input
                        allowClear={allowClear}
                        onChange={onChange}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}
                    />
            }
        </Form.Item >
    );
}

export default InputField;