import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import "./SelectField.scss";
import { Form, Select } from 'antd';

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    rules: PropTypes.array,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
};

SelectField.defaultProps = {
    name: '',
    value: null,
    // placeholder: '',
    options: [],
    disabled: false,
    rules: [],
    label: '',
    defaultValue: '',
    style: {},
    onChange: null,
};

function SelectField(props) {
    const { onChange, style, name, value, defaultValue, label, disabled, placeholder, options, rules, className } = props;
    return (
        <Form.Item
            style={style}
            initialValue={value}
            name={name} rules={rules} label={label} className='select-field'>
            <Select
                onChange={onChange}
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                options={options} >
            </Select>
        </Form.Item >
    );
}

export default SelectField;