import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HeaderAbout.scss';

HeaderAbout.propTypes = {

};

function HeaderAbout(props) {
    return (
        <div className='navbar-about'>
            <div className="navbar-about__banner">
                <Link to={'/'}>
                    <img src="//static.booking.com/static/img/b26logo/booking_logo_retina.png" alt="Booking.com logo" />
                </Link>
                <div className="navbar-about__banner__right">
                    <ul>
                        <li>
                            <Link to={''}>
                                <i class="bi bi-house-door-fill"></i>
                                Những chỗ nghỉ của tôi
                            </Link>
                        </li>
                        <li>
                            <Link to={''}>
                                <i class="bi bi-power"></i>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
}

export default HeaderAbout;