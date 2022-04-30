import React from "react";
import PropTypes from "prop-types";

import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { PLACE, FLY, FLYHOTEL, HIRECAR, PLACEVISIT } from "constants";
import { ICONS } from "constants";
import { TAXI } from "constants";
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from "antd";
import { logout } from "app/userSlice";

Header.propTypes = {};

function Header(props) {
  const [isShowUserMenu, setIsShowUserMenu] = React.useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { loggedIn, user } = useSelector(state => state.auth)

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header__top">
          <div className="header__top__left">
            <Link to="/">LTHBooking.vn</Link>
          </div>
          <div className="header__top__right">
            <span className="header__top__right__currency">VND</span>
            <img
              className="header__top__right__country"
              src="https://t-cf.bstatic.com/static/img/flags/new/48-squared/vn/90b17da2aafaebce7b0c34189747e1e10dba8041.png"
              alt="location"
            />
            <Link to={(loggedIn && user.Quyen === "MANAGER") ? '/auth/about' : '/auth'} className="header__top__right__btn-outline">
              Đăng chổ nghỉ của Quý vị
            </Link>

            {/* User login */}
            {
              loggedIn ? <div tabIndex={1} onClick={() => setIsShowUserMenu(prev => !prev)} className={`header__top__right__profile ${isShowUserMenu ? 'active' : ''}`}>
                <Avatar style={{ backgroundColor: "rgb(245, 106, 0)" }} src={user.Avatar || ''}> {user.Avatar ? '' : user?.name?.charAt(0).toUpperCase()}  </Avatar>
                <div className='header__top__right__profile__name'>
                  {user.name}
                </div>
                {isShowUserMenu && <div className='header__top__right__profile__menu'>
                  <ul>
                    <li>
                      <Link to="/management/profile">
                        <span>
                          <i className="bi bi-person"></i>
                        </span>
                        Quản lí tài khoản</Link>
                    </li>
                    <li>
                      <Link to="/management/booked">
                        <span>
                          <i className="bi bi-basket"></i>
                        </span>
                        Đặt chổ</Link>
                    </li>
                    <li>
                      <Link to="/management/saved">
                        <span>
                          <i className="bi bi-heart"></i>
                        </span>
                        Đã lưu</Link>
                    </li>
                    <li>
                      <Link to="" onClick={() => dispatch(logout())} >
                        <span>
                          <i class="bi bi-box-arrow-left"></i>
                        </span>
                        Đăng xuất</Link>
                    </li>
                  </ul>
                </div>}
              </div>
                : <>
                  <Link
                    to="/auth/register-user"
                    className="header__top__right__btn-fullfill">
                    Đăng ký
                  </Link>
                  <Link
                    to="/auth/sign-in"
                    className="header__top__right__btn-fullfill">
                    Đăng nhập
                  </Link>
                </>
            }
          </div>
        </div>

        {!pathname.includes("management") && !pathname.includes("booking") && (
          <div className="header__bottom">
            <ul className="header__bottom__items">
              <li className="header__bottom__items__item active">
                <Link to="/">{PLACE}</Link>
                Lưu trú
              </li>
              <li className="header__bottom__items__item">
                <Link to="/">{FLY}</Link>
                Chuyến bay
              </li>
              <li className="header__bottom__items__item">
                <Link to="/">{FLYHOTEL}</Link>
                Chuyến bay + Khách sạn
              </li>
              <li className="header__bottom__items__item">
                <Link to="/">{HIRECAR}</Link>
                Thuê xe
              </li>
              <li className="header__bottom__items__item">
                <Link to="/">{PLACEVISIT}</Link>
                Địa điểm tham quan
              </li>
              <li className="header__bottom__items__item">
                <Link to="/">{TAXI}</Link>
                Taxi sân bay
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
