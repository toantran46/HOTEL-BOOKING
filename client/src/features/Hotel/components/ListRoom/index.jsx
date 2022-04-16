import React from "react";
import PropTypes from "prop-types";

import "./ListRoom.scss";
import Room from "../Room";

ListRoom.propTypes = {
  rooms: PropTypes.array,
};

ListRoom.defaultProps = {
  rooms: [],
};

function ListRoom(props) {
  const { rooms } = props;
  return (
    <div className="list-room">
      <table>
        <thead>
          <th className="type">Loại chỗ nghỉ</th>
          <th className="suitable">Phù hợp cho</th>
          <th className="price">Giá cho 25 đêm</th>
          <th className="options">Các lựa chọn</th>
          <th className="chooseRoom">Chọn phòng</th>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => <Room key={room._id} roomInfo={room} />)
          ) : (
            <div style={{ textAlign: "center", width: "100%" }}>
              Không tìm thấy phòng ...
            </div>
          )}
        </tbody>
      </table>
      <div className="list-room__book">
        <div className="list-room__book__top" />
        <div className="list-room__book__container">
          <div className="list-room__book__container__confirm">
            <p>
              <b>9</b> phòng tổng giá
            </p>
            <h5>VND 5.769.000</h5>
            <span>Đã bao gồm thuế và phí</span>
          </div>

          <a className="btn-primary">Tôi sẽ đặt</a>
          <ul>
            <li>Xác nhận tức thời</li>
            <li>Không cần đăng ký</li>
            <li>Không mất phí đặt phòng hay phí thẻ tín dụng!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListRoom;
