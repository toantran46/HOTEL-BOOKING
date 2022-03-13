import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./HotelSaved.scss";
HotelSaved.propTypes = {

};

function HotelSaved(props) {
    return (
        <div className='hotel-saved'>
            <Title main='Danh sách phòng đã lưu' />
        </div>
    );
}

export default HotelSaved;