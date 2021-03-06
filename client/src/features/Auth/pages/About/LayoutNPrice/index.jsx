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
        () => layoutNPrice.typeRoom
    );

    const [listLoaiPhong, setListLoaiPhong] = React.useState([]);

    const [loaiGiuong, setLoaiGiuong] = React.useState([]);

    let [beds, setBeds] = React.useState(
        () =>
            layoutNPrice.Room
    );

    const [form] = Form.useForm();

    const idPhongDon = "6268f19fd2cd433f452fe80a";
    const idGiuongDon = "6268f3675717716f2ed1a61e";

    const defaultValues = {
        typeRoom: '',
        nameRoom: '',
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
                        _id: data._id + '-' + (data.TenLoaiGiuong.includes('????n') ? 1 : 2),
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
                                Vui l??ng ch???n
                            </Label >
                            <div className='col-sm-12 form-group'>
                                <Label>
                                    Lo???i ph??ng
                                </Label>
                                <Form.Item
                                    name="typeRoom"
                                >

                                    <Select value={idPhongDon} onChange={(value) => setAnotherRoom(value)} options={
                                        listLoaiPhong.map((loaiphong, index) => (
                                            { label: loaiphong.TenLoaiPhong, value: loaiphong._id }
                                        ))
                                    }
                                    />
                                </Form.Item>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Label>
                                        T??n ph??ng
                                    </Label>
                                    <Form.Item

                                        name='nameRoom'
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui l??ng nh???p t??n ph??ng",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <span>????y l?? t??n m?? kh??ch s??? th???y tr??n trang web Booking.com.</span>
                                </div>
                            </div>
                            <br />
                            <div className='col-sm-6 form-group'>
                                <Label>
                                    Ch??nh s??ch v??? h??t thu???c
                                </Label>
                                <Form.Item
                                    name="smokingPolicy"
                                >
                                    <Select options={[
                                        { label: "Kh??ng h??t thu???c", value: 0 },
                                        { label: "C?? h??t thu???c", value: 1 },
                                    ]}
                                    />

                                </Form.Item>

                            </div>

                            <Label>
                                S??? ph??ng (lo???i n??y)
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
                                    T??y ch???n gi?????ng
                                </Label >
                                <div className="describe-block">
                                    <div className="describe-block__text">
                                        <p>H??y cho ch??ng t??i bi???t v??? gi?????ng c?? s???n trong ph??ng. Kh??ng bao g???m gi?????ng ph???.</p>
                                    </div>
                                </div>
                                <Label>
                                    Ph??ng n??y c?? lo???i gi?????ng n??o?
                                </Label>
                                {beds?.map((bed, index) => (
                                    <div className="row">
                                        <div className='col-sm-7 form-group'>


                                            <Select style={{ minWidth: '100%' }} value={bed.idBed} options={
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
                                                    idBed: '6268f3675717716f2ed1a61e-1',
                                                    quantity: 1,
                                                }])}
                                        >
                                            <PlusCircleOutlined /> Th??m gi?????ng</Button>
                                    </div>
                                </Col>
                                <Label>
                                    Bao nhi??u kh??ch c?? th??? ngh??? trong ph??ng n??y?
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
                                K??ch th?????c ph??ng
                            </Label>
                            <Col md={4} className='form-group'>
                                <Form.Item
                                    name='sizeRoom'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui l??ng nh???p k??ch th?????c ph??ng",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='M??t vu??ng'

                                    />
                                </Form.Item>
                            </Col>
                        </fieldset>
                        <fieldset>
                            <div className="row">
                                <div className="col-sx-12">
                                    <Label className='label-big'>
                                        Gi?? c?? b???n m???i ????m
                                    </Label>
                                    <div className="describe-block">
                                        <div className="describe-block__text">
                                            <p>????y l?? gi?? th???p nh???t m?? ch??ng t??i t??? ?????ng ??p d???ng ?????i v???i ph??ng n??y cho t???t c??? c??c ng??y.
                                                Tr?????c khi ch??? ngh??? online, Qu?? v??? c?? th??? c??i ?????t gi?? theo m??a trong trang dashboard c???a ch??? ngh???.</p>
                                        </div>
                                    </div>
                                    <Col md={3} className='form-group'>
                                        <Label>
                                            Gi?? cho 1 ng?????i
                                        </Label>
                                        <Form.Item
                                            name='price'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui l??ng nh???p gi?? cho ph??ng",
                                                }
                                            ]}
                                        >
                                            <Input
                                                placeholder='VN??/????m'
                                            />

                                        </Form.Item>
                                    </Col>
                                </div>
                            </div>
                        </fieldset>
                        <div className="btn-submit">
                            <Button type='primary' htmlType='submit' >
                                Ti???p t???c
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-3 sticky-col">
                    <p>
                        Sau khi ho??n t???t ????ng k??, Qu?? v??? v???n s??? c?? th??? th???c hi???n thay ?????i cho ????ng k?? tr?????c khi ch??? ngh??? online.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default LayoutNPrice;