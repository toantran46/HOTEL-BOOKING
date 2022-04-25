import React from "react";
import { Badge, ListGroup, ListGroupItem, Table } from "reactstrap";
import { formatDate, formatMoney } from "utils/format";

function BookingDetail({ selectedBooking, hotel, rooms, payment }) {
  const listItemStyle = { display: "inline-block", width: "100px" };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ListGroup style={{ position: "sticky", top: 0 }}>
            <ListGroupItem>
              <b style={listItemStyle}>Orderer:</b>
              <Badge color="secondary">{selectedBooking.HoTenNguoiDat}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Email:</b>
              <Badge color="primary">{selectedBooking.Email}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Phone:</b>
              <Badge color="dark">{selectedBooking.SoDienThoai}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Hotel:</b>{" "}
              <Badge color="danger">{hotel.TenChoNghi}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Request:</b>
              <Badge className="text-dark" color="light">
                {selectedBooking.YeuCau}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}> Order Date:</b>
              <Badge className="text-dark" color="light">
                {formatDate(selectedBooking.NgayDatPhong)}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}> Check In:</b>
              <Badge className="text-dark" color="light">
                {formatDate(selectedBooking.NgayNhanPhong)}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}> Check Out:</b>
              <Badge className="text-dark" color="light">
                {formatDate(selectedBooking.NgayTraPhong)}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Total money:</b>
              <Badge color="warning">
                {formatMoney(selectedBooking.TongTien)}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>State:</b>
              <Badge color="success">{selectedBooking.TrangThai}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Payment:</b>
              <b>{selectedBooking.DaThanhToan === true ? "Yes" : "No"}</b>
            </ListGroupItem>
          </ListGroup>
        </div>
        <div className="col-8">
          <div className="hotel-list__side-8">
            <div>
              <h6 className="mb-3">
                <b>
                  Number of rooms booked:{" "}
                  {selectedBooking.ThongTinhPhong.length}
                </b>
              </h6>

              <div className="table-responsive">
                <Table size="sm" className="mb-2">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>#</th>
                      <th>Receiver</th>
                      <th>Room Name</th>
                      <th>Room Type</th>
                      <th>Square</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBooking.ThongTinhPhong.map((room, index) => {
                      const selectedRoom = rooms.find(
                        (item) => item._id === room.Phong
                      );
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{room.TenNguoiNhanPhong}</td>
                          <td>{selectedRoom?.TenPhong}</td>
                          <td>{selectedRoom?.LoaiPhong.TenLoaiPhong}</td>
                          <td>{selectedRoom?.KichThuoc}</td>
                          <td>{formatMoney(selectedRoom?.Gia || 0)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div>
            <h6 className="mb-3">
              <b>Payment Method</b>
            </h6>

            <div className="row">
              <div className="col-3">
                <div style={{ width: "140px", height: "140px" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={payment.Logo}
                    alt={payment.logo}
                  />
                </div>
              </div>
              <div className="col-9">
                <div>
                  <b>Account Name:</b>{" "}
                  <Badge color="dark">
                    {selectedBooking.TinDung.TenChuThe}
                  </Badge>
                </div>
                <div>
                  <b>Card Type</b>:{" "}
                  <Badge color="danger">{payment.TenTinDung}</Badge>
                </div>
                <div>
                  <b>Card Number:</b>{" "}
                  <Badge color="warning">{selectedBooking.TinDung.SoThe}</Badge>
                </div>
                <div>
                  <b>Expiration date:</b>{" "}
                  <Badge color="success">
                    {selectedBooking.TinDung.NgayHetHan}
                  </Badge>
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
