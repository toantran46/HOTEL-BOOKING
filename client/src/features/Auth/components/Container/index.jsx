import React from 'react';
import PropTypes from 'prop-types';

import './Container.scss';
import { Table } from 'reactstrap';
import { MdDone, MdArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

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
                    trên LTHBooking.com
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
                    <div className="button-start">
                        <Link to={'/auth/register'}>
                            Bắt đầu
                            <span>
                                <MdArrowForward />
                            </span>
                        </Link>

                    </div>
                    <div className="infor-ft">
                        <div className="infor-if content">
                            <b>Quý vị đã bắt đầu quá trình đăng ký?</b>
                            <Link to={'#'}>Tiếp tục các bước đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container;