import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Tooltip, Col, Form, Row, Switch, Upload, Button, Select, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import UploadFieldv2 from 'custom-fields/UploadFieldv2';
import { Badge, ModalFooter } from 'reactstrap';
import "./HotelForm.scss";
import RoomPage from 'features/Admin/pages/Room';
import { loaiChoNghiApi } from 'api/LoaiChoNghiApi'
import { thanhPhoApi } from 'api/ThanhPhoApi'
import { tienNghiApi } from 'api/TienNghiApi'
import { tinDungApi } from 'api/TinDungApi'
import { getHours } from 'assets/globaJS';
import DetailModal from '../DetailModal';

HotelForm.propTypes = {
    selectedHotel: PropTypes.object,
    onSubmit: PropTypes.func,
};

HotelForm.defaultProps = {
    selectedHotel: {},
    onSubmit: null,
};

function HotelForm(props) {
    const { selectedHotel, onSubmit, isLoading } = props;
    const [cityOptions, setCityOptions] = React.useState([]);
    const [placeOptions, setPlaceOptions] = React.useState([]);

    const [convenients, setConvenients] = React.useState([]);
    const [payments, setPayments] = React.useState([]);

    const [convenientChoosen, setConvenientChoosen] = React.useState(() => selectedHotel?.TienNghi?.map((tn) => tn._id));
    const [paymentChoosen, setPaymentChoosen] = React.useState(() => selectedHotel?.TinDung?.map((td) => td._id));

    const [newFile, setNewFile] = React.useState([]);

    const [form] = Form.useForm();

    const [isShowModal, setIsShowModal] = React.useState({ isVisible: false, isModal: "" });

    const initialValues = {
        TenChoNghi: selectedHotel?.TenChoNghi,
        TenQuanLy: selectedHotel?.QuanLy[0]?.name,
        QuanLy: selectedHotel?.QuanLy[0]?._id,
        TieuDeDatDiem: selectedHotel?.TieuDeDatDiem,
        MoTaDatDiem: selectedHotel?.MoTaDatDiem,
        DiaChi: selectedHotel?.DiaChi,
        ThanhPho: selectedHotel?.ThanhPho[0]?._id,
        LoaiChoNghi: selectedHotel?.LoaiChoNghi[0]?._id,
        XepHang: selectedHotel?.XepHang,
        TienNghi: convenientChoosen,
        // HinhAnh: selectedHotel?.HinhAnh,
        Phong: selectedHotel?.Phong?.map((p) => p._id),
        HuyDatPhong: selectedHotel?.HuyDatPhong,
        BaoHiemNhamLan: selectedHotel?.BaoHiemNhamLan,
        ThoiGianNhanPhongTu: selectedHotel?.ThoiGianNhanPhong?.Tu,
        ThoiGianNhanPhongDen: selectedHotel?.ThoiGianNhanPhong?.Den,
        ThoiGianTraPhongTu: selectedHotel?.ThoiGianTraPhong?.Tu,
        ThoiGianTraPhongDen: selectedHotel?.ThoiGianTraPhong?.Den,
        TinDung: paymentChoosen
    }

    React.useEffect(() => {
        form.setFieldsValue({
            TinDung: paymentChoosen
        })

    }, [paymentChoosen])

    React.useEffect(() => {
        form.setFieldsValue({
            TienNghi: convenientChoosen
        })

    }, [convenientChoosen])


    React.useEffect(() => {
        const fetchHotelType = async () => {
            try {
                const { LoaiChoNghis } = await loaiChoNghiApi.getAll();
                const newPlaceOptions = LoaiChoNghis.map(LCN => ({ label: LCN.TenLoaiChoNghi, value: LCN._id }))
                setPlaceOptions(newPlaceOptions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHotelType();
    }, []);

    React.useEffect(() => {
        const fetchCity = async () => {
            try {
                const { ThanhPhos } = await thanhPhoApi.getAll();
                const newCityOptions = ThanhPhos.map(TP => ({ label: TP.TenThanhPho, value: TP._id }))
                setCityOptions(newCityOptions);

            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
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
        const fetchPayments = async () => {
            try {
                const { TinDungs } = await tinDungApi.getAll();
                setPayments(TinDungs);

            } catch (error) {
                console.log(error);
            }
        };
        fetchPayments();
    }, []);

    const handleSubmit = values => {
        if (!onSubmit) return;
        onSubmit({ ...values, HinhAnhMoi: newFile });

    }

    const handleSaveImage = fileList => {
        // form.setFieldsValue({ HinhAnhMoi: fileList })
        setNewFile(fileList);
    }

    const handleConfirmConvenientAndPayment = values => {
        values.TinDung && setPaymentChoosen(values.TinDung)
        values.TienNghi && setConvenientChoosen(values.TienNghi)
        setIsShowModal({ isVisible: false, isModal: '' });
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' className='hotel-form' onFinish={(values) => handleSubmit(values)}>
            <Badge className='mb-2' color="primary">Th??ng tin c?? b???n v??? ch??? ngh??</Badge>
            <Row gutter={[20, 0]}>
                <Col span={7}>
                    <InputField label='T??n ch??? ngh??' name="TenChoNghi" rules={[{ required: true, message: "T??n ch??? ngh?? kh??ng ???????c b??? tr???ng" }]} />
                    <SelectField
                        options={placeOptions}
                        label='Lo???i ch??? ngh??' name="LoaiChoNghi" rules={[{ required: true, message: "Lo???i ch??? ngh?? kh??ng ???????c b??? tr???ng" }]} />
                    <SelectField
                        options={[{ label: "???", value: 1 }, { label: "??????", value: 2 }, { label: "?????????", value: 3 }, { label: "????????????", value: 4 }, { label: "???????????????", value: 5 },]}
                        label='X???p h???ng' name="XepHang" rules={[{ required: true, message: "X???p h???ng kh??ng ???????c b??? tr???ng" }]} />
                </Col>
                <Col span={7}>
                    <InputField disabled label='Qu???n l??' name="TenQuanLy" rules={[{ required: true, message: "?????a ch??? kh??ng ???????c b??? tr???ng" }]} />
                    <InputField label='?????a ch???' name="DiaChi" rules={[{ required: true, message: "?????a ch??? kh??ng ???????c b??? tr???ng" }]} />
                    <SelectField
                        options={cityOptions}
                        label='Th??nh ph???' name="ThanhPho" rules={[{ required: true, message: "Th??nh ph??? kh??ng ???????c b??? tr???ng" }]} />
                </Col>
                <Col span={10}>
                    <InputField label='Ti??u ????? ?????c ??i???m' name="TieuDeDatDiem" rules={[{ required: true, message: "Ti??u ????? ?????c ??i???m kh??ng ???????c b??? tr???ng" }]} />
                    <InputField type='textarea' label='M?? t??? ?????c ??i???m' name="MoTaDatDiem" rules={[{ required: true, message: "M?? t??? ?????c ??i???m kh??ng ???????c b??? tr???ng" }]} />
                </Col>
            </Row>
            <Row gutter={[20, 0]}>
                <Col span={7}>
                    <Badge className='mb-3' color='primary'>Danh s??ch ti???n nghi: </Badge>
                    <div className='hotel-form__list-item'>
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
                        <div className='hotel-form__setting'>
                            <div
                                onClick={() => setIsShowModal({ isVisible: true, isModal: "convenient" })}
                                className="hotel-form__setting__icon shadow-sm bg-info" >
                                <i class="bi bi-pencil"></i>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={7}>
                    <Badge className='mb-3' color='primary'>Danh s??ch t??n d???ng: </Badge>
                    <div className='hotel-form__list-item'>
                        <Form.Item name="TinDung">
                            <Checkbox.Group onChange={values => setPaymentChoosen(values)}>
                                {
                                    payments.filter(payment => paymentChoosen.includes(payment._id))?.map((td) =>
                                        <Checkbox key={td._id} checked value={td._id} >
                                            <img style={{ marginRight: 5 }} width={35} height={25} src={td.Logo} />
                                            {td.TenTinDung}
                                        </Checkbox>
                                    )
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div className='hotel-form__setting'>
                        <div
                            onClick={() => setIsShowModal({ isVisible: true, isModal: "payment" })}
                            className="hotel-form__setting__icon shadow-sm bg-info" >
                            <i class="bi bi-pencil"></i>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <Badge className='mb-3' color='primary'>Th???i gian nh???n/ tr??? ph??ng: </Badge>
                    <div style={{ marginLeft: 10 }}>
                        <div className='hotel-form__time-item'>
                            <div style={{ minWidth: 80 }}>
                                <Badge>Nh???n ph??ng:</Badge>
                            </div>
                            <div style={{ display: 'flex', marginLeft: 30 }}>
                                <Form.Item
                                    style={{ minWidth: 100, marginRight: 10 }}
                                    name="ThoiGianNhanPhongTu">
                                    <Select
                                        options={getHours()}
                                        placeholder="T???">
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    style={{ minWidth: 100 }}
                                    name="ThoiGianNhanPhongDen">
                                    <Select
                                        options={getHours()}
                                        placeholder="?????n">
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='hotel-form__time-item'>
                            <div style={{ minWidth: 80 }}>
                                <Badge>Tr??? ph??ng:</Badge>
                            </div>
                            <div style={{ display: 'flex', marginLeft: 30 }}>
                                <Form.Item
                                    style={{ minWidth: 100, marginRight: 10 }}
                                    name="ThoiGianTraPhongTu">
                                    <Select
                                        options={getHours()}
                                        placeholder="T???">
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    options={getHours()}
                                    style={{ minWidth: 100 }}
                                    name="ThoiGianTraPhongDen">
                                    <Select
                                        options={getHours()}
                                        placeholder="?????n">
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className='break' />
            <Row gutter={[20, 0]}>
                <Col span={10}>
                    <Badge className='mb-3' color='primary'>Ch??nh s??ch: </Badge>
                    <div style={{ marginLeft: 10 }}>
                        <InputField label='H???y ?????t ph??ng' name="HuyDatPhong" rules={[{ required: true, message: "H???y ?????t ph??ng kh??ng ???????c b??? tr???ng" }]} />
                        <div style={{ display: 'flex' }}><span style={{ marginRight: '1rem' }}>B???o hi???m nh???m l???n:</span> <Form.Item name="BaoHiemNhamLan"><Switch defaultChecked={selectedHotel?.BaoHiemNhamLan} /></Form.Item>  </div>
                    </div>
                </Col>
                <Col span={14}>
                    <Badge className='mb-3' color='primary'>???nh ch??? ngh??: </Badge>
                    <div style={{ marginLeft: 10 }}>
                        <UploadFieldv2
                            maxCount={12}
                            onSaveImage={handleSaveImage}
                            value={selectedHotel.HinhAnh}
                            name='HinhAnhMoi' />
                    </div>
                </Col>
            </Row>
            <div className='break' />
            <Badge color="primary" >Ph??ng ({selectedHotel?.Phong?.length})</Badge>
            <RoomPage notPagination MaKhachSan={selectedHotel?._id} />
            {/* Modal for convenient and payment */}
            <DetailModal isOpen={isShowModal.isVisible && isShowModal.isModal} size="md" >
                <Form initialValues={{ TienNghi: convenientChoosen, TinDung: paymentChoosen }} onFinish={(values) => handleConfirmConvenientAndPayment(values)}>
                    {
                        isShowModal?.isModal === "convenient" ?

                            <>
                                <Badge className='mb-3' color='warning'>T???t c??? ti???n nghi: </Badge>
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
                            :
                            <>
                                <Badge className='mb-3' color='warning'>T???t c??? t??n d???ng: </Badge>
                                <Form.Item name="TinDung">
                                    <Checkbox.Group
                                        style={{ textAlign: 'center' }}
                                        className='sub-modal'
                                    >
                                        {
                                            payments?.map((td) =>
                                                <Checkbox key={td._id} value={td._id} >
                                                    <img style={{ marginRight: 5 }} width={40} height={30} src={td.Logo} />
                                                    {td.TenTinDung}</Checkbox>
                                            )
                                        }
                                    </Checkbox.Group>
                                </Form.Item>
                            </>
                    }
                    <ModalFooter className='mt-5'>
                        <Button htmlType='submit' style={{ background: "#FF851B", color: "#FFF" }}>
                            X??c nh???n {false && <Spin className="ml-1" size="small" />}
                        </Button>
                        <Button type='danger' onClick={() => setIsShowModal(prev => ({ ...prev, isVisible: false }))}>Cancel</Button>
                    </ModalFooter>
                </Form>

            </DetailModal>

            {/* <br /> */}
            <ModalFooter className='mt-5'>
                <Button htmlType='submit' style={{ background: "#01FF70", color: "#FFF" }}>
                    Update {isLoading && <Spin className="ml-1" size="small" />}
                </Button>
                <Button type='danger'>Cancel</Button>
            </ModalFooter>
        </Form >
    );
}

export default HotelForm;