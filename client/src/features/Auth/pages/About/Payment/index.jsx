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
    console.log(PhongData);
    const { listImages } = props;

    const navigate = useNavigate();
    // console.log(listImages);
    const handleFinish = (values) => {
        setIsLoading(true);
        const addGlobalState = async () => {
            try {
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
                formData.append('HuyDatPhong', `Khách phải hủy trước ${globalSTate.policy.cancleDate}  hoặc thanh toán 100% giá phòng ${globalSTate.policy.charge}`);
                formData.append('BaoHiemNhamLan', globalSTate.policy.insurance);
                formData.append('ThoiGianNhanPhong', JSON.stringify(globalSTate.policy.receiveDate));
                formData.append('ThoiGianTraPhong', JSON.stringify(globalSTate.policy.returnDate));
                formData.append('TinDung', JSON.stringify(globalSTate.payment.cartPayment));

                // console.log(JSON.stringify(globalSTate.payment.cartPayment));
                await choNghiApi.add(formData);
                toastSucsess("Thêm khách sạn thành công");
                dispatch(clearLocal());
                setIsLoading(false);
                navigate('/admin/hotels');
            } catch (error) {
                console.log(error);
                toastError("Đã có lỗi xảy ra");
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            addGlobalState();
            setIsLoading(false);
        }, 1500);
        // console.log(values)
    }


    return (
        <div className='payment'>
            <Form form={form} onFinish={handleFinish} >
                <div className='payment__left'>
                    <div className="box">
                        <h5>Lựa chọn thanh toán của khách</h5>
                        <p>Quý vị có thể thu tiền qua thẻ tín dụng tại chỗ nghỉ không?</p>
                        <Radio.Group onChange={({ target }) => setIsCredit(target.value)} defaultValue={isCredit} >
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
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
                                <p className='mt-2 no-credit'>Chúng tôi sẽ thông báo với khách rằng Quý vị chỉ chấp nhận thanh toán bằng tiền mặt.</p>
                        }

                    </div >
                    <div className='box mt-2'>
                        <h5>Thanh toán hoa hồng</h5>
                        <div className='payment__left__header'>
                            <p style={{ width: '60%', fontWeight: '500' }}>Vào đầu mỗi tháng, chúng tôi sẽ gửi cho Quý vị hóa đơn của tất cả các đặt phòng đã hoàn tất trong tháng trước.</p>
                            <div className='payment__left__header__fee'>
                                <h6>Phần trăm hoa hồng:</h6>
                                15%
                            </div>
                        </div>
                    </div>

                    <div className='box mt-5 payment__left__final-confirm'>
                        <h5>Quý vị sắp hoàn tất rồi – chỉ còn vài điều lưu ý cuối cùng</h5>
                        <div className='sub-title'>Tình trạng phòng trống của Quý vị</div>
                        <p>Để giúp Quý vị bắt đầu kiếm doanh thu, chúng tôi sẽ tự động mở chỗ nghỉ của Quý vị cho khách đặt trong 18 tháng tới. Nếu muốn thay đổi tình trạng phòng trống trước khi mở, Quý vị có thể chọn "hoàn tất đăng ký và mở sau". Tình trạng phòng trống cũng có thể được điều chỉnh sau khi Quý vị mở phòng cho khách đặt.</p>

                        <div className='sub-title'>Để hoàn tất đăng ký, vui lòng đánh dấu vào những ô dưới đây:</div>
                        <Form.Item
                            name='checkedPolicy1'
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoảng')),
                                },
                            ]}
                        >
                            <Checkbox >Tôi chứng nhận đây là hoạt động kinh doanh lưu trú hợp pháp được cấp đầy đủ bằng và giấy phép cần thiết, có sẵn để trình khi có yêu cầu. Booking.com B.V. có quyền kiểm chứng và điều tra bất kỳ thông tin bên Quý vị cung cấp khi đăng ký.</Checkbox>

                        </Form.Item>
                        <Form.Item
                            name='checkedPolicy2'
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoảng')),
                                },
                            ]}
                        >
                            <Checkbox >Tôi đã đọc, chấp nhận và đồng ý với <a href='#'>Điều khoản chung</a> và <a href='#'>Chính sách An toàn</a> và Bảo mật.<br /><span className='describe'> Booking.com cho phép chỗ nghỉ và khách trao đổi qua Booking.com, nơi tiếp nhận và xử lý thông tin liên lạc tuân thủ theo Chính sách An toàn và Bảo mật và Điều khoản chung của Booking.com.</span> </Checkbox>
                        </Form.Item>
                    </div>
                    <Button className='mt-3' loading={isLoading} type='primary' htmlType='submit' block >Hoàn tất đăng ký và mở phòng cho khách đặt</Button>
                    <div className='note'>Sắp xong rồi! Quý vị luôn có thể thay đổi thông tin kể cả sau khi Quý vị đã hoàn tất đăng ký!</div>
                </div >
                <div className='payment__right'>
                    <div>
                        Khách đặt phòng thế nào và họ thanh toán ra sao? <br />
                        Để đảm bảo trước 1 đặt phòng, chúng tôi cho phép khách sử dụng tất cả các phương thức thanh toán bằng thẻ thông dụng. Tuy nhiên, khi thu tiền, Quý vị có thể nêu rõ phương thức thanh toán mà Quý vị chấp nhận tại chỗ nghỉ.
                    </div>
                    <div>
                        Phí hoa hồng mang đến cho Quý vị những gì?
                        <ul>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Không có ẩn phí - mức hoa hồng minh bạch
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Chỉ phải trả cho những đặt phòng đã lưu trú
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Hỗ trợ từ nhân viên 24/7 bằng điện thoại hay email
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Hiện diện mạnh mẽ trên các công cụ tìm kiếm để thu hút nhiều đặt phòng hơn
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Phân tích dữ liệu và lời khuyên hữu ích để tăng hiệu suất hoạt động chỗ nghỉ
                                </div>
                            </li>
                            <li>
                                <i class="bi bi-check-circle-fill"></i>
                                <div>
                                    Xác nhận tức thì để tiết kiệm thời gian cho Quý vị
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