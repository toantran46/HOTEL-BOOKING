import React from 'react';
import PropTypes from 'prop-types';

import './FooterPartner.scss'

FooterPartner.propTypes = {

};

function FooterPartner(props) {
    return (
        <div>
            <div className="policy-content">
                Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các điều khoản và điều kiện
                cũng như chính sách an toàn và bảo mật của chúng tôi
            </div>
            <div className="copyright">
                Bảo lưu mọi quyền.
                <br />
                Bản quyền (2022) - Booking.com™
            </div>
        </div>
    );
}

export default FooterPartner;