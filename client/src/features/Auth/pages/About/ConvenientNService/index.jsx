import React from 'react';
import PropTypes from 'prop-types';

import './ConvenientNService.scss';
import { Button, Col, Form, Input, Label } from 'reactstrap';

ConvenientNService.propTypes = {

};

function ConvenientNService(props) {
    return (
        <div className='convenient-and-service'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form>
                        <fieldset>
                            <Label className='label-big'>
                                Chỗ đậu xe
                            </Label >
                            <div className="describe-block">
                                <div className="describe-block__text">
                                    <p>Thông tin này đặc biệt quan trọng đối với những khách đến chỗ nghỉ của Quý vị bằng ô tô.</p>
                                </div>
                            </div>
                            <Col sm={7} className='form-group'>
                                <Label>
                                    Qúy vị có chỗ đậu xe cho khách không?
                                </Label>
                                <Input
                                    id="selectParking"
                                    name="selectParking"
                                    type="select"
                                >
                                    <option value="0">Không</option>
                                    <option value="1">Có</option>
                                </Input>
                            </Col>
                        </fieldset>
                        <fieldset>
                            <Label className='label-big'>
                                Bữa sáng
                            </Label>
                            <Col sm={7} className='form-group'>
                                <Label>
                                    Qúy vị có phục vụ bữa sáng cho khách không?
                                </Label>
                                <Input
                                    id="selectBreakfast"
                                    name="selectBreakfast"
                                    type="select"
                                >
                                    <option value="0">Không</option>
                                    <option value="1">Có</option>
                                </Input>
                            </Col>
                        </fieldset>
                        <fieldset>
                            <Label className='label-big'>
                                Những tiện nghi được khách ưa chuộng
                            </Label>
                            <div className="describe-block">
                                <div className="describe-block__text">
                                    <p>Khách để tâm đến những tiện nghi này nhất khi họ tìm kiếm chỗ nghỉ.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="list-convenient">
                                        <ul>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Wi-Fi miễn phí
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Nhà hàng
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Dịch vụ phòng
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Quầy bar
                                                </Label>
                                            </li>
                                            <li><Label>
                                                <Input type='checkbox' name='convenientCheck'>
                                                </Input>
                                                Lễ tân 24 giờ
                                            </Label></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="list-convenient">
                                        <ul>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Phòng không hút thuốc
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Xe đưa đón sân bay
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Điều hòa nhiệt độ
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Phòng gia đình
                                                </Label>
                                            </li>
                                            <li>
                                                <Label>
                                                    <Input type='checkbox' name='convenientCheck'>
                                                    </Input>
                                                    Hồ bơi
                                                </Label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <Button color='primary'> Tiếp tục</Button>
                    </Form>
                </div>
                <div className="col-md-3 sticky-col">
                    <p>Sau khi hoàn tất đăng ký, Quý vị vẫn sẽ có thể thực hiện thay đổi cho đăng ký trước khi chỗ nghỉ online.</p>
                </div>
            </div>

        </div >
    );
}

export default ConvenientNService;