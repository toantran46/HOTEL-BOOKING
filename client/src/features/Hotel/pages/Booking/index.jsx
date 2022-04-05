import React from 'react';
import PropTypes from 'prop-types';
import "./Booking.scss";
import { Alert, Button, Col, Divider, Row, Select, Steps } from 'antd';
import ShowStar from 'features/Hotel/components/ShowStar';
import SideBar from './components/SideBar';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
Booking.propTypes = {

};

function Booking(props) {

    return (
        <div className='booking'>
            <Steps size='small' current={1}>
                <Steps.Step title="Bạn chọn" />
                <Steps.Step title="Chi tiết về bạn" />
                <Steps.Step title="Bước cuối cùng" />
            </Steps>
            <div className='booking__main'>
                <Row justify='space-between'>
                    <Col span={8}>
                        <SideBar />
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
                                <img src='https://t-cf.bstatic.com/xdata/images/hotel/square200/252174446.webp?k=6d49afcfce49ac9616e8fbfc273af26f30e47f63cec7bcced5e462b4e1756065&o=' alt='banner' />
                                <div>
                                    <div className='type'>Khách sạn  <ShowStar num={5} /> </div>
                                    <div className='name'>Pullman Vung Tau</div>
                                    <div className='address'>
                                        15 Thi Sach, Thang Tam, Vũng Tàu, Việt Nam
                                    </div>
                                    <div className='feed-back'>
                                        <div className='score'>8,0</div>
                                        <div className='message'>Rất tốt</div>
                                        <div className='num-voted'>760 đánh giá</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <StepTwo /> */}
                        <StepThree />
                    </Col>
                </Row>
            </div>


        </div>
    );
}

export default Booking;