import React from 'react';
import PropTypes from 'prop-types';

import './LayoutNPrice.scss';
import { Col, Form, Input, Label } from 'reactstrap';
import { Select, Button } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';


LayoutNPrice.propTypes = {

};

function LayoutNPrice(props) {
    const [anotherRoom, setAnotherRoom] = React.useState('');

    const [beds, setBeds] = React.useState([{
        idBed: '',
        quantity: null
    }]);

    //view result 

    React.useEffect(() => {
        console.log(beds);
    }, [beds])

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
                                <Select onChange={(value) => setAnotherRoom(value)} style={{ minWidth: '90%' }} options={[
                                    { label: "Phòng giường đơn", value: "don" },
                                    { label: "Phòng giường đôi", value: "pdoi" },
                                    { label: "Phòng 3 người", value: "p3nguoi" },
                                    { label: "Phòng 4 người", value: "p4nguoi" },
                                ]} />
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Label>
                                        Tên phòng
                                    </Label>
                                    <Select disabled value={anotherRoom} onChange={(value) => setAnotherRoom(value)} style={{ minWidth: '100%' }} options={[
                                        { label: "Phòng tiêu chuẩn giường đơn", value: "don" },
                                        { label: "Phòng tiêu chuẩn giường đôi", value: "pdoi" },
                                        { label: "Phòng tiêu chuẩn 3 người", value: "p3nguoi" },
                                        { label: "Phòng tiêu chuẩn 4 người", value: "p4nguoi" },
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
                        {anotherRoom !== 'don' &&
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
                                {beds.map((bed, index) => (
                                    <div className="row">
                                        <div className='col-sm-7 form-group'>
                                            <Select style={{ minWidth: '100%' }} value={bed.idBed} options={[
                                                { label: "Gường đơn / Rộng 90-130 cm", value: "giuong1-1" },
                                                { label: "Giường đôi / Rộng 131-151 cm ", value: "giuong2-2" },
                                                { label: "Gường lớn (King) / Rộng 151-180 cm", value: "giuong3-2" },
                                                { label: "Gường cực lớn (Super-king) / Rộng 181-200 cm", value: "giuong4-2" },
                                            ]}

                                                onChange={(value) => setBeds(prev => {
                                                    let newBeds = [...prev];
                                                    newBeds[index].idBed = value;
                                                    return newBeds;
                                                })}
                                            />
                                        </div>
                                        <div className="col-sm-5 form-group form-group-block">
                                            <div className="multi-icon">
                                                <span>X</span>
                                            </div>
                                            <Select style={{ minWidth: '70%' }} value={bed.quantity} options={[
                                                { label: "1", value: "1" },
                                                { label: "2", value: "2" },
                                                { label: "3", value: "3" },
                                                { label: "4", value: "4" },
                                            ]}
                                                onChange={(value) => setBeds(prev => {
                                                    let newBeds = [...prev];
                                                    newBeds[index].quantity = value;
                                                    return newBeds;
                                                })}
                                            />
                                            {
                                                index !== 0 &&
                                                <div className="remove-icon">
                                                    <Button onClick={() => setBeds(bed =>
                                                        bed.filter((bed, idx) => idx !== index)
                                                    )}>
                                                        <DeleteOutlined style={{ minHeight: '100%', color: '#d93d3d' }} />
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <Col sm={2}>
                                    <div className="btn-addbed">
                                        <Button
                                            onClick={() => setBeds(prev => [
                                                ...prev,
                                                {
                                                    idBed: '',
                                                    quantity: null,
                                                }])}
                                        >
                                            <PlusCircleOutlined /> Thêm giường</Button>
                                    </div>
                                </Col>
                                <Label>
                                    Bao nhiêu khách có thể nghỉ trong phòng này?
                                </Label>
                                <Col sm={2}>
                                    <Input id='numberGuest'
                                        type='text'
                                        name='numberGuest'
                                        defaultValue={1}
                                        value={
                                            beds.reduce((prev, current) => prev + Number(current.idBed.slice(8)) * Number(current.quantity), 0)
                                        }
                                        disabled
                                    >
                                    </Input>
                                </Col>
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
                        <div className="btn-submit">
                            <Button type='primary'>
                                Tiếp tục
                            </Button>
                        </div>
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