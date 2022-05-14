import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

Header.propTypes = {

};

function Header(props) {
    return (
        <div className='header-auth'>
            <div className="header-auth__top__left">
                <Link to={'/'}>
                    LTHBooking.com
                </Link>
            </div>
            <div className="banner-right">
                <span>Đã là đối tác ?</span>
                <div className="banner-right__sign">
                    <div className="banner-right__sign__hov">
                        <Link to={'/auth/sign-in'}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
                <div className="banner-right__help">
                    <div className="banner-right__help__hov">
                        <Link to={'#'}>
                            Trợ giúp
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;