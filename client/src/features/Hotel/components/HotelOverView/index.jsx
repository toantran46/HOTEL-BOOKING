import React from 'react';
import PropTypes from 'prop-types';

import "./HotelOverView.scss";

import { Button } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import ShowStar from '../ShowStar';
import { message } from 'antd';

HotelOverView.propTypes = {
    hotelInfo: PropTypes.object,
    isChoosenDate: PropTypes.bool
};

HotelOverView.defaultProps = {
    hotelInfo: {},
    isChoosenDate: false
};

function HotelOverView(props) {

    const { hotelInfo: { _id, banner, name, place, convenients, star,
        description, votedMessage, votedNum,
        votedScore, roomInfo }, isChoosenDate } = props;

    const handlePickDate = () => {
        message.info("Vui lòng chọn ngày để xem giá");
        document.querySelector("input[type='date'][value='']")?.showPicker();
    }

    const { state } = useLocation();

    console.log(state);

    return (
        <div className='Hotel-Over-View'>
            <img className='Hotel-Over-View__banner' src={banner} alt="img" />
            <div className='Hotel-Over-View__info'>
                <Link to={`/${_id}`} state={state && { ...state, roadmap: [...state?.roadmap, name] }} className='Hotel-Over-View__info__name'>{name} <ShowStar num={star} /> </Link>
                <div className='Hotel-Over-View__info__place'>{place}</div>
                {
                    convenients?.map((convenient, index) =>
                        <div key={index} className='Hotel-Over-View__info__convenient'><svg viewBox="0 0 24 24" width="16" height="16">
                            <path d={convenient.icon} />
                        </svg> {convenient.name} </div>
                    )
                }
                <div className='Hotel-Over-View__info__about'><svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M21.22 3.37a.75.75 0 00-.6-.59c-4.85-.9-10.6.55-13.37 3.36S3.1 14.39 3.88 19.05L2 21a.75.75 0 000 1 .74.74 0 00.53.22A.71.71 0 003 22l2-1.9a16.94 16.94 0 002.76.23c4.09 0 8.19-1.33 10.35-3.52 2.71-2.81 4.07-8.59 3.11-13.44zM17 15.75c-2.11 2.14-6.59 3.36-10.7 3L16.59 8.47a.75.75 0 000-1.06.77.77 0 00-1.07 0l-10.3 10.3c-.33-3.91.91-8.31 3.1-10.52s7.29-3.63 11.52-3c.67 4.22-.54 9.22-2.84 11.56z"></path></svg>
                    Chỗ nghỉ Du lịch bền vững</div>

                {(roomInfo && isChoosenDate) ?
                    <div className='Hotel-Over-View__info__roomInfo'>
                        <div className='Hotel-Over-View__info__roomInfo__room-name'>{roomInfo.name}</div>
                        <div className='Hotel-Over-View__info__roomInfo__about-bed'>{roomInfo.bed}</div>
                        {
                            roomInfo.isCancle &&
                            <div className='Hotel-Over-View__info__roomInfo__isCancle'>
                                <div>Miễn phí hủy</div>
                                <span>Bạn có thể hủy sau, nên hãy đặt ngay hôm nay để có giá tốt.</span>
                            </div>
                        }
                    </div>
                    :
                    <div className='Hotel-Over-View__info__description'>{description}</div>
                }
            </div>
            <div className='Hotel-Over-View__feedback'>
                <div className='Hotel-Over-View__feedback__header'>
                    <div className='Hotel-Over-View__feedback__header__top'>
                        <div className='Hotel-Over-View__feedback__header__top__message'>{votedMessage}</div>
                        <div className='Hotel-Over-View__feedback__header__top__vote'>{votedNum ? `${votedNum} đánh giá` : "Chưa có đánh giá"} </div>
                    </div>
                    <div className='score'>{votedScore}</div>
                </div>
                {isChoosenDate ?
                    <div className='Hotel-Over-View__feedback__choosen-date'>
                        <div className='Hotel-Over-View__feedback__choosen-date__old-price'>{roomInfo.oldPrice && `VND ${roomInfo.oldPrice}`}</div>
                        <div className='Hotel-Over-View__feedback__choosen-date__current-price'>VND {roomInfo.price}</div>
                        <span>Đã bao gồm thuế và phí</span>
                        <Link state={state && { ...state, roadmap: [...state?.roadmap, name] }} className='btn-primary' to={`/${_id}`}>Xem chổ trống {'›'} </Link>
                    </div>
                    :
                    <Button color='primary' onClick={() => handlePickDate()}>Hiển thị giá</Button>
                }
            </div>
        </div>
    );
}

export default HotelOverView;