import React from 'react';
import PropTypes from 'prop-types';

import "./SideBarManagement.scss";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/userSlice';
SideBarManagement.propTypes = {

};

function SideBarManagement(props) {
    const { pathname } = useLocation();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div className='sidebar-management'>
            <ul>
                <li className={pathname.includes('profile') ? 'active' : ''}>
                    <Link to="/management">
                        <span>
                            <i class="bi bi-person"></i>
                        </span>
                        Thông tin cá nhân
                    </Link>
                </li>
                {
                    user.Quyen !== "USER" &&
                    <li>
                        <Link to="/admin">
                            <span>
                                <i class="bi bi-gear"></i>
                            </span>
                            Quản lí chổ nghĩ</Link>
                    </li>
                }
                {
                    user?.Quyen !== "ADMIN" &&
                    <li className={pathname.includes('booked') ? 'active' : ''}>
                        <Link to="/management/booked">
                            <span>
                                <i class="bi bi-basket"></i>
                            </span>
                            Đặt chổ
                        </Link>
                    </li>
                }
                <li className={pathname.includes('saved') ? 'active' : ''}>
                    <Link to="/management/saved">
                        <span>
                            <i class="bi bi-heart"></i>
                        </span>
                        Đã lưu</Link>
                </li>
                <li>
                    <Link to="" onClick={() => dispatch(logout())}>
                        <span>
                            <i class="bi bi-box-arrow-left"></i>
                        </span>
                        Đăng xuất</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBarManagement;