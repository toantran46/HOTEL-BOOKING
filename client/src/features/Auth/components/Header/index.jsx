import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className='header-auth'>
            <img src="https://static.booking.com/static/img/b26logo/booking_logo_retina.png" alt="" />
        </div>
    );
}

export default Header;