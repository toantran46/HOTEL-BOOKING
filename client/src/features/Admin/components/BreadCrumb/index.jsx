import React from "react";
import "./breadcrumb.scss";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

function BreadCrumb(props) {
  const location = useLocation();
  const locations = location.pathname.split("/").slice(2);
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__name">DashBoard</div>
      <div className="breadcrumb__container">
        <Breadcrumb>
          <BreadcrumbItem className="breadcrumb__home">
            <i className="fa-solid fa-house breadcrumb__home-icon"></i>
            <Link to="/">Home</Link>
          </BreadcrumbItem>

          {locations.length === 0 && (
            <BreadcrumbItem active>Dashboard</BreadcrumbItem>
          )}

          {locations.map((item, index) => {
            return (
              <BreadcrumbItem
                active={index === locations.length - 1 ? true : false}
              >
                {index === locations.length - 1 ? (
                  item
                ) : (
                  <Link to="/">{item}</Link>
                )}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
    </div>
  );
}

export default BreadCrumb;
