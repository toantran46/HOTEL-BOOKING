import React from 'react';
// import PropTypes from 'prop-types';
import InputField from 'custom-fields/InputField';


import "./FormSearch.scss";
import { Form } from 'antd';
// FormSearch.propTypes = {

// };

function FormSearch(props) {

    const { name, receiveDate, returnDate } = props;

    return (
        <div className='form-search'>
            <p>Tìm</p>
            <Form initialValues={props} layout="vertical">
                <InputField
                    name='placeName'
                    label='Tên chỗ nghỉ / điểm đến'
                />
                <InputField
                    name='receiveDate'
                    label='Ngày nhận phòng'
                    type='date'
                />
                <InputField
                    name='returnDate'
                    label='Ngày trả phòng'
                    type='date'
                />

                <button className='searchBtn'>Tìm</button>
            </Form>
        </div>
    );
}

export default FormSearch;