import React from "react";
import { Badge, ListGroup, ListGroupItem, Table } from "reactstrap";
import { formatMoney } from "utils/format";

function RoomDetail({ selectedRoom }) {
  const listItemStyle = { display: "inline-block", width: "140px" };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ListGroup style={{ position: "sticky", top: 0 }}>
            <ListGroupItem>
              <b style={listItemStyle}>Name:</b>{" "}
              <Badge color="dark">{selectedRoom.TenPhong}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Room Type:</b>
              <Badge color="primary">
                {selectedRoom.LoaiPhong.TenLoaiPhong}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Be Smoked:</b>
              <Badge color="light" className="text-dark">
                {selectedRoom.HutThuoc === true ? "Yes" : "No"}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex">
                <b style={listItemStyle}>Guest Number:</b>
                <Badge color="danger">{selectedRoom.SoLuongKhach}</Badge>
              </div>
            </ListGroupItem>

            <ListGroupItem>
              <b style={listItemStyle}>Room Number:</b>
              <Badge color="danger">{selectedRoom.SoLuongPhong}</Badge>
            </ListGroupItem>

            <ListGroupItem>
              <b style={listItemStyle}>Size:</b>
              <Badge color="secondary">{selectedRoom.KichThuoc}</Badge>
            </ListGroupItem>

            <ListGroupItem>
              <b style={listItemStyle}>State:</b>
              <Badge color="success">{selectedRoom.TrangThai}</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Price:</b>{" "}
              <Badge color="warning">{formatMoney(selectedRoom.Gia)}</Badge>
            </ListGroupItem>
          </ListGroup>
        </div>
        <div className="col-8">
          <div className="hotel-list__side-8">
            <div className="mb-2">
              <h6 className="mb-2">
                <b>Beds:</b>
              </h6>
              <div className="table-responsive">
                <Table size="sm" className="mb-2">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>#</th>
                      <th>Bed Name</th>
                      <th>Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRoom.ThongTinGiuong.map((bed, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{bed.Giuong.TenLoaiGiuong}</td>
                          <td>{bed.SoLuong}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
            <div>
              <h6 className="mb-3">
                <b>Convenients:</b>
              </h6>
              <div className="row">
                {selectedRoom.TienNghi.map((convenient) => (
                  <div className="col">
                    <div>
                      <div
                        className="hotel-list__convenient-img m-auto"
                        dangerouslySetInnerHTML={{
                          __html: convenient.Icon,
                        }}
                      />
                      <p className="text-center">{convenient.TenTienNghi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
