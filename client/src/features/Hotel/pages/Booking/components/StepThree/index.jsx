import React from 'react';
import PropTypes from 'prop-types';

import "./StepThree.scss";
import { Alert, Button, Col, Form, Row, Select, message } from 'antd';
import InputField from 'custom-fields/InputField';
import { ClockCircleOutlined, InfoCircleOutlined, PayCircleOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import SelectField from 'custom-fields/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, resetData } from 'features/Hotel/HotelSlice';
import { values } from 'lodash';
import { choNghiApi } from 'api/ChoNghiApi';
import { datPhongApi } from 'api/DatPhongApi';
StepThree.propTypes = {
    credits: PropTypes.array,
};

StepThree.defaultProps = {
    credits: [],
};

function StepThree(props) {

    const { credits } = props;
    const { bookingPage, detailPage } = useSelector(state => state.hotelInfo);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);

    const [form] = Form.useForm();

    const defaultValues = {
        phone: null,
        ownerCredit: null,
        typeCredit: null,
        numCredit: null,
        phone: user.phone,
        expirationDateMonth: null,
        expirationDateYear: null
    }

    const handleBooking = (values) => {
        const data = {
            ThongTinPhong: bookingPage.ThongTinPhong,
            HoTenNguoiDat: bookingPage.HoTenNguoiDat.replace("-", " "),
            Email: bookingPage.Email,
            MaKhachSan: detailPage.placeSelected,
            MaNguoiDung: user._id,
            NgayNhanPhong: bookingPage.NgayNhanPhong,
            NgayTraPhong: bookingPage.NgayTraPhong,
            TongTien: bookingPage.TongTien,
            ThoiGianDenDuKien: bookingPage.ThoiGianDenDuKien == -1 ? "Không biết" : `Khoảng ${bookingPage.ThoiGianDenDuKien}:00 - ${+bookingPage.ThoiGianDenDuKien + 1}:00`,
            YeuCau: bookingPage.YeuCau,
            SoDienThoai: values.phone,
            TinDung: {
                TenChuThe: values.ownerCredit,
                LoaiThe: values.typeCredit,
                SoThe: values.numCredit,
                NgayHetHan: values.expirationDateMonth + "/" + values.expirationDateYear
            }
        }
        // console.log({ data });
        const onBooking = async () => {
            try {
                setIsLoading(true);
                const response = await datPhongApi.add(data);
                message.success(response.message);
                setIsLoading(false);
                dispatch(resetData());
                navigate("/");
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }

        onBooking()
    }

    return (
        <Form initialValues={defaultValues} onFinish={(values) => handleBooking(values)} form={form} layout="vertical">
            <div className='step-three'>
                <div className="step-three__box green-bg">
                    <h5>Nhập thông tin chi tiết của bạn: </h5>
                    <div className='more-info-green'>Gần xong rồi! Chỉ cần điền phần thông tin <span>*</span> bắt buộc</div>
                    <div className='more-info-red'><InfoCircleOutlined style={{ marginRight: 5 }} /> Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh</div>
                    <Row gutter={[20, 0]}>
                        <Col>
                            <InputField label='Điện thoại (ưu tiên số ĐTDĐ)' name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại !' }]} />
                            <div style={{ marginTop: -15 }} className='more-info-blur'>Cần thiết để chỗ nghỉ xác nhận đặt phòng của bạn</div>

                        </Col>
                        <Col flex={1}>
                            <div className='view-info'>
                                <div>
                                    <div><UserOutlined /> <Link to="" onClick={() => dispatch(changeStep(-1))}>Thay đổi</Link> </div>
                                </div>
                                <div className="main-content">Tên</div>
                                <div className='more-info-blur'>{bookingPage.HoTenNguoiDat.replace("-", " ")}</div>
                                <div className="main-content">Email</div>
                                <div className='more-info-blur'>{bookingPage.Email}</div>
                            </div>
                        </Col>
                    </Row>

                </div>
                <div className="step-three__box green-bg">
                    <h5>Bạn muốn thanh toán thế nào? </h5>
                    <Alert type='info' message="Thẻ của bạn chưa bị trừ tiền, chúng tôi chỉ cần thông tin thẻ để giữ đặt phòng cho bạn." showIcon />
                    <div style={{ maxWidth: "60%", marginTop: '2rem' }}>
                        <InputField label='Tên chủ thẻ' name='ownerCredit' rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ !' }]} />
                        <SelectField label='Loại thẻ' name='typeCredit' rules={[{ required: true, message: 'Vui lòng chọn loại thẻ !' }]} options={credits?.map(credit => ({ label: credit.TenTinDung, value: credit._id }))} />
                        <InputField label='Số thẻ' name='numCredit' rules={[{ required: true, message: 'Vui lòng nhập số thẻ !' }]} />
                        <Row gutter={[20, 0]}>
                            <Col span={14}>
                                <SelectField label='Ngày hết hạn' placeholder='Tháng' rules={[{ required: true, message: '' }]} name='expirationDateMonth' options={new Array(12).fill().map((i, index) => ({ label: "Tháng " + (index + 1), value: index + 1 }))} />
                            </Col>
                            <Col span={10}>
                                <SelectField label='-' placeholder='Năm' rules={[{ required: true, message: '' }]} name='expirationDateYear' options={new Array(5).fill().map((i, index) => ({ label: "Năm " + (new Date().getFullYear() + index + 1), value: (new Date().getFullYear() + index + 1) }))} />
                            </Col>
                        </Row>
                    </div>

                </div>

                <p className='confirm'>Đặt phòng của bạn là đặt phòng trực tiếp với Pullman Vung Tau và bằng việc hoàn tất đặt phòng này, bạn đồng ý với <a href='#' target="_blank">điều kiện đặt phòng</a>, <a href='#' target="_blank">các điều khoản chung</a> và <a href='#' target="_blank">chính sách an toàn và bảo mật</a>.</p>
                <div style={{ textAlign: 'end' }}>
                    <Button type='primary' style={{ marginRight: 5 }} ghost onClick={() => document.querySelector("body").scrollIntoView("body")}>Kiểm tra lại phòng</Button>
                    <Button loading={isLoading} htmlType='submit' type='primary' icon={<ShoppingCartOutlined />}>Hoàn tất đặt phòng</Button>
                </div>
            </div >
        </Form>
    );
}

export default StepThree;