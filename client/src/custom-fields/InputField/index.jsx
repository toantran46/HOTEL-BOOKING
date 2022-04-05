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
    onChange: PropTypes.func
};

InputField.defaultProps = {
    name: '',
    value: null,
    placeholder: '',
    type: 'text',
    disabled: false,
    label: '',
    onChange: null,
    allowClear: false
};

function InputField(props) {
    const { name, value, placeholder, type, disabled, label, onChange, allowClear } = props;
    return (
        <Form.Item
            name={name}
            label={label}>
            <Input
                allowClear={allowClear}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                disabled={disabled}

            />
        </Form.Item >
    );
}

export default InputField;