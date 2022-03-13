import React from 'react';
import PropTypes from 'prop-types';

import "./Header.scss";
import { Link, useLocation } from 'react-router-dom';
import { PLACE, FLY, FLYHOTEL, HIRECAR, PLACEVISIT } from 'constants';
import { ICONS } from 'constants';

Header.propTypes = {

};

function Header(props) {
    const [isShowUserMenu, setIsShowUserMenu] = React.useState(false);
    const { pathname } = useLocation();

    return (
        <div className='header-wrapper'>
            <div className='header'>
                <div className='header__top'>
                    <div className='header__top__left'>
                        <Link to="/">
                            LTBooking.vn
                        </Link>
                    </div>
                    <div className='header__top__right'>
                        <span className='header__top__right__currency'>VND</span>
                        <img className='header__top__right__country' src="https://t-cf.bstatic.com/static/img/flags/new/48-squared/vn/90b17da2aafaebce7b0c34189747e1e10dba8041.png" alt='location' />
                        <Link to="/auth" className='header__top__right__btn-outline'>Đăng chổ nghỉ của Quý vị</Link>
                        {/* <Link to="/auth/register" className='header__top__right__btn-fullfill'>Đăng ký</Link>
                        <Link to="/auth/sign-in" className='header__top__right__btn-fullfill'>Đăng nhập</Link> */}

                        {/* User login */}
                        <div tabIndex={1} onClick={() => setIsShowUserMenu(prev => !prev)} className={`header__top__right__profile ${isShowUserMenu ? 'active' : ''}`}>
                            <div className='header__top__right__profile__avatar'>
                                <img src='https://t-cf.bstatic.com/static/img/identity/profile/b47cd0e05ec8b7831167f4f7593ead56402a6bb4.svg' alt='avatar' />
                            </div>
                            <div className='header__top__right__profile__name'>
                                Trương Việt Linh
                            </div>
                            {isShowUserMenu && <div className='header__top__right__profile__menu'>
                                <ul>
                                    <li>
                                        <Link to="/management/profile">
                                            <span>
                                                <i class="bi bi-person"></i>
                                            </span>
                                            Quản lí tài khoản</Link>
                                    </li>
                                    <li>
                                        <Link to="/management/booked">
                                            <span>
                                                <i class="bi bi-basket"></i>
                                            </span>
                                            Đặt chổ</Link>
                                    </li>
                                    <li>
                                        <Link to="/management/saved">
                                            <span>
                                                <i class="bi bi-heart"></i>
                                            </span>
                                            Đã lưu</Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <span>
                                                <i class="bi bi-box-arrow-left"></i>
                                            </span>
                                            Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>}
                        </div>



                    </div>
                </div>

                {
                    !pathname.includes("management") &&
                    <div className='header__bottom'>
                        <ul className='header__bottom__items'>
                            <li className='header__bottom__items__item active'>
                                <Link to="/">{PLACE}</Link>
                                Lưu trú
                            </li>
                            <li className='header__bottom__items__item'>
                                <Link to="/">{FLY}</Link>
                                Chuyến bay
                            </li>
                            <li className='header__bottom__items__item'>
                                <Link to="/">{FLYHOTEL}</Link>
                                Chuyến bay + Khách sạn
                            </li>
                            <li className='header__bottom__items__item'>
                                <Link to="/">{HIRECAR}</Link>
                                Thuê xe
                            </li>
                            <li className='header__bottom__items__item'>
                                <Link to="/">{PLACEVISIT}</Link>
                                Địa điểm tham quan
                            </li>
                            <li className='header__bottom__items__item'>
                                <Link to="/">{PLACE}</Link>
                                Taxi sân bay
                            </li>
                        </ul>
                    </div>
                }
            </div>

        </div>
    );
}

export default Header;