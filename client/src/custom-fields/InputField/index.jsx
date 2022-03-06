import React from 'react';
import PropTypes from 'prop-types';

import "./InputField.scss";
import { FormGroup, Input } from 'reactstrap';

InputField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

InputField.defaultProps = {
    name: '',
    value: null,
    placeholder: '',
    type: 'text',
    disabled: false,
    label: '',
};

function InputField(props) {
    const { name, value, placeholder, type, disabled, label } = props;
    return (
        <FormGroup className='input-field'>
            <label>{label}</label>
            <Input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
            />
        </FormGroup>
    );
}

export default InputField;