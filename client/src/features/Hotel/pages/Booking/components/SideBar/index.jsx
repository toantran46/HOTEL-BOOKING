import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./SideBar.scss";
import { convertToMoney, getDistanceByDate, handleDateByFormat } from 'assets/globaJS';
SideBar.propTypes = {
    timeInfo: PropTypes.object,
    roomSelected: PropTypes.array,
};

SideBar.defaultProps = {
    timeInfo: {},
    roomSelected: [],
};

function SideBar(props) {
    const { timeInfo, roomSelected, placeInfo } = props;

    const [totalPrice] = React.useState(() => roomSelected.reduce((a, room) => a + room.price, 0))
    const [totalNight] = React.useState(() => getDistanceByDate(timeInfo.receiveDate, timeInfo.returnDate))

    return (
        <div className='side-bar-booking'>
            <div className="side-bar-booking__box">
                <h6>Chi tiết đặt phòng của bạn</h6>
                <div className='time'>
                    <div>
                        <div className='sub-title'>Nhận phòng</div>
                        <div className='main-content'>{handleDateByFormat("DOW DD MM YYYY", timeInfo.receiveDate)}</div>
                        <span className='from'>Từ {placeInfo.timeGetAndReturnRoom.getFrom}:00</span>
                    </div>
                    <div>
                        <div className='sub-title'>Trả phòng</div>
                        <div className='main-content'>{handleDateByFormat("DOW DD MM YYYY", timeInfo.returnDate)}</div>
                        <span className='from'>Từ {placeInfo.timeGetAndReturnRoom.returnFrom}:00</span>
                    </div>
                </div>
                <div className='sub-title'>Tổng thời gian lưu trú: </div>
                <span className='main-content'>{totalNight} đêm </span>
                <hr />
                <h6 className='sub-title'>Bạn đã chọn </h6>
                {
                    roomSelected?.map((item, index) =>
                        <div key={index} className="mb-2">[{item.quantity}] {item.room.name}</div>
                    )
                }
                <br />
                <Link to={`/${placeInfo._id}`}>Đổi lựa chọn của bạn</Link>
            </div>

            <div className="side-bar-booking__box">
                <div className="sub-title">Tóm tắt giá</div>
                {
                    roomSelected?.map((item, index) =>
                        <div key={index} className='info-price'>
                            <div>[{item.quantity}] Phòng Superior 2 giường đơn nhìn ra cảnh thành phố</div>
                            <div>VND {convertToMoney(item.price)}</div>
                        </div>
                    )
                }

                <div className='info-price mt-5'>
                    <div>8 % Thuế GTGT</div>
                    <div>VND {convertToMoney(totalPrice * 0.08)}</div>
                </div>
                <div className='info-price'>
                    <div>5 % Phí dịch vụ của chỗ nghỉ</div>
                    <div>VND {convertToMoney(totalPrice * 0.05)}</div>
                </div>
                <div className='info-price total-price'>
                    <div>Giá <span>(cho tất cả các khách)</span>
                    </div>
                    <div>VND {convertToMoney(totalPrice * (1 + 0.08 + 0.05))}
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
                <div className='more-info'>[ Miễn phí ] nhưng {placeInfo.chargeCancleBooking.split("hoặc")[0] + handleDateByFormat("DD MM YYYY", timeInfo.receiveDate, -1)}</div>
                <div className='info-price'>
                    <div>Từ 00:00 {handleDateByFormat("DD MM YYYY", timeInfo.receiveDate, 1) + placeInfo.chargeCancleBooking.split("hoặc")[1]} </div>
                    <div>VND {convertToMoney(placeInfo.chargeCancleBooking.includes("tổng") ? totalPrice : (totalPrice / totalNight))}</div>
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