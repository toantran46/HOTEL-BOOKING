import React from 'react';
import PropTypes from 'prop-types';

import './FooterInfor.scss';
import { Link } from 'react-router-dom';

FooterInfor.propTypes = {

};

function FooterInfor(props) {
    return (
        <div className="container-footer">
            <div className='wrapper-footer'>
                <div className="wrapper-footer__footer-left">
                    <ul>
                        <li><Link to={'#'}>Giới thiệu về chúng tôi</Link></li>
                        <span>|</span>
                        <li><Link to={'#'}>Đăng nhập vào Extranet</Link></li>
                        <span>|</span>
                        <li><Link to={'#'}>Chính sách Bảo mật và Cookie</Link></li>
                    </ul>
                </div>
                <div className="wrapper-footer__footer-right">
                    <div className="wrapper-footer__footer-right__copyright">
                        © Bản quyền hotel.booking.com 2022
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterInfor;