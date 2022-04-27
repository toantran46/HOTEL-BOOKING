import React from 'react';
import PropTypes from 'prop-types';
import "./StepTwo.scss";
import { BarcodeOutlined, CheckCircleOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import { ICONS } from 'constants';
import { Link } from 'react-router-dom';
import { Button, Col, Form, message, Row, Select } from 'antd';
import InputField from 'custom-fields/InputField';
import FavouriteConvenients from 'features/Hotel/components/FavouriteConvenients';
import { MdSmokeFree } from 'react-icons/md';
import { handleDateByFormat } from 'assets/globaJS';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, saveDataStepTwo } from 'features/Hotel/HotelSlice';

StepTwo.propTypes = {
    roomSelected: PropTypes.array,
    placeInfo: PropTypes.object,
    timeInfo: PropTypes.object,
};

StepTwo.defaultProps = {
    roomSelected: [],
    placeInfo: {},
    timeInfo: {},
};

function StepTwo(props) {
    const { roomSelected, timeInfo, placeInfo } = props;

    const { HoTenNguoiDat, Email, YeuCau, ThoiGianDenDuKien, ThongTinPhong } = useSelector(state => state.hotelInfo.bookingPage);
    const { user } = useSelector(state => state.auth);

    const [form] = Form.useForm();

    console.log({ placeInfo });

    const dispatch = useDispatch();

    const handleDoneStep2 = values => {
        const {
            confirmEmail,
            email,
            name,
            request,
            surName,
            intentTime
        } = values;

        if (confirmEmail !== email) return message.error("Email và confirm email không trùng khớp !");

        const data = {
            bookerName: surName + "-" + name,
            email,
            request,
            intentTime,
            roomInfo: roomSelected.map((item) => ({
                Phong: item.room._id,
                TenNguoiNhanPhong: form.getFieldValue(`receiverName${item.room._id}`) || (surName + " " + name),
                SoLuong: item.quantity
            })),
            totalPrice: +parseFloat(roomSelected.reduce((a, room) => a + room.price, 0) * (1 + 0.08 + 0.05)).toFixed(0),
            receiveDate: timeInfo.receiveDate,
            returnDate: timeInfo.returnDate,
        }

        dispatch(saveDataStepTwo(data));
        dispatch(changeStep(1));

    }

    React.useEffect(() => {
        ThongTinPhong.forEach(item => {
            form.setFieldsValue({ ['receiverName' + item.Phong]: item.TenNguoiNhanPhong || '' });
        })
    }, [ThongTinPhong])

    return (
        <Form initialValues={{
            surName: HoTenNguoiDat?.split("-")[0] || '',
            name: HoTenNguoiDat?.split("-")[1] || '',
            email: user.email || '',
            confirmEmail: user.email || '',
            request: YeuCau,
            intentTime: ThoiGianDenDuKien || -2,
        }} form={form} onFinish={(values) => handleDoneStep2(values)}>
            <div className='step-two'>
                <div className="step-two__box">
                    <h5>Mách nhỏ: </h5>
                    <div className='tips'>
                        <CheckCircleOutlined style={{ marginRight: 10, color: "#008009" }} /> Miễn phí hủy đến {placeInfo.timeGetAndReturnRoom.getFrom + ":00 " + handleDateByFormat("DD MM YYYY", timeInfo.receiveDate, -1)}
                    </div>
                    <div className='tips'>
                        <CheckCircleOutlined style={{ marginRight: 10, color: "#008009" }} /> Hôm nay không cần trả tiền. Bạn sẽ thanh toán trong lúc nghỉ.
                    </div>
                </div>
                <div className="step-two__box">
                    <Link to="/auth">{ICONS.PERSON} Đăng nhập</Link> để đặt phòng với thông tin đã lưu của bạn hoặc <Link to="/auth/register">đăng ký</Link> để quản lý các đặt phòng của bạn mọi lúc mọi nơi!
                </div>
                <div className="step-two__box green-bg">
                    <h5>Nhập thông tin chi tiết của bạn: </h5>
                    <div className='more-info-green'>Gần xong rồi! Chỉ cần điền phần thông tin <span>*</span> bắt buộc</div>
                    <div className='more-info-red'><InfoCircleOutlined style={{ marginRight: 5 }} /> Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh</div>
                    <Row gutter={[30, 0]}>
                        <Col>
                            <InputField label='Họ (tiếng Anh)' name='surName' rules={[{ required: true, message: 'Vui lòng nhập họ !' }]} />
                        </Col>
                        <Col>
                            <InputField label='Tên (tiếng Anh)' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên !' }]} />
                        </Col>
                    </Row>
                    <InputField label='Địa chỉ email *' name='email' type='email' placeholder='chú ý tránh lỗi chính tả' rules={[{ required: true, message: 'Vui lòng nhập email !' }]} />
                    <div className='more-info-blur'>Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này</div>

                    <InputField label='Xác nhận địa chỉ email' name='confirmEmail' type='email' rules={[{ required: true, message: 'Vui lòng xác nhận lại email !' }]} />

                </div>

                {
                    roomSelected?.map((item, index) =>
                        <div key={item.room._id} className="step-two__box green-bg">
                            <h5>{item.room.name}</h5>
                            <div className='tips'>
                                <CheckCircleOutlined style={{ marginRight: 10, color: "#008009" }} /> <span>Miễn phí hủy</span> đến {placeInfo.timeGetAndReturnRoom.getFrom + ":00 " + handleDateByFormat("DD MM YYYY", timeInfo.receiveDate, -1)}
                            </div>
                            <div className='convenients'>
                                <FavouriteConvenients convenients={item.room.convenients} />
                            </div>

                            <div className='max-num'>Số người tối đa: {new Array(item.room.customerMax).fill().map((i, index) => <span key={index}>{ICONS.PERSON}</span>)} </div>
                            <InputField label='Tên đầy đủ của khách' name={`receiverName${item.room._id}`} placeholder='Họ (tiếng Anh), Tên (tiếng Anh)' />
                        </div>)
                }


                <div className="step-two__box green-bg">
                    <h5>Các Yêu Cầu Đặc Biệt</h5>
                    <div>
                        Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên, chỗ nghỉ sẽ cố gắng hết sức để thực hiện. Bạn luôn có thể gửi yêu cầu đặc biệt sau khi hoàn tất đặt phòng của mình!
                    </div>
                    <br />
                    <InputField label='Vui lòng ghi yêu cầu của bạn tại đây. (không bắt buộc)' name='request' type='textarea' />
                </div>

                <div className="step-two__box green-bg">
                    <h5>Thời gian đến của bạn</h5>
                    <div className='tips mb-2' >
                        <CheckCircleOutlined style={{ fontSize: 18, marginRight: 15, color: "#008009" }} /> Phòng của bạn sẽ sẵn sàng để nhận vào lúc {placeInfo.timeGetAndReturnRoom.getFrom}:00
                    </div>
                    <div className='tips'>
                        <BarcodeOutlined style={{ fontSize: 18, marginRight: 15, color: "#008009" }} /> Lễ tân 24 giờ - Luôn có trợ giúp mỗi khi bạn cần!
                    </div>
                    <br />
                    <label className='mb-1 label'>Thêm thời gian đến dự kiến của bạn <span>(không bắt buộc)</span></label>
                    <Form.Item name="intentTime">
                        <Select style={{ minWidth: "50%" }}  >
                            <Select.Option disabled value={-2}>Vui lòng chọn</Select.Option>
                            <Select.Option value={-1}>Tôi không biết</Select.Option>
                            {
                                new Array(placeInfo.timeGetAndReturnRoom?.getTo - placeInfo?.timeGetAndReturnRoom.getFrom).fill(0).map((i, index) =>
                                    <Select.Option key={index + 2} value={index + placeInfo.timeGetAndReturnRoom?.getFrom}>{index + placeInfo.timeGetAndReturnRoom.getFrom}:00-{index + placeInfo.timeGetAndReturnRoom.getFrom + 1}:00</Select.Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ textAlign: 'end' }}>
                    <Button htmlType='submit' type='primary'>Tiếp theo: Chi tiết cuối cùng <RightOutlined /></Button>
                </div>
            </div>
        </Form>
    );
}

export default StepTwo;