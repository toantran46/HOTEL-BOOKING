import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./PlaceSaved.scss";
import { Alert } from 'antd';
PlaceSaved.propTypes = {
    placeSaved: PropTypes.array,
};

PlaceSaved.defaultProps = {
    placeSaved: [],
};

function PlaceSaved(props) {

    return (
        <div className='place-saved'>
            <Title main='Danh sách phòng đã lưu' />
            <Alert description="Tính năng chưa phát triển" closable showIcon />
        </div>
    );
}

export default PlaceSaved;