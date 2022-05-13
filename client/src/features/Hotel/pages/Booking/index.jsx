import React from 'react';
import PropTypes from 'prop-types';
import "./Booking.scss";
import { Alert, Button, Col, Divider, Row, Select, Steps } from 'antd';
import ShowStar from 'features/Hotel/components/ShowStar';
import SideBar from './components/SideBar';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import { useSelector } from 'react-redux';
import { getMessageByScore } from 'assets/globaJS';
import { Link, useLocation } from 'react-router-dom';
import { tinDungApi } from 'api/TinDungApi';
Booking.propTypes = {

};

function Booking(props) {

    const { placeSelected, bookingInfo } = useSelector(state => state.hotelInfo.detailPage);
    const { currentStep } = useSelector(state => state.hotelInfo.bookingPage);
    const { state } = useLocation();

    const [currentBookingInfo, setCurrentBookingInfo] = React.useState(() => {
        return bookingInfo.find(info => info.placeInfo._id === placeSelected);
    })

    React.useEffect(() => {
        document.querySelector("body").scrollIntoView("body");
    }, [currentStep])

    return (
        <div className='booking'>
            {
                currentBookingInfo ?
                    <>
                        <Steps size='small' current={currentStep}>
                            <Steps.Step title="Bạn chọn" />
                            <Steps.Step title="Chi tiết về bạn" />
                            <Steps.Step title="Bước cuối cùng" />
                        </Steps>
                        <div className='booking__main'>
                            <Row justify='space-between' gutter={[20, 0]}>
                                <Col span={9}>
                                    <SideBar roomSelected={currentBookingInfo?.roomSelected} timeInfo={currentBookingInfo?.timeInfo} placeInfo={currentBookingInfo?.placeInfo} />
                                </Col>
                                <Col span={15}>
                                    <Alert
                                        showIcon
                                        description="Do virus corona (COVID-19), vui lòng đảm bảo rằng bạn chỉ đặt phòng chỗ nghỉ này theo hướng dẫn của chính quyền địa phương về điểm đến, bao gồm nhưng không giới hạn mục đích của việc đi lại và số người tối đa trong nhóm được phép."
                                        type="warning"
                                    />
                                    <br />
                                    <div className='booking__box'>
                                        <div className='hotel-selected'>
                                            <img src={currentBookingInfo?.placeInfo.banner} alt='banner' />
                                            <div>
                                                <div className='type'>{currentBookingInfo?.placeInfo.type}  <ShowStar num={currentBookingInfo?.placeInfo.rank} /> </div>
                                                <div className='name'>{currentBookingInfo?.placeInfo.name}</div>
                                                <div className='address'>
                                                    {currentBookingInfo?.placeInfo.address}
                                                </div>
                                                <div className='feed-back'>
                                                    <div className='score'>{parseFloat(currentBookingInfo?.placeInfo.mediumScore || 0).toFixed(1)}</div>
                                                    <div className='message'>{getMessageByScore(currentBookingInfo?.placeInfo.mediumScore)}</div>
                                                    <div className='num-voted'>{currentBookingInfo?.placeInfo.totalFeedBack ? `${currentBookingInfo?.placeInfo.totalFeedBack} đánh giá` : 'Chưa có đánh giá'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        currentStep === 2 &&
                                        <StepTwo roomSelected={currentBookingInfo?.roomSelected} placeInfo={currentBookingInfo?.placeInfo} timeInfo={currentBookingInfo?.timeInfo} />
                                    }
                                    {
                                        currentStep === 3 &&
                                        <StepThree credits={state?.credits} />
                                    }
                                </Col>
                            </Row>
                        </div>
                    </>
                    : <div>Vui lòng chọn phòng trước <Link to="/search"> Quay lại trang tìm kiếm</Link> </div>
            }

        </div>
    );
}

export default Booking;