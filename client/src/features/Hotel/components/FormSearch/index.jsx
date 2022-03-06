import React from 'react';
// import PropTypes from 'prop-types';
import { Form, FormGroup, Input } from 'reactstrap';
import InputField from 'custom-fields/InputField';


import "./FormSearch.scss";
// FormSearch.propTypes = {

// };

function FormSearch(props) {

    return (
        <div className='form-search'>
            <p>Tìm</p>
            <Form>
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