import React from 'react';
import PropTypes from 'prop-types';
import "./Trip.scss"
import moment from 'moment';
import ShowStar from "features/Hotel/components/ShowStar"
import { getMessageByScore } from 'assets/globaJS'
import { Col, Row } from 'antd';
import { convertToMoney } from 'assets/globaJS/index';

Trip.propTypes = {
    bookInfo: PropTypes.object,
};

Trip.defaultProps = {
    bookInfo: {},
};

function Trip(props) {
    const { bookInfo } = props;
    return (
        <div className='trip'>
            <div className='trip__header'>
                <div className='trip__header__address vip-text-2'>{bookInfo?.MaKhachSan.ThanhPho.TenThanhPho}</div>
                <div className='trip__header__createAt'>Đặt lúc: {moment(bookInfo.NgayDatPhong).format("DD/MM/yyyy")}</div>
            </div>
            <div className='trip__body'>
                <Row gutter={[10, 0]}>
                    <Col span={9}>
                        <div className='trip__body__info-booking'>
                            <div className='main-title'>Thông tin đặt phòng</div>
                            <ul>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Tên (q.ly chổ nghĩ):</span>
                                    <span className='content'>{bookInfo?.MaKhachSan.QuanLy.name}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>SĐT (q.ly chổ nghĩ):</span>
                                    <span className='content'>{bookInfo?.MaKhachSan.QuanLy.phone}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Họ tên người đặt:</span>
                                    <span className='content'>{bookInfo?.MaNguoiDung?.name || bookInfo?.HoTenNguoiDat}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Ngày nhận phòng:</span>
                                    <span className='content'>{moment(bookInfo?.NgayNhanPhong).format("DD/MM/yyyy")}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Ngày trả phòng:</span>
                                    <span className='content'>{moment(bookInfo?.NgayTraPhong).format("DD/MM/yyyy")}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Trạng thái:</span>
                                    <span className='content vip-text-1'>{bookInfo?.TrangThai}</span>
                                </li>
                                <li className='trip__body__info-booking__item'>
                                    <span className='text-title'>Tổng tiền:</span>
                                    <span className='content total-price'>{convertToMoney(bookInfo?.TongTien)} VND</span>
                                </li>
                            </ul>
                        </div>

                    </Col>
                    <Col span={15}>
                        <div className='trip__body__info-place'>
                            <img src={bookInfo?.MaKhachSan.HinhAnh[0]} alt='place-image' />
                            <div>
                                <div className='type'>{bookInfo?.MaKhachSan.LoaiChoNghi.TenLoaiChoNghi}  <ShowStar num={bookInfo?.MaKhachSan.XepHang} /> </div>
                                <div className='name'>{bookInfo?.MaKhachSan.TenChoNghi}</div>
                                <div className='address'>
                                    {bookInfo?.MaKhachSan.DiaChi + ", " + bookInfo?.MaKhachSan.ThanhPho.TenThanhPho}
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
                                    {
                                        bookInfo?.ThongTinhPhong?.map((TTP) => <div key={TTP._id} className='content'>({TTP.SoLuong}) {TTP.Phong.TenPhong}</div>)
                                    }

                                </div>
                            </li>
                            <li className='trip__body__info-booking__item'>
                                <span className='text-title'>Yêu cầu:</span>
                                <span className='content'>{bookInfo?.YeuCau}</span>
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