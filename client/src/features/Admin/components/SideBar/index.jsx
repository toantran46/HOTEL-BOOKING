import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

Sidebar.propTypes = {};

function Sidebar({ widthSideBar }) {
  const location = useLocation();
  const target =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className="sidebar" style={{ width: `${widthSideBar}px` }}>
      <div className="sidebar__header shadow-lg">
        <img
          className="sidebar__logo-name"
          src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
          alt="admin logo"
        />
        <span className="sidebar__logo-name">LTH Booking</span>
      </div>

      <div className="sidebar__manager">
        <div className="sidebar__info">
          <img
            className="sidebar__info-img"
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.18169-9/18952686_1735481316750526_1304793333542509082_n.jpg?stp=c0.79.720.720a_dst-jpg_s851x315&_nc_cat=100&ccb=1-5&_nc_sid=da31f3&_nc_ohc=trJ6MQ3RsncAX_vCtNV&tn=L-belTOs__xWszIJ&_nc_ht=scontent.fsgn5-5.fna&oh=00_AT9NId0qdfUCZCT5l9Gcw2BcGbXdv3-2JyRRRNkrSKSALg&oe=628A6858"
            alt="avatar"
          />
          <h5 className="sidebar__info-name">Hiếu Nguyễn</h5>
          <span className="sidebar__info-position">Manager</span>
        </div>

        <div className="sidebar__controls">
          <div className="sidebar__control-item">
            <Link to="/">
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
          <div className="sidebar__control-item">
            <Link to="/">
              <i class="fa-solid fa-envelope"></i>
            </Link>
          </div>
          <div className="sidebar__control-item">
            <Link to="/">
              <i className="fa-solid fa-comment-dots"></i>
            </Link>
          </div>
          <div className="sidebar__control-item">
            <Link to="/">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Link>
          </div>
        </div>
      </div>

      <ul className="sidebar__list">
        <li
          className={
            target === "users"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/admin/users" className="sidebar__list-link">
            <i className="fa-solid fa-user-group"></i>
            Users
          </Link>
        </li>
        <li
          className={
            target === "bookings"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/admin/bookings" className="sidebar__list-link">
            <i className="fa-solid fa-cart-flatbed"></i>
            Bookings
          </Link>
        </li>
        <li
          className={
            target === "hotels"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/admin/hotels" className="sidebar__list-link">
            <i className="fa-solid fa-hotel"></i>
            Hotels
          </Link>
        </li>
        <li
          className={
            target === "rooms"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/admin/hotels" className="sidebar__list-link">
            <i className="fa-solid fa-hotel"></i>
            Rooms
          </Link>
        </li>
        <li
          className={
            target === "convenients"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/" className="sidebar__list-link">
            <i className="fa-solid fa-bottle-droplet"></i>
            Convenient
          </Link>
        </li>
        <li
          className={
            target === "places"
              ? "sidebar__list-item sidebar__list-item--active"
              : "sidebar__list-item"
          }
        >
          <Link to="/" className="sidebar__list-link">
            <i className="fa-solid fa-location-dot"></i>
            Places
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
