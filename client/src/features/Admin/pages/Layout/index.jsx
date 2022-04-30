import BreadCrumb from "features/Admin/components/BreadCrumb";
import Sidebar from "features/Admin/components/SideBar";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import "./admin-layout.scss";

function AdminLayout(props) {
  const [widthSideBar, setWidthSideBar] = useState(280);
  const handleShowSideBar = () => {
    if (widthSideBar === 280) {
      setWidthSideBar(0);
    } else {
      setWidthSideBar(280);
    }
  };

  const pathName = useLocation().pathname;

  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <Sidebar widthSideBar={widthSideBar} />
      </div>
      <div className="admin-layout__main">
        <Navbar
          className="shadow-sm d-flex align-items-center"
          color="white"
          expand="md"
          light
        >
          <NavbarBrand>
            <i
              className="fa-solid fa-bars text-muted"
              onClick={handleShowSideBar}
            ></i>
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
          {pathName !== "/admin" && pathName !== "/admin/" && <BreadCrumb />}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
