import React from "react";
import { Outlet } from "react-router-dom";
import "./admin-layout.scss";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import Sidebar from "features/Admin/components/SideBar";
import BreadCrumb from "features/Admin/components/BreadCrumb";

function AdminLayout(props) {
  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <Sidebar />
      </div>
      <div className="admin-layout__main">
        <Navbar
          className="shadow-sm d-flex align-items-center"
          color="white"
          expand="md"
          light
        >
          <NavbarBrand>
            <i className="fa-solid fa-bars text-muted"></i>
          </NavbarBrand>

          <div className="navbar-input">
            <input type="text" placeholder="Search ..." />
            <div className="navbar-input__icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          <div className="admin-layout__notification text-muted">
            <i className="fa-solid fa-bell"></i>
          </div>
        </Navbar>

        <div className="admin-layout__content">
          <BreadCrumb />

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
