import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Table } from 'reactstrap';
import { MdDone, MdArrowForward } from "react-icons/md";

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
                    của Quý vị
                </div>
                <div className="bottom-text">
                    trên Booking.com
                </div>
                <div className="textArea">
                    Chỉ mất 15 phút để hoàn tất đăng ký - hãy bắt đầu ngay hôm nay
                </div>
            </div>
            <div className="container-right">
                <h2>Tạo đăng ký mới</h2>
                <div className="list-text">
                    <ul>
                        <li><span><MdDone /></span> Miễn phí tạo đăng ký</li>
                        <li><span><MdDone /></span> Hỗ trợ 24/7 qua điện thoại hoặc email</li>
                        <li><span><MdDone /></span> Đặt quy định riêng của Quý vị cho khách</li>
                        <li><span><MdDone /></span> Đồng bộ hóa lịch với các trang web khác</li>
                    </ul>
                </div>
                <div className="infor">
                    <div className="infor-hd">
                        <b>Tạo tài khoản đối tác để bắt đầu:</b>
                    </div>
                    <div className="infor-text">
                        <p>Bằng cách đi tiếp, Quý vị đồng ý cho Booking.com gửi email tới Quý vị về việc đăng ký chỗ nghỉ.</p>
                    </div>
                    <div className="button-start">
                        <a href="#">
                            Bắt đầu
                            <span>
                                <MdArrowForward />
                            </span>
                        </a>
                    </div>
                    <div className="infor-ft">
                        <div className="infor-if content">
                            <b>Quý vị đã bắt đầu quá trình đăng ký?</b>
                            <a href="#">Tiếp tục các bước đăng ký</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container;