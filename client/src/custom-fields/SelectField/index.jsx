import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import "./SelectField.scss";
import { Select } from 'antd';

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
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
    label: '',
    defaultValue: ''
};

function SelectField(props) {
    const { name, defaultValue, label, disabled, placeholder, options } = props;

    return (
        <div className='select-field'>
            <label>{label}</label>
            <Select
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                disabled={disabled}
                name={name}
                options={options} >
            </Select>
        </div>
    );
}

export default SelectField;