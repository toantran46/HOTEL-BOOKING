import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import "./SelectField.scss";

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

SelectField.defaultProps = {
    name: '',
    value: null,
    placeholder: '',
    options: [],
    disabled: false,
    label: '',
};

function SelectField(props) {
    const { name, value, label, disabled, placeholder, options } = props;

    return (
        <div className='select-field'>
            <label>{label}</label>
            <Input
                disabled={disabled}
                name={name}
                type="select">
                {
                    options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)
                }
            </Input>
        </div>
    );
}

export default SelectField;