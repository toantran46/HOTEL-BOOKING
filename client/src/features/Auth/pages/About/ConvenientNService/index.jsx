import React from 'react';
import PropTypes from 'prop-types';

import './ConvenientNService.scss';
import { Col, Label } from 'reactstrap';
import { Button, Form, Input, Radio, Checkbox, Row } from 'antd';

import { useForm } from 'react-hook-form';

ConvenientNService.propTypes = {

};

function ConvenientNService(props) {

    const [form] = Form.useForm();


    const handleSubmit = (values) => {
        console.log(values);
    }

    const defaultValues = {
        isParking: true,
        isBreakfast: false,
        convenientGroup: '',
    }

    return (
        <div className='convenient-and-service'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form form={form} initialValues={defaultValues} onFinish={handleSubmit} >
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
                                <Form.Item name="isParking">
                                    <Radio.Group>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
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
                                <Form.Item name="isBreakfast">
                                    <Radio.Group>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
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
                            <Form.Item name='convenientGroup'>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="list-convenient">

                                                <ul>
                                                    <li><Checkbox value="wifi"> Wi-Fi miễn phí</Checkbox></li>
                                                    <li> <Checkbox value="nhahang"> Nhà hàng</Checkbox></li>
                                                    <li><Checkbox value="dichvuphong"> Dịch vụ phòng</Checkbox></li>
                                                    <li><Checkbox value="letan"> Lễ tân 24 giờ</Checkbox></li>
                                                    <li><Checkbox value="cacham"> Hệ thống cách âm</Checkbox></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="list-convenient">
                                                <ul>
                                                    <li><Checkbox value="phongtam"> Phòng tắm riêng</Checkbox></li>
                                                    <li><Checkbox value="tivi"> TV màn hình phẳng</Checkbox></li>
                                                    <li><Checkbox value="bancong"> Ban công</Checkbox></li>
                                                    <li><Checkbox value="minibar"> Minibar</Checkbox></li>
                                                    <li><Checkbox value="dieuhoa"> Điều hòa không khí</Checkbox></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>

                        </fieldset>
                        <Button type='primary' htmlType='submit'> Tiếp tục</Button>
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