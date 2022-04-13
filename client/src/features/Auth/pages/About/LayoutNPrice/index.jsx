import React from 'react';
import PropTypes from 'prop-types';

import './LayoutNPrice.scss';
import { Col, Label } from 'reactstrap';
import { Select, Button, Form, Input } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SelectField from 'custom-fields/SelectField';

LayoutNPrice.propTypes = {

};

function LayoutNPrice(props) {
    const [anotherRoom, setAnotherRoom] = React.useState('don');

    const [beds, setBeds] = React.useState([{
        idBed: 'giuong1-1',
        quantity: 1,
    }]);

    //view result 

    React.useEffect(() => {
        console.log(beds);
    }, [beds])

    React.useEffect(() => {
        const guestNum = beds.reduce((prev, current) => prev + current.idBed.split("-")[1] * current.quantity, 0)
        console.log(guestNum);
        form.setFieldsValue({
            numberGuest: guestNum,
        })
    }, [beds])

    const [form] = Form.useForm();


    const defaultValues = {
        typeRoom: '',
        nameRoom: 'don',
        nameCustom: '',
        smokingPolicy: 0,
        numRoom: 1,
        // detailBed: 'giuong1-1',
        quantityRoom: 1,
        numberGuest: null,
        sizeRoom: '',
        price: '',
    }
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className='layout-and-price'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form form={form} initialValues={defaultValues} onFinish={handleSubmit} >
                        <fieldset>
                            <Label className='label-big'>
                                Vui lòng chọn
                            </Label >
                            <div className='col-sm-6 form-group'>
                                <Label>
                                    Loại phòng
                                </Label>
                                <Form.Item
                                    name="nameRoom"
                                >

                                    <Select onChange={(value) => setAnotherRoom(value)} options={[
                                        { label: "Phòng giường đơn", value: "don" },
                                        { label: "Phòng giường đôi", value: "pdoi" },
                                        { label: "Phòng 3 người", value: "p3nguoi" },
                                        { label: "Phòng 4 người", value: "p4nguoi" },
                                    ]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Label>
                                        Tên phòng
                                    </Label>
                                    <Form.Item
                                        name="nameRoom"
                                    >
                                        <Select disabled value={anotherRoom} onChange={(value) => setAnotherRoom(value)} style={{ minWidth: '100%' }} options={[
                                            { label: "Phòng tiêu chuẩn giường đơn", value: "don" },
                                            { label: "Phòng tiêu chuẩn giường đôi", value: "pdoi" },
                                            { label: "Phòng tiêu chuẩn 3 người", value: "p3nguoi" },
                                            { label: "Phòng tiêu chuẩn 4 người", value: "p4nguoi" },
                                        ]}
                                        />

                                    </Form.Item>
                                    <span>Đây là tên mà khách sẽ thấy trên trang web Booking.com.</span>
                                </div>
                                <div className="col-sm-6">
                                    <Label>
                                        Tên tùy chọn ( không bắt buộc)
                                    </Label>
                                    <Form.Item name='nameCustom'>
                                        <Input
                                        />
                                    </Form.Item>
                                    <span>Tạo tên tùy chọn cho riêng Quý vị tham khảo (không bắt buộc).</span>
                                </div>
                            </div>
                            <br />
                            <div className='col-sm-6 form-group'>
                                <Label>
                                    Chính sách về hút thuốc
                                </Label>
                                <Form.Item
                                    name="smokingPolicy"
                                >
                                    <Select options={[
                                        { label: "Không hút thuốc", value: 0 },
                                        { label: "Có hút thuốc", value: 1 },
                                    ]}
                                    />

                                </Form.Item>

                            </div>
                            <div className="col-sm-3">
                                <Form.Item label='Số phòng (loại này)' name='numRoom' defaultValue={1}>
                                    <Input

                                    />
                                </Form.Item>
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
                                                    idBed: 'giuong1-1',
                                                    quantity: 1,
                                                }])}
                                        >
                                            <PlusCircleOutlined /> Thêm giường</Button>
                                    </div>
                                </Col>
                                <Label>
                                    Bao nhiêu khách có thể nghỉ trong phòng này?
                                </Label>
                                <Col sm={2}>
                                    <Form.Item
                                        name='numberGuest'
                                    >
                                        <Input
                                        // readOnly
                                        />
                                    </Form.Item>
                                </Col>
                            </fieldset>
                        }
                        <fieldset>
                            <Label className='label-big'>
                                Kích thước phòng
                            </Label>
                            <Col md={4} className='form-group'>
                                <Form.Item
                                    name='sizeRoom'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập kích thước phòng",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='Mét vuông'

                                    />
                                </Form.Item>
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
                                        <Form.Item
                                            name='price'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập giá cho phòng",
                                                }
                                            ]}
                                        >
                                            <Input
                                                placeholder='VNĐ/Đêm'
                                            />

                                        </Form.Item>
                                    </Col>
                                </div>
                            </div>
                        </fieldset>
                        <div className="btn-submit">
                            <Button type='primary' htmlType='submit' >
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