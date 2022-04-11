import React from 'react';
import PropTypes from 'prop-types';
import "./FeedBackItem.scss";
import { ICONS } from 'constants';
import { getMessageByScore } from 'assets/globaJS'

FeedBackItem.propTypes = {
    fbInfo: PropTypes.object,
};

FeedBackItem.defaultProps = {
    fbInfo: {},
};

function FeedBackItem(props) {
    const { fbInfo } = props;

    return (
        <div className='feedback-item'>
            <div style={{ flexBasis: "35%" }}>
                <div>
                    <div className='feedback-item__personal-info'>
                        <div className='feedback-item__personal-info__avatar'>
                            {
                                fbInfo?.MaKH.Avatar ? <img src={fbInfo.MaKH.Avatar} alt='avatar' /> : fbInfo.MaKH.HoTen.charAt(0).toUpperCase()
                            }
                        </div>
                        <div className='feedback-item__personal-info__info'>
                            <div className='feedback-item__personal-info__info__name'>{fbInfo.MaKH.HoTen}</div>
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
                        <div>{fbInfo?.MaPhong.TenPhong}</div>
                    </div>
                    <div className='item'>
                        {ICONS.CALENDAR}
                        <div>1 đêm ·  Tháng 3-2019 (chưa biết)</div>
                    </div>
                    <div className='item'>
                        {ICONS.COUPLE}
                        <div>Cặp đôi (chưa biết)</div>
                    </div>
                </div>
            </div>
            <div style={{ flexGrow: 1, display: 'flex' }}>

                <div className='feedback-item__content'>
                    <div>
                        <div className="date">
                            {
                                `ngày ${new Date(fbInfo?.NgayTao).getDate()} tháng ${new Date(fbInfo?.NgayTao).getMonth() + 1} năm ${new Date(fbInfo?.NgayTao).getFullYear()}`}
                        </div>
                        <div className="title">{getMessageByScore(fbInfo.Diem)}</div>
                        <div className="message">
                            · {fbInfo?.BinhLuan}
                        </div>
                        {
                            fbInfo?.TraLoi && <div className='response-message'>
                                <h6>
                                    {ICONS.CHAT}
                                    Phản hồi của khách sạn:</h6>
                                <div>Thank you so much!</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='score'>{parseFloat(fbInfo.Diem).toFixed(1)}</div>
            </div>
        </div>
    );
}

export default FeedBackItem;