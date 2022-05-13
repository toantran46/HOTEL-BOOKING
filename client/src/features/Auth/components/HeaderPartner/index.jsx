import React from 'react';
import PropTypes from 'prop-types';

import './HeaderPartner.scss';
import { Link } from 'react-router-dom';

HeaderPartner.propTypes = {

};

function
    HeaderPartner(props) {
    return (
        <div className='navbar-partner'>
            <div className="navbar-partner__site">
                <div className="navbar-partner__site__top__left">
                    <Link to={'/'}>
                        LTHBooking.vn
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default
    HeaderPartner;