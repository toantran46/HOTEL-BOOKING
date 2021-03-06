import React from 'react';
import PropTypes from 'prop-types';
import "./Payment.scss";
import { Button, Checkbox, Col, Radio, Row, Select, Form } from 'antd';
import SelectField from 'custom-fields/SelectField';
import InputField from 'custom-fields/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addCredit, addPayment, clearLocal, setTab } from 'features/Auth/authSlice';
import { tinDungApi } from 'api/TinDungApi';
import { phongApi } from 'api/PhongApi';
import { toastError, toastSucsess } from 'utils/notifi';
import { choNghiApi } from 'api/ChoNghiApi';
import { useNavigate } from 'react-router-dom';

Payment.propTypes = {

};


function Payment(props) {

    const dispatch = useDispatch();
    const { payment } = useSelector(state => state.aboutInfo);
    const globalSTate = useSelector(state => state.aboutInfo);


    const [form] = Form.useForm();

    const [isCredit, setIsCredit] = React.useState(
        () => payment.isCredit || false
    );

    const [cartPayment, setCartPayment] = React.useState(
        () => payment.cartPayment
    );

    const [nameOwner, setNameOwner] = React.useState(
        () => globalSTate.nameOwner
    );

    const [nameCompany, setNameCompany] = React.useState(
        () => payment.nameCompany
    );

    const [listCartPayment, setListCartPayment] = React.useState([]);

    const paymentData = useSelector(state => state.aboutInfo);

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchCartPayment = async () => {
            try {
                const { TinDungs } = await tinDungApi.getAll();
                setListCartPayment(TinDungs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartPayment();
    }, [])

    React.useEffect(() => {
        dispatch(addPayment({ cartPayment, isCredit, nameOwner, nameCompany }))
    }, [cartPayment, isCredit, nameOwner, nameCompany]);

    React.useEffect(() => {
        form.setFieldsValue(paymentData)
    }, [paymentData]);

    const PhongData = {
        LoaiPhong: globalSTate.typeRoom,
        TenPhong: globalSTate.nameRoom,
        HutThuoc: globalSTate.smokingPolicy,
        ThongTinGiuong: globalSTate.Room?.map((data) => ({
            Giuong: data.idBed.split('-')[0],
            SoLuong: data.quantity,
        })),
        SoLuongKhach: globalSTate.numberGuest,
        KichThuoc: globalSTate.sizeRoom,
        Gia: globalSTate.price,
        TienNghi: globalSTate.convenientGroup,
        SoLuongPhong: globalSTate.numRoom,
    }
    // console.log(PhongData);
    const { listImages } = props;

    const navigate = useNavigate();
    // console.log(listImages);
    const handleFinish = (values) => {
        const addGlobalState = async () => {
            try {
                setIsLoading(true);
                const { MaPhong } = await phongApi.add(PhongData);
                const formData = new FormData();
                listImages.forEach(img => {
                    formData.append('photos', img);
                })
                formData.append('Phong', [MaPhong]);
                formData.append('TenChoNghi', globalSTate.nameHotel);
                formData.append('TieuDeDatDiem', globalSTate.titleHotel);
                formData.append('MoTaDatDiem', globalSTate.detailHotel);
                formData.append('DiaChi', globalSTate.addrMain);
                formData.append('ThanhPho', globalSTate.addrCity);
                formData.append('XepHang', globalSTate.selectStar);
                formData.append('TienNghi', globalSTate.convenientGroup);
                formData.append('HuyDatPhong', `Kh??ch ph???i h???y tr?????c ${globalSTate.policy.cancleDate}  ho???c thanh to??n 100% gi?? ph??ng ${globalSTate.policy.charge}`);
                formData.append('BaoHiemNhamLan', globalSTate.policy.insurance);
                formData.append('ThoiGianNhanPhong', JSON.stringify(globalSTate.policy.receiveDate));
                formData.append('ThoiGianTraPhong', JSON.stringify(globalSTate.policy.returnDate));
                formData.append('TinDung', JSON.stringify(globalSTate.payment.cartPayment));

                // console.log(JSON.stringify(globalSTate.payment.cartPayment));
                await choNghiApi.add(formData);
                toastSucsess("Th??m kh??ch s???n th??nh c??ng");
                dispatch(clearLocal());
                setIsLoading(false);
                navigate('/admin/hotels');
            } catch (error) {
                console.log(error);
                toastError("???? c?? l???i x???y ra");
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            addGlobalState();
        }, 1500);
        // console.log(values)
    }


    return (
        <div className='payment'>
            <Form form={form} onFinish={handleFinish} >
                <div className='payment__left'>
                    <div className="box">
                        <h5>L???a ch???n thanh to??n c???a kh??ch</h5>
                        <p>Qu?? v??? c?? th??? thu ti???n qua th??? t??n d???ng t???i ch??? ngh??? kh??ng?</p>
                        <Radio.Group onChange={({ target }) => setIsCredit(target.value)} defaultValue={isCredit} >
                            <Radio value={true}>C??</Radio>
                            <Radio value={false}>Kh??ng</Radio>
                        </Radio.Group>
                        {
                            isCredit ?
                                <div className='payment__left__is-credit'>
                                    <Form.Item name='cardPayment'>

                                        <Checkbox.Group onChange={(checkedValue) => setCartPayment(checkedValue)}>
                                            <Row>
                                                {
                                                    listCartPayment?.map((data, index) => (
                                                        <Col span={12}>
                                                            <Checkbox value={data._id}>
                                                                <div className='payment__left__is-credit__credit-card'>
                                                                    <img src={data.Logo} alt='credit-card' />
                                                                    <span> {data.TenTinDung}</span>
                                                                </div>
                                                            </Checkbox>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                                :
                                <p className='mt-2 no-credit'>Ch??ng t??i s??? th??ng b??o v???i kh??ch r???ng Qu?? v??? ch??? ch???p nh???n thanh to??n b???ng ti???n m???t.</p>
                        }

                    </div >
                    <div className='box mt-2'>
                        <h5>Thanh to??n hoa h???ng</h5>
                        <div className='payment__left__header'>
                            <p style={{ width: '60%', fontWeight: '500' }}>V??o ?????u m???i th??ng, ch??ng t??i s??? g???i cho Qu?? v??? h??a ????n c???a t???t c??? c??c ?????t ph??ng ???? ho??n t???t trong th??ng tr?????c.</p>
                            <div className='payment__left__header__fee'>
                                <h6>Ph???n tr??m hoa h???ng:</h6>
                                15%
                            </div>
                        </div>
                    </div>

                    <div className='box mt-5 payment__left__final-confirm'>
                        <h5>Qu?? v??? s???p ho??n t???t r???i ??? ch??? c??n v??i ??i???u l??u ?? cu???i c??ng</h5>
                        <div className='sub-title'>T??nh tr???ng ph??ng tr???ng c???a Qu?? v???</div>
                        <p>????? gi??p Qu?? v??? b???t ?????u ki???m doanh thu, ch??ng t??i s??? t??? ?????ng m??? ch??? ngh??? c???a Qu?? v??? cho kh??ch ?????t trong 18 th??ng t???i. N???u mu???n thay ?????i t??nh tr???ng ph??ng tr???ng tr?????c khi m???, Qu?? v??? c?? th??? ch???n "ho??n t???t ????ng k?? v?? m??? sau". T??nh tr???ng ph??ng tr???ng c??ng c?? th??? ???????c ??i???u ch???nh sau khi Qu?? v??? m??? ph??ng cho kh??ch ?????t.</p>

                        <div className='sub-title'>????? ho??n t???t ????ng k??, vui l??ng ????nh d???u v??o nh???ng ?? d?????i ????y:</div>
                        <Form.Item
                            name='checkedPolicy1'
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui l??ng ch???p nh???n ??i???u kho???ng')),
                                },
                            ]}
                        >
                            <Checkbox >T??i ch???ng nh???n ????y l?? ho???t ?????ng kinh doanh l??u tr?? h???p ph??p ???????c c???p ?????y ????? b???ng v?? gi???y ph??p c???n thi???t, c?? s???n ????? tr??nh khi c?? y??u c???u. Booking.com B.V. c?? quy???n ki???m ch???ng v?? ??i???u tra b???t k??? th??ng tin b??n Qu?? v??? cung c???p khi ????ng k??.</Checkbox>

                        </Form.Item>
                        <Form.Item
                            name='checkedPolicy2'
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui l??ng ch???p nh???n ??i???u kho???ng')),
                                },
                            ]}
                        >
                            <Checkbox >T??i ???? ?????c, ch???p nh???n v?? ?????ng ?? v???i <a href='#'>??i???u kho???n chung</a> v?? <a href='#'>Ch??nh s??ch An to??n</a> v?? B???o m???t.<br /><span className='describe'> Booking.com cho ph??p ch??? ngh??? v?? kh??ch trao ?????i qua Booking.com, n??i ti???p nh???n v?? x??? l?? th??ng tin li??n l???c tu??n th??? theo Ch??nh s??ch An to??n v?? B???o m???t v?? ??i???u kho???n chung c???a Booking.com.</span> </Checkbox>
                        </Form.Item>
                    </div>
                    <Button className='mt-3' loading={isLoading} type='primary' htmlType='submit' block >Ho??n t???t ????ng k?? v?? m??? ph??ng cho kh??ch ?????t</Button>
                    <div className='note'>S???p xong r???i! Qu?? v??? lu??n c?? th??? thay ?????i th??ng tin k??? c??? sau khi Qu?? v??? ???? ho??n t???t ????ng k??!</div>
                </div >
                <div className='payment__right'>
                    <div>
                        Kh??ch ?????t ph??ng th??? n??o v?? h??? thanh to??n ra sao? <br />
                        ????? ?????m b???o tr?????c 1 ?????t ph??ng, ch??ng t??i cho ph??p kh??ch s??? d???ng t???t c??? c??c ph????ng th???c thanh to??n b???ng th??? th??ng d???ng. Tuy nhi??n, khi thu ti???n, Qu?? v??? c?? th??? n??u r?? ph????ng th???c thanh to??n m?? Qu?? v??? ch???p nh???n t???i ch??? ngh???.
                    </div>
                    <div>
                        Ph?? hoa h???ng mang ?????n cho Qu?? v??? nh???ng g???
                        <ul>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Kh??ng c?? ???n ph?? - m???c hoa h???ng minh b???ch
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Ch??? ph???i tr??? cho nh???ng ?????t ph??ng ???? l??u tr??
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    H??? tr??? t??? nh??n vi??n 24/7 b???ng ??i???n tho???i hay email
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Hi???n di???n m???nh m??? tr??n c??c c??ng c??? t??m ki???m ????? thu h??t nhi???u ?????t ph??ng h??n
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Ph??n t??ch d??? li???u v?? l???i khuy??n h???u ??ch ????? t??ng hi???u su???t ho???t ?????ng ch??? ngh???
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    X??c nh???n t???c th?? ????? ti???t ki???m th???i gian cho Qu?? v???
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>
        </div >
    );
}

export default Payment;