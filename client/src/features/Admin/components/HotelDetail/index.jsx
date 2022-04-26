import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import AdminFeedBackItem from "../AdminFeedBackItem";

function HotelDetail({ selectedHotel }) {
  const listItemStyle = { display: "inline-block", width: "140px" };
  const stars = [];
  for (let index = 0; index < selectedHotel.XepHang; index++) {
    stars[index] = index;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ListGroup style={{ position: "sticky", top: 0 }}>
            <ListGroupItem>
              <b style={listItemStyle}>Name:</b> {selectedHotel.TenChoNghi}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Contact:</b>{" "}
              {selectedHotel.TenNguoiLienHe}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Phone:</b> {selectedHotel.SoDienThoai}{" "}
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-flex">
                <b style={listItemStyle}>Address:</b>{" "}
                <div className="text-truncate flex-1">
                  {selectedHotel.DiaChi}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>City:</b>{" "}
              {selectedHotel?.ThanhPho[0]?.TenThanhPho}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}> Rank:</b>{" "}
              {stars.map((star) => (
                <i className="fa-solid fa-star text-warning"></i>
              ))}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Mistake Insurance:</b>{" "}
              {selectedHotel.BaoHiemNhamLan === true ? "Yes" : "No"}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Hotel Type:</b>
              {selectedHotel.LoaiChoNghi[0].TenLoaiChoNghi}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Room number:</b>{" "}
              {selectedHotel.Phong.length}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Check In At:</b>{" "}
              {selectedHotel.ThoiGianNhanPhong.Tu} -{" "}
              {selectedHotel.ThoiGianNhanPhong.Den}
            </ListGroupItem>
            <ListGroupItem>
              <b style={listItemStyle}>Check Out At:</b>{" "}
              {selectedHotel.ThoiGianTraPhong.Tu} -{" "}
              {selectedHotel.ThoiGianTraPhong.Den}
            </ListGroupItem>

            <ListGroupItem>
              <div className="mb-2">
                <b>Payment methods:</b>
              </div>
              {selectedHotel.TinDung.map((item) => (
                <img
                  className="hotel-list__payment-img"
                  src={item.Logo}
                  alt={item}
                />
              ))}
            </ListGroupItem>
          </ListGroup>
        </div>
        <div className="col-8">
          <div className="hotel-list__side-8">
            <div>
              <h6 className="mb-3">
                <b>Convenients:</b>
              </h6>
              <div className="row">
                {selectedHotel.TienNghi.map((convenient) => (
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

            <div>
              <h6 className="mb-3">
                <b>Hotel Images:</b>
              </h6>
              <div className="row gx-0 gy-1">
                {selectedHotel.HinhAnh.map((img) => (
                  <div className="col-4">
                    <div className="hotel-list__hotel-img">
                      <img src={img} alt={img} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h6 className="mt-3">
                <b>FeedBacks:</b>
              </h6>
              <div className="row gx-0 gy-1">
                {selectedHotel.PhanHoi.map((feedback) => (
                  <AdminFeedBackItem fbInfo={feedback} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
