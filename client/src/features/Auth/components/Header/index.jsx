import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button } from 'reactstrap';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className='header-auth'>
            <img src="https://static.booking.com/static/img/b26logo/booking_logo_retina.png" alt="" />
            <div className="banner-right">
                <span>Đã là đối tác ?</span>
                <Button color="primary" outline >
                    Đăng nhập
                </Button>
                <Button color="primary" >
                    Trợ giúp
                </Button>
            </div>
        </div>
    );
}

export default Header;