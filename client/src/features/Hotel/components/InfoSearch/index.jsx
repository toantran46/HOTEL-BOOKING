import React from 'react';
import PropTypes from 'prop-types';

import "./InfoSearch.scss";
import InputField from 'custom-fields/InputField';
import { Col, Row } from 'reactstrap';
InfoSearch.propTypes = {

};

function InfoSearch(props) {
    const [isEdit, setIsEdit] = React.useState(false);

    return (
        <div className='info-search'>
            <div className='info-search__time'>
                <div className='info-search__time__receiveDate'>
                    <div className='title'>Ngày nhận phòng</div>
                    <div className='date' onClick={() => setIsEdit(true)} >T7 Ngày 12 Tháng 3 Năm 2022</div>
                    <div className='hour'>Từ 15:00</div>
                </div>
                <div className='info-search__time__returnDate'>
                    <div className='title'>Ngày trả phòng</div>
                    <div className='date' onClick={() => setIsEdit(true)} >T7 Ngày 12 Tháng 3 Năm 2022</div>
                    <div className='hour'>Nghỉ 5 đêm</div>
                </div>
            </div>
            <a onClick={() => setIsEdit(true)} className="btn-primary">Thay đổi tìm kiếm</a>

            {
                isEdit &&
                <div className='info-search__modal'>

                    <div className='info-search__modal__formEdit'>
                        <div className='info-search__modal__formEdit__header'>
                            <div className='title'>Thay đổi chi tiết của bạn</div>
                            <i onClick={() => setIsEdit(false)} class="bi bi-x-octagon-fill" />
                        </div>
                        <Row className='info-search__modal__formEdit__main'>
                            <Col>
                                <InputField
                                    label='Ngày nhận phòng'
                                    name='receiveDate'
                                    type="datetime-local" />
                            </Col>
                            <Col>
                                <InputField
                                    label='Ngày trả phòng'
                                    name='returnDate'
                                    type="datetime-local" />
                            </Col>
                            <Col>
                                <a className="btn-primary">Kiểm tra phòng trống</a>
                            </Col>
                        </Row>
                    </div>
                </div>
            }

        </div>
    );
}

export default InfoSearch;