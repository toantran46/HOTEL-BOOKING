import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button } from 'reactstrap';

Container.propTypes = {
    
};

function Container(props) {
    return (
        <div className="container">
            <div className='container-left'>
                <div className="top-text">
                    Đăng
                </div>
                <div className="middle-text">
                    khách sạn
                </div>
                <div className="bottom-text">
                    của Quý vị trên Booking.com
                </div>
            </div>
            <div className="container-right">
                <h2>Tạo đăng ký mới</h2>
                <div className="list-text">
                    <ul>
                        <li><span>check</span> Miễn phí tạo đăng ký</li>
                        <li><span>check</span> Hỗ trợ 24/7 qua điện thoại hoặc email</li>
                        <li><span>check</span> Đặt quy định riêng của Quý vị cho khách</li>
                        <li><span>check</span> Đồng bộ hóa lịch với các trang web khác</li>
                    </ul>
                </div>
                <div className="info">
                    <a href="#">
                        Bắt đầu
                        <span>
                            mũi tên
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Container;