import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'custom-fields/InputField';


import "./FormSearch.scss";
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { chooseDate, saveSearchValue } from 'features/Hotel/HotelSlice';
FormSearch.propTypes = {
    name: PropTypes.string,
    receiveDate: PropTypes.string,
    returnDate: PropTypes.string,
    onSearch: PropTypes.func,
};
FormSearch.defaultProps = {
    name: '',
    receiveDate: '',
    returnDate: '',
    onSearch: null,
};

function FormSearch(props) {

    const { name, receiveDate, returnDate, onSearch } = props;
    const dispatch = useDispatch();

    const handleSearch = values => {
        dispatch(saveSearchValue(values.placeName));
        dispatch(chooseDate({ type: "receiveDate", receiveDate: values.receiveDate }));
        dispatch(chooseDate({ type: "returnDate", returnDate: values.returnDate }));
        onSearch();
    }

    return (
        <div className='form-search'>
            <p>Tìm</p>
            <Form initialValues={props} layout="vertical" onFinish={(values) => handleSearch(values)}>
                <InputField
                    name='placeName'
                    label='Tên, loại chỗ nghỉ / điểm đến /'
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

                <button type='submit' className='searchBtn'>Tìm</button>
            </Form>
        </div>
    );
}

export default FormSearch;