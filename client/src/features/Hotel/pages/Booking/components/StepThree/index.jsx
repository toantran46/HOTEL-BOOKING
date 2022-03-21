import React from 'react';
import PropTypes from 'prop-types';

import "./StepThree.scss";
import { Alert, Button, Col, Row, Select } from 'antd';
import InputField from 'custom-fields/InputField';
import { ClockCircleOutlined, InfoCircleOutlined, PayCircleOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SelectField from 'custom-fields/SelectField';
StepThree.propTypes = {

};

function StepThree(props) {
    return (
        <div className='step-three'>
            <div className="step-three__box green-bg">
                <h5>Nhập thông tin chi tiết của bạn: </h5>
                <div className='more-info-green'>Gần xong rồi! Chỉ cần điền phần thông tin <span>*</span> bắt buộc</div>
                <div className='more-info-red'><InfoCircleOutlined style={{ marginRight: 5 }} /> Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh</div>
                <Row gutter={[100, 0]}>
                    <Col>
                        <InputField label='Điện thoại (ưu tiên số ĐTDĐ) *' name='phone' />
                        <div style={{ marginTop: -15 }} className='more-info-blur'>Cần thiết để chỗ nghỉ xác nhận đặt phòng của bạn</div>

                    </Col>
                    <Col flex={1}>
                        <div className='view-info'>
                            <div>
                                <div><UserOutlined /> <Link to="/">Thay đổi</Link> </div>
                            </div>
                            <div className="main-content">Tên</div>
                            <div className='more-info-blur'>Trọng Toàn</div>
                            <div className="main-content">Email</div>
                            <div className='more-info-blur'>toan@gmail.com</div>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className="step-three__box green-bg">
                <h5>Bạn muốn thanh toán thế nào? </h5>
                <Alert type='info' message="Thẻ của bạn chưa bị trừ tiền, chúng tôi chỉ cần thông tin thẻ để giữ đặt phòng cho bạn." showIcon />
                <div style={{ maxWidth: "60%", marginTop: '2rem' }}>
                    <InputField label='Tên chủ thẻ *' name='name' />
                    <SelectField label='Loại thẻ *' name='expirationDate' options={[{ label: "Momo", value: 1 }, { label: "VN pay", value: 2 }, { label: "MB Bank", value: 3 },]} />
                    <InputField label='Số thẻ *' name='code' />
                    <Row align='middle' gutter={[10, 0]}>
                        <Col span={11}>
                            <SelectField label='Ngày hết hạn *' name='expirationDate' options={[{ label: "Momo", value: 1 }, { label: "VN pay", value: 2 }, { label: "MB Bank", value: 3 },]} />
                        </Col>
                        <Col span={1}>
                            /
                        </Col>
                        <Col span={11}>
                            <SelectField label='.' name='expirationDate' options={[{ label: "Momo", value: 1 }, { label: "VN pay", value: 2 }, { label: "MB Bank", value: 3 },]} />

                        </Col>
                    </Row>
                </div>

            </div>

            <p className='confirm'>Đặt phòng của bạn là đặt phòng trực tiếp với Pullman Vung Tau và bằng việc hoàn tất đặt phòng này, bạn đồng ý với <a href='#' target="_blank">điều kiện đặt phòng</a>, <a href='#' target="_blank">các điều khoản chung</a> và <a href='#' target="_blank">chính sách an toàn và bảo mật</a>.</p>
            <div style={{ textAlign: 'end' }}>
                <Button type='primary' style={{ marginRight: 5 }} ghost>Kiểm tra lại phòng</Button>
                <Button type='primary' icon={<ShoppingCartOutlined />}>Hoàn tất đặt phòng</Button>
            </div>
        </div >
    );
}

export default StepThree;