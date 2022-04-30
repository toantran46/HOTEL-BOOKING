import React from "react";
import "./admin-item.scss";

function AdminItem({
  title,
  quantity,
  unit = "",
  bgColor = "#000",
  iconColor,
  children,
}) {
  return (
    <div
      className="admin-item"
      style={{ "--bg-color": bgColor, "--icon-color": iconColor }}
    >
      <div className="admin-item__box">
        <div className="admin-item__title">{title}</div>
        <div className="admin-item__quantity">{quantity + unit}</div>
      </div>

      <div className="admin-item__icon">{children}</div>
    </div>
  );
}

export default AdminItem;
