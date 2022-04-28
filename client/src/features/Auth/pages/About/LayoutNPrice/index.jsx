import React from 'react';
import PropTypes from 'prop-types';

import './LayoutNPrice.scss';
import { Col, Label } from 'reactstrap';
import { Select, Button, Form, Input } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SelectField from 'custom-fields/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { addBed, addLayoutNPrice, setTab } from 'features/Auth/authSlice';

import { loaiPhongApi } from 'api/LoaiPhongApi';
import { loaiGiuongApi } from 'api/LoaiGiuongApi';

LayoutNPrice.propTypes = {

};

function LayoutNPrice(props) {
    const layoutNPrice = useSelector(state => state.aboutInfo);
    const dispatch = useDispatch();

    const [anotherRoom, setAnotherRoom] = React.useState(
        () => layoutNPrice.nameRoom
    );

    const [listLoaiPhong, setListLoaiPhong] = React.useState([]);

    const [loaiGiuong, setLoaiGiuong] = React.useState([]);

    let [beds, setBeds] = React.useState(
        () =>
            layoutNPrice.Room
    );

    const [form] = Form.useForm();

    const idPhongDon = "6268f19fd2cd433f452fe80a";

    const defaultValues = {
        typeRoom: '',
        nameRoom: idPhongDon,
        nameCustom: '',
        smokingPolicy: 0,
        numRoom: 1,
        quantityRoom: 1,
        numberGuest: null,
        sizeRoom: '',
        price: '',
    }
    React.useEffect(() => {
        const guestNum = beds?.reduce((prev, current) => prev + current.idBed.split("-")[1] * current.quantity, 0)
        // console.log(guestNum);
        form.setFieldsValue({
            numberGuest: guestNum,
        })
    }, [beds])


    React.useEffect(() => {
        const fetchLoaiPhong = async () => {
            try {
                const { LoaiPhongs } = await loaiPhongApi.getAll();
                setListLoaiPhong(LoaiPhongs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLoaiPhong();
    }, [])

    React.useEffect(() => {
        const fetchLoaiGiuong = async () => {
            try {
                let { LoaiGiuongs } = await loaiGiuongApi.getAll();
                LoaiGiuongs = LoaiGiuongs.map((data, index) => (
                    {
                        ...data,
                        _id: data._id + '-' + (data.TenLoaiGiuong.includes('đơn') ? 1 : 2),
                    }
                ))
                console.log(LoaiGiuongs);
                setLoaiGiuong(LoaiGiuongs);

            }
            catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            fetchLoaiGiuong();
        }, 1000);
    }, []);

    React.useEffect(() => {
        form.setFieldsValue(layoutNPrice);
    }, [layoutNPrice]);

    React.useEffect(() => {
        console.log(beds);
    }, [beds]);


    const handleSubmit = (values) => {
        // console.log(values);
        const action = addLayoutNPrice(values);
        dispatch(action);
        dispatch(addBed(beds));

        dispatch(setTab({
            key: 'next',
            tab: 2,
        }));
    }
    return (
        <div className='layout-and-price'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form form={form} initialValues={defaultValues} onFinish={(values) => handleSubmit(values)} >
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

                                    <Select defaultValue={idPhongDon} onChange={(value) => setAnotherRoom(value)} options={
                                        listLoaiPhong.map((loaiphong, index) => (
                                            { label: loaiphong.TenLoaiPhong, value: loaiphong._id }
                                        ))
                                    }
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
                                        <Select disabled value={anotherRoom} onChange={(value) => setAnotherRoom(value)} style={{ minWidth: '100%' }} options={
                                            listLoaiPhong.map((loaiphong, index) => (
                                                { label: loaiphong.TenLoaiPhong, value: loaiphong._id }
                                            ))
                                        }
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

                            <Label>
                                Số phòng (loại này)
                            </Label>
                            <div className="col-sm-2">
                                <Form.Item name='numRoom'>
                                    <Input

                                    />
                                </Form.Item>
                            </div>
                        </fieldset>
                        {anotherRoom !== idPhongDon &&
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
                                {beds?.map((bed, index) => (
                                    <div className="row">
                                        <div className='col-sm-7 form-group'>


                                            <Select style={{ minWidth: '100%' }} value={loaiGiuong._id} options={
                                                loaiGiuong.map((giuong, index) => (
                                                    { label: giuong.TenLoaiGiuong, value: giuong._id }
                                                ))
                                            }

                                                onChange={(value) => setBeds(prev => {
                                                    let newBeds = [...prev];
                                                    newBeds[index] = {
                                                        ...newBeds[index],
                                                        idBed: value
                                                    };
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
                                            readOnly
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