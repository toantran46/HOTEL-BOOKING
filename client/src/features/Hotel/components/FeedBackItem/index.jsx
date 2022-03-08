import React from 'react';
import PropTypes from 'prop-types';
import "./FeedBackItem.scss";
import { ICONS } from 'constants';
FeedBackItem.propTypes = {

};

function FeedBackItem(props) {
    return (
        <div className='feedback-item'>
            <div style={{ flexBasis: "35%" }}>
                <div >
                    <div className='feedback-item__personal-info'>
                        <div className='feedback-item__personal-info__avatar'>
                            A
                        </div>
                        <div className='feedback-item__personal-info__info'>
                            <div className='feedback-item__personal-info__info__name'>Anh</div>
                            <div className='feedback-item__personal-info__info__location'>
                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                <span>Việt Nam</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='feedback-item__items'>
                    <div className='item'>
                        {ICONS.BED}
                        <div>Phòng Có Giường Cỡ Queen</div>
                    </div>
                    <div className='item'>
                        {ICONS.CALENDAR}
                        <div>1 đêm ·  Tháng 3-2019</div>
                    </div>
                    <div className='item'>
                        {ICONS.COUPLE}
                        <div>Cặp đôi</div>
                    </div>
                </div>
            </div>
            <div style={{ flexGrow: 1, display: 'flex' }}>

                <div className='feedback-item__content'>
                    <div>
                        <div className="date">
                            ngày 2 Tháng 5 năm 2019
                        </div>
                        <div className="title">Tuyệt vời</div>
                        <div className="message">
                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                            Nơi lý tưởng cho một kỳ nghỉ
                        </div>
                        <div className='response-message'>
                            <h6>
                                {ICONS.CHAT}
                                Phản hồi của khách sạn:</h6>
                            <div>Thank you so much!</div>
                        </div>
                    </div>
                </div>
                <div className='score'>9,6</div>
            </div>
        </div>
    );
}

export default FeedBackItem;