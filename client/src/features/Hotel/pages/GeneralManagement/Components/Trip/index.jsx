import React from 'react';
import PropTypes from 'prop-types';
import "./Trip.scss"

import ShowStar from "features/Hotel/components/ShowStar"
import { getMessageByScore } from 'assets/globaJS'
import { Col, Row } from 'antd';
Trip.propTypes = {

};

function Trip(props) {
    return (
        <div className='trip'>
            <div className='trip__header'>
                <div className='trip__header__address vip-text-2'>Vũng tàu</div>
                <div className='trip__header__createAt'>Đặt lúc: 22/2/2022</div>
            </div>
            <div className='trip__body'>
                <Row gutter={[10, 0]}>
                    <Col span={9}>
                        <div className='trip__body__info-booking'>
                            <div className='main-title'>Thông tin đặt phòng</div>
                            <ul>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Tên người liên hệ:</span>
                                    <span className='content'>Nguyễn Văn Bảy</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Số điện thoại:</span>
                                    <span className='content'>09847362898</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Họ tên người đặt:</span>
                                    <span className='content'>Trương Việt Linh</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Ngày nhận phòng:</span>
                                    <span className='content'>22/2/2022</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Ngày đặt phòng:</span>
                                    <span className='content'>24/2/2022</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Trạng thái:</span>
                                    <span className='content vip-text-1'>đã trả phòng</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Tổng tiền:</span>
                                    <span className='content total-price'>12.000.000 VND</span>
                                </li>
                            </ul>
                        </div>

                    </Col>
                    <Col span={15}>
                        <div className='trip__body__info-place'>
                            <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/61372313.jpg?k=ad1ba75dfdf05624a25250f9c8663ef649af6de80502fffd6df3441e2c80f28b&o=&hp=1' alt='place-image' />
                            <div>
                                <div className='type'>Khách sạn  <ShowStar num={5} /> </div>
                                <div className='name'>Pullman vũng tàu</div>
                                <div className='address'>
                                    15 nam từ liêm, Vũng Tàu
                                </div>
                                {/* <div className='feed-back'>
                            <div className='score'>{parseFloat(9).toFixed(1)}</div>
                            <div className='message'>{getMessageByScore(9)}</div>
                            <div className='num-voted'>8 đánh giá</div>
                        </div> */}
                            </div>

                        </div>
                        <hr />
                        <div className='main-title'>Thông tin phòng</div>
                        <ul>
                            <li className='trip__body__info-booking__item'>
                                <span className='text-title'>Phòng đã đặt:</span>
                                <div>
                                    <div className='content'>Phòng Executive, Quyền Lui Tới Lounge, 1 Giường Cỡ King</div>
                                    <div className='content'>Phòng Executive, Quyền Lui Tới Lounge, 2 Giường Đơn</div>

                                </div>
                            </li>
                            <li className='trip__body__info-booking__item'>
                                <span className='text-title'>Yêu cầu:</span>
                                <span className='content'>có gái trẻ đẹp mơn mỡn cở 18 tuổi đến 22 tuổi</span>
                            </li>

                        </ul>
                    </Col>
                </Row>

            </div>
            <div className='trip__footer'></div>

        </div>
    );
}

export default Trip;