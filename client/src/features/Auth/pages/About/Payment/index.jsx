import React from 'react';
import PropTypes from 'prop-types';
import "./Payment.scss";
import { Button, Checkbox, Col, Radio, Row, Select, Form } from 'antd';
import SelectField from 'custom-fields/SelectField';
import InputField from 'custom-fields/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addCredit, addPayment, setTab } from 'features/Auth/authSlice';
import { tinDungApi } from 'api/TinDungApi';
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

    React.useEffect(() => {
        const fetchCartPayment = async () => {
            try {
                const { cartPayments } = await tinDungApi.getAll();
                setListCartPayment(cartPayments);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartPayment();
    }, [])

    React.useEffect(() => {
        dispatch(addPayment({ cartPayment, isCredit, nameOwner, nameCompany }))
    }, [cartPayment, isCredit, nameOwner, nameCompany]);

    const handleFinish = (values) => {
        // console.log(values)
        // console.log(globalSTate.tab);
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
                                                {/* <Col span={12}>
                                                    <Checkbox value={1}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/png;base64,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' alt='credit-card' />
                                                            <span>MB Bank</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={2}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/png;base64,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' alt='credit-card' />
                                                            <span>Agribank</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={3}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/jpeg;base64,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' alt='credit-card' />
                                                            <span>Vietcombank</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={4}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/png;base64,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' alt='credit-card' />
                                                            <span>VP Bank</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={5}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/png;base64,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' alt='credit-card' />
                                                            <span>MasterCard</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={6}>
                                                        <div className='payment__left__is-credit__credit-card'>
                                                            <img src='data:image/png;base64,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' alt='credit-card' />
                                                            <span>Visa</span>
                                                        </div>
                                                    </Checkbox>
                                                </Col> */}
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
                        <div className='payment__left__main'>
                            <Form.Item name='nameInstead'>
                                <Select onChange={(value) => setNameOwner(value)} style={{ minWidth: '100%' }} defaultValue={globalSTate.nameOwner} label='Chúng tôi nên viết tên nào trên hóa đơn (ví dụ: tên công ty/pháp lý)?' options={[

                                    { label: payment.nameOwner, value: payment.nameOwner },
                                    { label: "Khác", value: "Khac" },
                                ]} />
                            </Form.Item>

                            <br />
                            <br />
                            {nameOwner === 'Khac' &&
                                <InputField onChange={(value) => setNameCompany(value)} name='nameCompany' label='Tên pháp lý của công ty' />}

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
                    <Button className='mt-3' type='primary' htmlType='submit' block >Hoàn tất đăng ký và mở phòng cho khách đặt</Button>
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