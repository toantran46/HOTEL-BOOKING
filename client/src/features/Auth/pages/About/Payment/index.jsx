import React from 'react';
import PropTypes from 'prop-types';
import "./Payment.scss";
Payment.propTypes = {

};

function Payment(props) {
    return (
        <div className='payment'>
            <div className='payment__left'>
                <div className="box">
                    this is payment

                </div>
            </div>
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
        </div>
    );
}

export default Payment;