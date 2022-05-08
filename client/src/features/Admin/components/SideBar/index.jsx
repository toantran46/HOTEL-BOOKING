import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

Sidebar.propTypes = {};

function Sidebar({ widthSideBar }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

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
          {user.Avatar ? (
            <img
              className="sidebar__info-img"
              src={user.Avatar || ""}
              alt="avatar"
            />
          ) : (
            <div className="sidebar__info-img-not-avatar ">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h5 className="sidebar__info-name">{user.name}</h5>
          <span className="sidebar__info-position">{user.Quyen}</span>
        </div>

        <div className="sidebar__controls">
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
        {user?.Quyen === "ADMIN" && (
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
        )}
        {(user?.Quyen === "ADMIN" || user?.Quyen === "MANAGER") && (
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
        )}
        {(user?.Quyen === "ADMIN" || user?.Quyen === "MANAGER") && (
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
        )}
        {(user?.Quyen === "ADMIN" || user?.Quyen === "MANAGER") && (
          <li
            className={
              target === "rooms"
                ? "sidebar__list-item sidebar__list-item--active"
                : "sidebar__list-item"
            }
          >
            <Link to="/admin/rooms" className="sidebar__list-link">
              <i className="fa-solid fa-person-booth"></i>
              Rooms
            </Link>
          </li>
        )}
        {user?.Quyen === "ADMIN" && (
          <li
            className={
              target === "cities"
                ? "sidebar__list-item sidebar__list-item--active"
                : "sidebar__list-item"
            }
          >
            <Link to="/admin/cities" className="sidebar__list-link">
              <i className="fa-solid fa-location-dot"></i>
              Cities
            </Link>
          </li>
        )}
        {(user?.Quyen === "ADMIN" || user?.Quyen === "MANAGER") && (
          <li
            className={
              target === "convenients"
                ? "sidebar__list-item sidebar__list-item--active"
                : "sidebar__list-item"
            }
          >
            <Link to="/admin/convenients" className="sidebar__list-link">
              <i className="fa-solid fa-bottle-droplet"></i>
              Convenients
            </Link>
          </li>
        )}
        {user?.Quyen === "ADMIN" && (
          <li
            className={
              target === "payments"
                ? "sidebar__list-item sidebar__list-item--active"
                : "sidebar__list-item"
            }
          >
            <Link to="/admin/payments" className="sidebar__list-link">
              <i className="bi bi-credit-card-2-back-fill"></i>
              Payments
            </Link>
          </li>
        )}
        {user?.Quyen === "ADMIN" && (
          <li
            className={
              target === "others"
                ? "sidebar__list-item sidebar__list-item--active"
                : "sidebar__list-item"
            }
          >
            <Link to="/admin/others" className="sidebar__list-link">
              <i className="fa-solid fa-ellipsis"></i>
              Others
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
