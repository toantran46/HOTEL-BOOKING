import React from 'react';
import PropTypes from 'prop-types';

import "./HotelOverView.scss";
import { Button } from 'reactstrap';
import { MdWater } from 'react-icons/md';
HotelOverView.propTypes = {

};

function HotelOverView(props) {
    return (
        <div className='Hotel-Over-View'>
            <img className='Hotel-Over-View__banner' src="https://t-cf.bstatic.com/xdata/images/hotel/square600/273953720.webp?k=099979974a69eb9fdc2c744d3e467428b4425ba74940c783dc5c9e140e2ff04a&o=&s=1" alt="img" />
            <div className='Hotel-Over-View__info'>
                <div className='Hotel-Over-View__info__name'>Vung Tau Melody Apartment</div>
                <div className='Hotel-Over-View__info__place'>Vũng Tàu</div>
                <div className='Hotel-Over-View__info__convenient'><MdWater /> Giáp biển</div>
                <div className='Hotel-Over-View__info__description'>Nằm ở thành phố Vũng Tàu, cách Bãi Sau 550 m và Bãi Dứa 1,2 km, Vung Tau Melody Apartment cung cấp chỗ nghỉ với WiFi miễn phí và khu vực ghế ngồi.</div>
            </div>
            <div className='Hotel-Over-View__feedback'>
                <div className='Hotel-Over-View__feedback__header'>
                    <div className='Hotel-Over-View__feedback__header__top'>
                        <div className='Hotel-Over-View__feedback__header__top__message'>Tuyệt vời</div>
                        <div className='Hotel-Over-View__feedback__header__top__vote'>628 đánh giá</div>
                    </div>
                    <div className='Hotel-Over-View__feedback__header__top__score'>8.6</div>
                </div>
                <Button color='primary'>Hiển thị giá</Button>
            </div>
        </div>
    );
}

export default HotelOverView;