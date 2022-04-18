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
};

SelectField.defaultProps = {
    name: '',
    value: null,
    placeholder: '',
    options: [],
    disabled: false,
    rules: [],
    label: '',
    defaultValue: ''
};

function SelectField(props) {
    const { name, defaultValue, label, disabled, placeholder, options, rules } = props;

    return (
        <Form.Item name={name} rules={rules} label={label} className='select-field'>
            <Select
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                disabled={disabled}
                options={options} >
            </Select>
        </Form.Item >
    );
}

export default SelectField;