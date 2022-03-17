import React from 'react';
import PropTypes from 'prop-types';

import './LayoutNPrice.scss';
import { Button, Col, Form, Input, Label } from 'reactstrap';
import { Select } from 'antd';

LayoutNPrice.propTypes = {

};

function LayoutNPrice(props) {
    const [anotherRoom, setAnotherRoom] = React.useState('');

    return (
        <div className='layout-and-price'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form>
                        <fieldset>
                            <Label className='label-big'>
                                Vui lòng chọn
                            </Label >
                            <div className='col-sm-6 form-group'>
                                <Label>
                                    Loại phòng
                                </Label>
                                <Input
                                    id="selectTypeRoom"
                                    name="selectTypeRoom"
                                    type="select"
                                    className='form-group'
                                >
                                    <option >Vui lòng chọn</option>
                                    <option value="1">Phòng đơn</option>
                                    <option value="2">Phòng giường đôi</option>
                                    <option value="3">Phòng 2 gường đơn</option>
                                    <option value="4">Phòng 3 người</option>
                                    <option value="5">Phòng 4 người</option>
                                </Input>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Label>
                                        Tên phòng
                                    </Label>
                                    <Select onChange={(value) => setAnotherRoom(value === 'pdoi' ? value : "")} style={{ minWidth: '100%' }} defaultValue='don' options={[
                                        { label: "Phòng đơn", value: "don" },
                                        { label: "Phòng giường đôi", value: "pdoi" },
                                        { label: "Phòng 3 người", value: "p3nguoi" },
                                        { label: "Phòng 4 người", value: "p4nguoi" },
                                    ]} />
                                    <span>Đây là tên mà khách sẽ thấy trên trang web Booking.com.</span>
                                </div>
                                <div className="col-sm-6">
                                    <Label>
                                        Tên tùy chọn ( không bắt buộc)
                                    </Label>
                                    <Input
                                        id='nameCustom'
                                        name='nameCustom'
                                        type='text'
                                    />
                                    <span>Tạo tên tùy chọn cho riêng Quý vị tham khảo (không bắt buộc).</span>
                                </div>
                            </div>
                            <br />
                            <div className='col-sm-6 form-group'>
                                <Label>
                                    Chính sách về hút thuốc
                                </Label>
                                <Input
                                    id="selectTypeRoom"
                                    name="selectTypeRoom"
                                    type="select"
                                    className='form-group'
                                >
                                    <option value="1">Không hút thuốc</option>
                                    <option value="2">Có hút thuốc</option>
                                    <option value="3">Có thể tùy chọn</option>
                                </Input>
                            </div>
                            <div className="col-sm-3">
                                <Label>
                                    Số phòng (loại này)
                                </Label>
                                <Input
                                    id='numRoom'
                                    name='numRoom'
                                    type='text'
                                    value={1}
                                />
                            </div>
                        </fieldset>
                        {anotherRoom &&
                            <fieldset>
                                <Label className='label-big'>
                                    Tùy chọn giường
                                </Label >
                                <div className="describe-block">
                                    <div className="describe-block__text">
                                        <p>Hãy cho chúng tôi biết về giường có sẵn trong phòng. Không bao gồm giường phụ.</p>
                                    </div>
                                </div>
                                <Label>
                                    Phòng này có loại giường nào?
                                </Label>
                                <div className="row">
                                    <div className='col-sm-6 form-group'>
                                        <Input
                                            id="selectTypeRoom"
                                            name="selectTypeRoom"
                                            type="select"
                                            className='form-group'
                                        >
                                            <option value="1">Gường đơn / Rộng 90-130 cm</option>
                                            <option value="2">Giường đôi / Rộng 131-151 cm </option>
                                            <option value="3">Gường lớn (King) / Rộng 151-180 cm</option>
                                            <option value="4">Gường cực lớn (Super-king) / Rộng 181-200 cm</option>
                                        </Input>
                                    </div>
                                    <div className="col-sm-4 form-group form-group-block">
                                        <div className="multi-icon">
                                            <span>X</span>
                                        </div>
                                        <Input
                                            id="selectTypeRoom"
                                            name="selectTypeRoom"
                                            type="select"
                                            className='form-group'
                                        >
                                            <option>Chọn số gường</option>
                                            <option value="1">1</option>
                                            <option value="2">2 </option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </Input>
                                    </div>
                                    <p>Nút thêm giường </p>
                                    <Label>
                                        Bao nhiêu khách có thể nghỉ trong phòng này?
                                    </Label>
                                    <Col sm={2}>
                                        <Input id='numberGuest'
                                            type='text'
                                            name='numberGuest'
                                            value={1}
                                        >
                                        </Input>
                                    </Col>

                                </div>

                            </fieldset>
                        }
                        <fieldset>
                            <Label className='label-big'>
                                Kích thước phòng (không bắt buộc)
                            </Label>
                            <Col md={4} className='form-group'>
                                <Input
                                    id='nameOwner'
                                    name='nameOwner'
                                    type='text'
                                    placeholder='Mét vuông'
                                />
                            </Col>
                        </fieldset>
                        <fieldset>
                            <div className="row">
                                <div className="col-sx-12">
                                    <Label className='label-big'>
                                        Giá cơ bản mỗi đêm
                                    </Label>
                                    <div className="describe-block">
                                        <div className="describe-block__text">
                                            <p>Đây là giá thấp nhất mà chúng tôi tự động áp dụng đối với phòng này cho tất cả các ngày.
                                                Trước khi chỗ nghỉ online, Quý vị có thể cài đặt giá theo mùa trong trang dashboard của chỗ nghỉ.</p>
                                        </div>
                                    </div>
                                    <Col md={3} className='form-group'>
                                        <Label>
                                            Giá cho 1 người
                                        </Label>
                                        <Input
                                            id='addrMain'
                                            name='addrMain'
                                            type='text'
                                            placeholder='VNĐ/Đêm'
                                        />
                                    </Col>
                                </div>
                            </div>
                        </fieldset>
                        <Button color='primary' type='submit'>
                            Tiếp tục
                        </Button>
                    </Form>
                </div>
                <div className="col-md-3 sticky-col">
                    <p>
                        Sau khi hoàn tất đăng ký, Quý vị vẫn sẽ có thể thực hiện thay đổi cho đăng ký trước khi chỗ nghỉ online.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LayoutNPrice;