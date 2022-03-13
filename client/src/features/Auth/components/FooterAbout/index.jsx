import React from 'react';
import PropTypes from 'prop-types';

import './FooterAbout.scss';
import { Link } from 'react-router-dom';

FooterAbout.propTypes = {

};

function FooterAbout(props) {
    return (
        <div className="container-footer">
            <div className='wrapper-footer'>
                <div className="wrapper-footer__footer-left">
                    <ul>
                        <li><Link to={'#'}>Giới thiệu về chúng tôi</Link></li>
                        <li><Link to={'#'}>Đăng nhập vào Extranet</Link></li>
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

export default FooterAbout;