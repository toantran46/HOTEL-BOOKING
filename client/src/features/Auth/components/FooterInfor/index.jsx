import React from 'react';
import PropTypes from 'prop-types';

import './FooterInfor.scss';

FooterInfor.propTypes = {

};

function FooterInfor(props) {
    return (
        <div className="container-footer">
            <div className='wrapper-footer'>
                <div className="wrapper-footer__footer-left">
                    <ul>
                        <li><a href="#">Giới thiệu về chúng tôi</a></li>
                        <li><a href="#">Đăng nhập vào Extranet</a></li>
                        <li><a href="#">Chính sách Bảo mật và Cookie</a></li>
                    </ul>
                </div>
                <div className="wrapper-footer__footer-right">
                    <div className="copyright">
                        © Bản quyền hotel.booking.com 2022
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterInfor;