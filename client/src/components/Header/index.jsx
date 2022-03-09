import React from 'react';
import PropTypes from 'prop-types';

import "./Header.scss";
import { Link } from 'react-router-dom';
import { PLACE, FLY, FLYHOTEL, HIRECAR, PLACEVISIT } from 'constants';

Header.propTypes = {

};

function Header(props) {
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
                        <Link to="#" className='header__top__right__btn-outline'>Đăng chổ nghỉ của Quý vị</Link>
                        <Link to="#" className='header__top__right__btn-fullfill'>Đăng ký</Link>
                        <Link to="#" className='header__top__right__btn-fullfill'>Đăng nhập</Link>
                    </div>
                </div>
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
            </div>

        </div>
    );
}

export default Header;