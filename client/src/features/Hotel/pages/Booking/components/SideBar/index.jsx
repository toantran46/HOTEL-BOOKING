import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./SideBar.scss";
SideBar.propTypes = {

};

function SideBar(props) {
    return (
        <div className='side-bar-booking'>
            <div className="side-bar-booking__box">
                <h6>Chi tiết đặt phòng của bạn</h6>
                <div className='time'>
                    <div>
                        <div className='sub-title'>Nhận phòng</div>
                        <div className='main-content'>T5 Ngày 7 Tháng 4 Năm 2022</div>
                        <span className='from'>Từ 15:00</span>
                    </div>
                    <div>
                        <div className='sub-title'>Trả phòng</div>
                        <div className='main-content'>T5 Ngày 7 Tháng 4 Năm 2022</div>
                        <span className='from'>Từ 15:00</span>
                    </div>
                </div>
                <div className='sub-title'>Tổng thời gian lưu trú: </div>
                <span className='main-content'>1 đêm </span>
                <hr />
                <h6 className='sub-title'>Bạn đã chọn </h6>
                <div>Phòng Superior 2 giường đơn nhìn ra cảnh thành phố</div>
                <br />
                <Link to="/">Đổi lựa chọn của bạn</Link>
            </div>

            <div className="side-bar-booking__box">
                <div className="sub-title">Tóm tắt giá</div>
                <div className='info-price'>
                    <div>Phòng Superior 2 giường đơn nhìn ra cảnh thành phố</div>
                    <div>VND 1.994.000</div>
                </div>
                <div className='info-price'>
                    <div>8 % Thuế GTGT</div>
                    <div>VND 167.496</div>
                </div>
                <div className='info-price'>
                    <div>5 % Phí dịch vụ của chỗ nghỉ</div>
                    <div>VND 99.700</div>
                </div>
                <div className='info-price total-price'>
                    <div>Giá <span>(cho tất cả các khách)</span>
                    </div>
                    <div>VND 2.261.196
                        <div className='note'>
                            <span> Không Bị Bất Ngờ!</span> Giá cuối cùng.
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-bar-booking__box">
                <div className="sub-title">Lịch thanh toán của bạn</div>
                <div className='more-info'>Không cần thanh toán hôm nay. Bạn sẽ trả khi đến nghỉ.</div>
            </div>
            <div className="side-bar-booking__box">
                <div className="sub-title">Chi phí hủy là bao nhiêu?</div>
                <div className='more-info'>Miễn phí hủy đến 23:59, ngày 5 Tháng 4.</div>
                <div className='info-price'>
                    <div>Từ 00:00 ngày ngày 6 Tháng 4</div>
                    <div>VND 2.261.196</div>
                </div>
            </div>

            <div className="side-bar-booking__box">
                <div className='sub-title'>Ghi chú</div>
                Do virus corona (COVID-19), vui lòng đảm bảo rằng bạn chỉ đặt phòng chỗ nghỉ này theo hướng dẫn của chính quyền địa phương về điểm đến, bao gồm nhưng không giới hạn mục đích của việc đi lại và số người tối đa trong nhóm được phép.
            </div>
        </div>
    );
}

export default SideBar;