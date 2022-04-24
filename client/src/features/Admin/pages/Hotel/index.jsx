import { choNghiApi } from "api/ChoNghiApi";
import Pagination from "features/Admin/components/Pagination";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import "./hotel.scss";

function HotelPage(props) {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { ChoNghis } = await choNghiApi.getAll();
        setHotel(ChoNghis);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotel();
  }, []);

  return (
    <div className="hotel-list shadow-sm">
      <div className="table-responsive">
        <Table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Rank</th>
              <th>CheckIn At</th>
              <th>CheckOut At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotel.map((hotel, index) => (
              <tr className="" key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Badge color="dark">{hotel.TenChoNghi}</Badge>
                </td>
                <td>
                  <Badge color="light" className="text-dark">
                    {hotel.TenNguoiLienHe}
                  </Badge>
                </td>
                <td>
                  <Badge color="warning">{hotel.SoDienThoai}</Badge>
                </td>
                <td className="text-truncate" style={{ maxWidth: "100px" }}>
                  {hotel.DiaChi}
                </td>
                <td>
                  <Badge color="danger">{hotel.XepHang}</Badge>
                </td>
                <td>
                  <Badge color="success">{`${hotel.ThoiGianNhanPhong.Tu} - ${hotel.ThoiGianNhanPhong.Den}`}</Badge>
                </td>
                <td>
                  <Badge color="dark">
                    {`${hotel.ThoiGianTraPhong.Tu} - ${hotel.ThoiGianTraPhong.Den}`}
                  </Badge>
                </td>
                <td>
                  <div className="hotel-list__actions">
                    <div className="hotel-list__action shadow-sm bg-primary">
                      <i className="fa-solid fa-info hotel-list__icon"></i>
                    </div>
                    <div className="hotel-list__action shadow-sm bg-warning">
                      <i className="fa-solid fa-pen hotel-list__icon"></i>
                    </div>
                    <div className="hotel-list__action shadow-sm bg-danger">
                      <i className="fa-solid fa-trash hotel-list__icon"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination page={1} totalRows={50} limit={10} />
    </div>
  );
}

export default HotelPage;
