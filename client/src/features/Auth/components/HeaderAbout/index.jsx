import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HeaderAbout.scss';
import { useDispatch } from 'react-redux';
import { logout } from 'app/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { toastSucsess } from 'utils/notifi';


HeaderAbout.propTypes = {

};

function HeaderAbout(props) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toastSucsess('Bye');
    };


    return (
        <div className='navbar-about'>
            <div className="navbar-about__banner">
                <div className="nanavbar-about__banner__left">
                    <Link to={'/'}>
                        LTHBooking.com
                    </Link>
                </div>
                <div className="navbar-about__banner__right">
                    <ul>
                        <li>
                            <Link to={'/admin/hotels'}>
                                <i class="bi bi-house-door-fill"></i>
                                Những chỗ nghỉ của tôi
                            </Link>
                        </li>
                        <li>
                            <Link to={'/auth/sign-in'} onClick={handleLogout}>
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