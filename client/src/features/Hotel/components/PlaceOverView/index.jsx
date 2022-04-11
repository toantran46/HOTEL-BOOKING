import React from 'react';
import PropTypes from 'prop-types';

import "./PlaceOverView.scss";

import { Button } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import ShowStar from '../ShowStar';
import { message } from 'antd';
import { convertToMoney, getMessageByScore } from 'assets/globaJS';

PlaceOverView.propTypes = {
    placeInfo: PropTypes.object,
    isChoosenDate: PropTypes.bool,
    isActive: PropTypes.bool,
};

PlaceOverView.defaultProps = {
    placeInfo: {},
    isChoosenDate: false,
    isActive: false,
};


function PlaceOverView(props) {

    const { placeInfo, isChoosenDate, isActive } = props;

    const handlePickDate = () => {
        message.info("Vui lòng chọn ngày để xem giá");
        document.querySelector("input[type='date'][value='']")?.showPicker();
    }

    console.log({ isChoosenDate, Phong: placeInfo.Phong });
    const { state } = useLocation();
    return (
        <div className={`place-Over-View ${isActive ? 'room-active' : ''}`}>
            <img className='place-Over-View__banner' src={placeInfo?.HinhAnh[0]} alt="img" />
            <div className='place-Over-View__info'>
                <Link to={`/${placeInfo?._id}`} state={state && { ...state, roadmap: [...state?.roadmap, placeInfo?.TenChoNghi] }} className='place-Over-View__info__name'>{placeInfo?.TenChoNghi} <ShowStar num={placeInfo?.XepHang} /> </Link>
                <div className='place-Over-View__info__place'>{`${placeInfo?.DiaChi}, ${placeInfo?.ThanhPho[0]?.TenThanhPho}`}</div>
                {
                    placeInfo?.TienNghi?.slice(0, 2).map((tn, index) =>
                        <div key={index} className='place-Over-View__info__convenient'><span dangerouslySetInnerHTML={{ __html: tn.Icon }} /> {tn.TenTienNghi} </div>
                    )
                }
                <div className='place-Over-View__info__about'><svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M21.22 3.37a.75.75 0 00-.6-.59c-4.85-.9-10.6.55-13.37 3.36S3.1 14.39 3.88 19.05L2 21a.75.75 0 000 1 .74.74 0 00.53.22A.71.71 0 003 22l2-1.9a16.94 16.94 0 002.76.23c4.09 0 8.19-1.33 10.35-3.52 2.71-2.81 4.07-8.59 3.11-13.44zM17 15.75c-2.11 2.14-6.59 3.36-10.7 3L16.59 8.47a.75.75 0 000-1.06.77.77 0 00-1.07 0l-10.3 10.3c-.33-3.91.91-8.31 3.1-10.52s7.29-3.63 11.52-3c.67 4.22-.54 9.22-2.84 11.56z"></path></svg>
                    Chỗ nghỉ Du lịch bền vững</div>

                {(placeInfo.Phong[0] && isChoosenDate) ?
                    <div className='place-Over-View__info__roomInfo'>
                        <div className='place-Over-View__info__roomInfo__room-name'>{placeInfo?.Phong[0].TenPhong}</div>
                        <div className='place-Over-View__info__roomInfo__about-bed'>{placeInfo?.Phong[0]?.ThongTinGiuong[0].TenGiuong}</div>
                        {
                            placeInfo?.HuyDatPhong &&
                            <div className='place-Over-View__info__roomInfo__isCancle'>
                                <div>{placeInfo?.HuyDatPhong}</div>
                                <span>Bạn có thể hủy sau, nên hãy đặt ngay hôm nay để có giá tốt.</span>
                            </div>
                        }
                    </div>
                    :
                    <div className='place-Over-View__info__description'>Nằm ở thành phố Vũng Tàu, cách Bãi Sau 450 m, Pullman Vung Tau cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe riêng miễn phí, hồ bơi ngoài trời và trung tâm thể dục.</div>
                }
            </div>
            <div className='place-Over-View__feedback'>
                <div className='place-Over-View__feedback__header'>
                    <div className='place-Over-View__feedback__header__top'>
                        <div className='place-Over-View__feedback__header__top__message'>{getMessageByScore(placeInfo.DiemTB)}</div>
                        <div className='place-Over-View__feedback__header__top__vote'>{placeInfo.PhanHoi?.length > 0 ? `${placeInfo.PhanHoi?.length} đánh giá` : "Chưa có đánh giá"} </div>
                    </div>
                    <div className='score'>{parseFloat(placeInfo.DiemTB).toFixed(1)}</div>
                </div>
                {isChoosenDate ?
                    <div className='place-Over-View__feedback__choosen-date'>
                        {/* <div className='place-Over-View__feedback__choosen-date__old-price'>{roomInfo.oldPrice && `VND ${roomInfo.oldPrice}`}</div> */}
                        <div className='place-Over-View__feedback__choosen-date__current-price'>VND {convertToMoney(placeInfo.Phong[0].Gia)}</div>
                        <span>Đã bao gồm thuế và phí</span>
                        <Link state={state && { ...state, roadmap: [...state?.roadmap, placeInfo?.TenChoNghi] }} className='btn-primary' to={`/${placeInfo?._id}`}>Xem chổ trống {'›'} </Link>
                    </div>
                    :
                    <Button color='primary' onClick={() => handlePickDate()}>Hiển thị giá</Button>
                }
            </div>
        </div>
    );
}

export default PlaceOverView;