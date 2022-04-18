import React from 'react';
import PropTypes from 'prop-types';
import "./GeneralRule.scss";
import { ScrollToView } from 'assets/globaJS';
import { Col, Row, Timeline } from 'antd';
import { ICONS } from 'constants';
import TimeLine from '../TimeLine';
import { CreditCardOutlined, InfoCircleOutlined } from '@ant-design/icons';
GeneralRule.propTypes = {
    receiveDate: PropTypes.object,
    returnDate: PropTypes.object,
    cancelBook: PropTypes.string,
    credits: PropTypes.array,
};

GeneralRule.defaultProps = {
    receiveDate: { Tu: null, Den: null },
    returnDate: { Tu: null, Den: null },
    cancelBook: "",
    credits: [],
};

function GeneralRule(props) {

    const { receiveDate, returnDate, cancelBook, credits } = props;
    console.log({ cancelBook })

    return (
        <div className='general-rule' id='general-rule'>
            <div className='general-rule__header'>
                <div className='general-rule__header__title'>Quy tắc chung</div>
                <a className="btn-primary" onClick={() => ScrollToView("empty-room")}>Xem phòng trống</a>
            </div>
            <div className="general-rule__wrapper">

                <Row gutter={[30, 0]}>
                    <Col span={4}>
                        <div className='general-rule__wrapper__title'><span className='icon'>{ICONS.CALENDARV2}</span> Nhận phòng</div>
                    </Col>
                    <Col span={19}>
                        <TimeLine from={receiveDate?.Tu} to={receiveDate?.Den} />
                        <div className='general-rule__wrapper__more-info'>
                            Khách được yêu cầu xuất trình giấy tờ tùy thân có ảnh và thẻ tín dụng lúc nhận phòng <br />
                            Trước đó bạn sẽ cần cho chỗ nghỉ biết giờ bạn sẽ đến nơi.
                        </div>
                    </Col>
                </Row>
                <br />
                <Row gutter={[30, 0]}>
                    <Col span={4}>
                        <div className='general-rule__wrapper__title'><span className='icon'>{ICONS.CALENDARV2}</span> Trả phòng</div>
                    </Col>
                    <Col span={19}>
                        <TimeLine from={returnDate?.Tu} to={returnDate?.Den} />
                    </Col>
                </Row>
                <br />
                <Row gutter={[30, 0]}>
                    <Col span={4}>
                        <div className='general-rule__wrapper__title'><span className='icon'> <InfoCircleOutlined style={{ fontSize: 19 }} /></span> Hủy đặt phòng</div>
                    </Col>
                    <Col span={19}>
                        {cancelBook}
                    </Col>
                </Row>
                <br />
                <Row gutter={[30, 0]}>
                    <Col span={4}>
                        <div className='general-rule__wrapper__title'><span className='icon'> <CreditCardOutlined style={{ fontSize: 19 }} /></span> Thẻ được chấp nhận tại chỗ nghỉ này</div>
                    </Col>
                    <Col span={19}>
                        <ul className='general-rule__wrapper__list-credit-card'>
                            {
                                credits?.map(credit =>
                                    <li key={credit._id}>
                                        <img src={credit.Logo} alt='credit-card' />
                                    </li>
                                )
                            }
                        </ul>
                    </Col>
                </Row>

            </div>
        </div>
    );
}

export default GeneralRule;