import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./PlaceSaved.scss";
PlaceSaved.propTypes = {

};

function PlaceSaved(props) {
    return (
        <div className='place-saved'>
            <Title main='Danh sách phòng đã lưu' />
        </div>
    );
}

export default PlaceSaved;