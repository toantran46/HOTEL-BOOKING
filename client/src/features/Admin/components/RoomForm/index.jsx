import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Col, Form, Row, Spin, Switch } from 'antd';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { Badge, ModalFooter } from 'reactstrap';
import "./roomForm.scss";
import { tienNghiApi } from 'api/TienNghiApi';
import DetailModal from '../DetailModal';
import { loaiChoNghiApi } from 'api/LoaiChoNghiApi';
import { loaiPhongApi } from 'api/LoaiPhongApi';
import { loaiGiuongApi } from 'api/LoaiGiuongApi';
import { DeleteOutlined, PlusSquareFilled, PlusSquareOutlined } from '@ant-design/icons';
import { getTimes } from 'assets/globaJS';
import { toastError } from 'utils/notifi';

RoomForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
};

RoomForm.propTypes = {
    onSubmit: null,
    isLoading: false,
};


function RoomForm(props) {
    const { onSubmit, isLoading, selectedRoom } = props;

    const [convenients, setConvenients] = React.useState([]);
    const [convenientChoosen, setConvenientChoosen] = React.useState(() => selectedRoom?.TienNghi?.map((tn) => tn._id));
    const [bedChoosen, setBedChoosen] = React.useState(() => selectedRoom?.ThongTinGiuong?.map(bed => ({ ...bed, Giuong: { _id: bed.Giuong.TenLoaiGiuong.includes('dơn') ? bed.Giuong._id + "-1" : bed.Giuong._id + "-2" } })));
    const [isShowConvenientModal, setIsShowConvenientModal] = React.useState(false);
    const [roomTypeOptions, setRoomTypeOptions] = React.useState([]);
    const [bedTypeOptions, setBedTypeOptions] = React.useState([]);


    React.useEffect(() => {
        const fetchHotelType = async () => {
            try {
                const { LoaiPhongs } = await loaiPhongApi.getAll();
                const newPlaceTypeOptions = LoaiPhongs.map(lp => ({ label: lp.TenLoaiPhong, value: lp._id }))
                setRoomTypeOptions(newPlaceTypeOptions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHotelType();
    }, []);

    React.useEffect(() => {
        const fetchConvenients = async () => {
            try {
                const { TienNghis } = await tienNghiApi.getAll();
                setConvenients(TienNghis)
            } catch (error) {
                console.log(error);
            }
        };
        fetchConvenients();
    }, []);


    React.useEffect(() => {
        const fetchBedType = async () => {
            try {
                const { LoaiGiuongs } = await loaiGiuongApi.getAll();
                const newBedTypeOptions = LoaiGiuongs.map(lg => ({ label: lg.TenLoaiGiuong, value: lg.TenLoaiGiuong.includes("đơn") ? lg._id + "-1" : lg._id + "-2" }))
                setBedTypeOptions(newBedTypeOptions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBedType();
    }, []);


    const initialValues = {
        LoaiPhong: selectedRoom?.LoaiPhong?._id,
        TenPhong: selectedRoom?.TenPhong,
        HutThuoc: selectedRoom?.HutThuoc,
        SoLuongKhach: selectedRoom?.SoLuongKhach,
        KichThuoc: selectedRoom?.KichThuoc,
        Gia: selectedRoom?.Gia,
        TienNghi: convenientChoosen,
        SoLuongPhong: selectedRoom?.SoLuongPhong,
    }

    const [form] = Form.useForm();

    const handleSubmit = values => {

        const check = bedChoosen.findIndex(bed => !bed.Giuong._id || !bed.SoLuong);
        if (check !== -1) return toastError("Vui lòng chọn giường và số lượng")
        if (!onSubmit) return;
        onSubmit({ ...values, totalBed: bedChoosen.length });
    }

    const handleConfirmConvenient = values => {
        values.TienNghi && setConvenientChoosen(values.TienNghi)
        setIsShowConvenientModal(false);
    }

    React.useEffect(() => {
        form.setFieldsValue({
            TienNghi: convenientChoosen
        })

    }, [convenientChoosen])

    React.useEffect(() => {

        const newSoLuongKhach = bedChoosen.reduce((a, bed) => a + bed.SoLuong * (bed.Giuong._id?.split("-")[1]), 0)
        form.setFieldsValue({
            SoLuongKhach: newSoLuongKhach
        })

    }, [bedChoosen])

    return (
        <Form
            className='room-form'
            form={form} initialValues={initialValues} onFinish={(values) => handleSubmit(values)}>

            <Row gutter={[30, 0]}>
                <Col span={12}>
                    <Badge className='mb-3' color='primary'>Thông tin phòng: </Badge>
                    <InputField label='Tên phòng' name='TenPhong' rules={[{ required: true, message: "Tên phòng không được bỏ trống" }]} />
                    <SelectField
                        options={roomTypeOptions}
                        label='Loại phòng'
                        name='LoaiPhong'
                        rules={[{ required: true, message: "Loại phòng không được bỏ trống" }]} />
                    <InputField label='Số lượng khách' type='number' name='SoLuongKhach' disabled />
                    <InputField label='Kích thước' type='Kich thước' name='KichThuoc' rules={[{ required: true, message: "Tên phòng không được bỏ trống" }]} />
                    <InputField label='Số lượng phòng' type='number' name='SoLuongPhong' rules={[{ required: true, message: "Tên phòng không được bỏ trống" }]} />
                    <Form.Item
                        label="Hút thuốc"
                        name="HutThuoc" >
                        <Switch defaultChecked={selectedRoom?.HutThuoc} />
                    </Form.Item>
                    <InputField label='Giá' name='Gia' type='number' rules={[{ required: true, message: "Tên phòng không được bỏ trống" }]} />
                </Col>
                <Col span={12}>
                    <Badge className='mb-3' color='primary'>Thông tin giường: </Badge>
                    <div>

                        {
                            bedChoosen?.map((bed, index) =>
                                <div className='room-form__bed-info'>
                                    <SelectField
                                        value={bed.Giuong._id}
                                        onChange={idBed => setBedChoosen(prev => {
                                            let newBeds = prev;
                                            newBeds[index].Giuong._id = idBed;
                                            return newBeds;
                                        })}
                                        name={'Giuong' + index}
                                        style={{ minWidth: 350, }}
                                        options={bedTypeOptions} />
                                    <SelectField
                                        name={'SoLuong' + index}
                                        onChange={quantity => setBedChoosen(prev => {
                                            let newBeds = [...prev];
                                            newBeds[index].SoLuong = quantity;
                                            return newBeds;
                                        })}
                                        value={bed.SoLuong}
                                        style={{ minWidth: 80, margin: '0 20px' }}
                                        options={getTimes()} />
                                    <Button onClick={() => {
                                        setBedChoosen(prev => {
                                            let newBeds = prev.filter((b, idx) => idx !== index);
                                            return newBeds;
                                        })
                                    }}
                                        icon={<DeleteOutlined />} />
                                </div>
                            )
                        }
                        {bedChoosen.length < 1 && <i style={{ fontSize: 10, marginLeft: 10 }}>Chưa thêm gường</i>}
                        <div className='room-form__setting'>
                            <div
                                onClick={() => setBedChoosen(prev => [...prev, { Giuong: { _id: null }, SoLuong: null }])}
                                className="room-form__setting__icon shadow-sm bg-info" >
                                <i class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
                    <br />
                    <Badge className='mb-3' color='primary'>Danh sách tiện nghi: </Badge>
                    <div className='room-form__list-item'>
                        {convenientChoosen.length < 1 && <i style={{ fontSize: 10, marginLeft: 10 }}>Chưa thêm tiện nghi</i>}
                        <Form.Item name="TienNghi">
                            <Checkbox.Group onChange={values => setConvenientChoosen(values)}>
                                {
                                    convenients.filter(convenient => convenientChoosen.includes(convenient._id))?.map((tn) =>
                                        <div key={tn._id}>
                                            <Checkbox value={tn._id} >{tn.TenTienNghi}</Checkbox>
                                        </div>
                                    )
                                }
                            </Checkbox.Group>
                        </Form.Item>
                        <div className='room-form__setting'>
                            <div
                                onClick={() => setIsShowConvenientModal(true)}
                                className="room-form__setting__icon shadow-sm bg-info" >
                                <i class="bi bi-pencil"></i>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>

            <DetailModal isOpen={isShowConvenientModal} size="md" >
                <Form initialValues={{ TienNghi: convenientChoosen }} onFinish={(values) => handleConfirmConvenient(values)}>
                    <>
                        <Badge className='mb-3' color='warning'>Tất cả tiện nghi: </Badge>
                        <Form.Item name="TienNghi">
                            <Checkbox.Group
                                value={convenientChoosen}
                                style={{ textAlign: 'center' }}
                                className='sub-modal'>
                                {
                                    convenients?.map((tn) =>
                                        <Checkbox key={tn._id} value={tn._id} >{tn.TenTienNghi}</Checkbox>
                                    )
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </>
                    <ModalFooter className='mt-5'>
                        <Button htmlType='submit' style={{ background: "#FF851B", color: "#FFF" }}>
                            Xác nhận {false && <Spin className="ml-1" size="small" />}
                        </Button>
                        <Button type='danger' onClick={() => setIsShowConvenientModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Form>

            </DetailModal>

            <ModalFooter className='mt-5'>
                <Button htmlType='submit' style={{ background: "#01FF70", color: "#FFF" }}>
                    Update {isLoading && <Spin className="ml-1" size="small" />}
                </Button>
                <Button type='danger'>Cancel</Button>
            </ModalFooter>
        </Form>
    );
}

export default RoomForm;