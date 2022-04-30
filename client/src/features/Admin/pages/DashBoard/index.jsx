import { choNghiApi } from "api/ChoNghiApi";
import { datPhongApi } from "api/DatPhongApi";
import { NguoiDungApi } from "api/NguoiDungApi";
import { phongApi } from "api/PhongApi";
import { thanhPhoApi } from "api/ThanhPhoApi";
import AdminItem from "features/Admin/components/AdminItem";
import BarChart from "features/Admin/components/BarChart";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Table } from "reactstrap";
import { formatDate, formatMoney } from "utils/format";
import { bookingMonthlyIncome } from "utils/TotalBooking";
import "./dashboard.scss";

function DashBoard(props) {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { NguoiDungs } = await NguoiDungApi.getAll();
        setUsers(NguoiDungs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  // Hotels
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { ChoNghis } = await choNghiApi.getAll();
        setHotels(ChoNghis);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotel();
  }, []);
  // Cities
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const { ThanhPhos } = await thanhPhoApi.getAll();
        setCities(ThanhPhos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, []);
  // Rooms
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { Phongs } = await phongApi.getAll();
        setRooms(Phongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);
  // Bookings
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { DatPhongs } = await datPhongApi.getAll();
        setBookings(DatPhongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="row">
          {/* User */}
          <div className="col-md-3">
            <Link to="/admin/users" style={{ color: "#000" }}>
              <div className="dashboard__header-item">
                <AdminItem
                  title="Users"
                  quantity={users.length}
                  bgColor="#d9e2f9"
                  iconColor="#406ada"
                >
                  <i className="fa-solid fa-user-group"></i>
                </AdminItem>
              </div>
            </Link>
          </div>
          {/* Hotel */}
          <div className="col-md-3">
            <Link to="/admin/hotels" style={{ color: "#000" }}>
              <div className="dashboard__header-item">
                <AdminItem
                  title="Hotels"
                  quantity={hotels.length}
                  bgColor="#D8F2E8"
                  iconColor="#33C97B"
                >
                  <i className="fa-solid fa-hotel"></i>
                </AdminItem>
              </div>
            </Link>
          </div>
          {/* City */}
          <div className="col-md-3">
            <Link to="/admin/cities" style={{ color: "#000" }}>
              <div className="dashboard__header-item">
                <AdminItem
                  title="Cities"
                  quantity={cities.length}
                  bgColor="#FFEDCC"
                  iconColor="#FFA300"
                >
                  <i className="fa-solid fa-location-dot"></i>
                </AdminItem>
              </div>
            </Link>
          </div>
          {/* Room */}
          <div className="col-md-3">
            <Link to="/admin/rooms" style={{ color: "#000" }}>
              <div className="dashboard__header-item">
                <AdminItem
                  title="Rooms"
                  quantity={rooms.length}
                  bgColor="#F4D5DB"
                  iconColor="#DC2456"
                >
                  <i className="fa-solid fa-location-dot"></i>
                </AdminItem>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard__booking-chart">
        <BarChart monthlyIncome={bookingMonthlyIncome(bookings)} />
      </div>
      {/* Dashboard Booking View */}
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive">
              <div className="dashboard__booking-view-box">
                <div className="dashboard__booking-view-title">
                  Recent Booking
                </div>
                <Link
                  style={{ color: "#fff" }}
                  to="/admin/bookings"
                  className="dashboard__booking-view-action"
                >
                  View All
                </Link>
              </div>
              <Table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Orderer</th>
                    <th>Phone</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>State</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .slice(0, 4)
                    .sort(
                      (a, b) =>
                        new Date(a.NgayNhanPhong) - new Date(b.NgayTraPhong)
                    )
                    .map((booking, index) => (
                      <tr className="" key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Badge color="dark">{booking.HoTenNguoiDat}</Badge>
                        </td>

                        <td>
                          <Badge color="secondary">{booking.SoDienThoai}</Badge>
                        </td>

                        <td>
                          <Badge color="danger">
                            {formatDate(new Date(booking.NgayDatPhong))}
                          </Badge>
                        </td>
                        <td>
                          <Badge color="primary">
                            {formatDate(new Date(booking.NgayTraPhong))}
                          </Badge>
                        </td>
                        <td>
                          <Badge color="success">{booking.TrangThai}</Badge>
                        </td>
                        <td>
                          <Badge color="warning">
                            {formatMoney(booking.TongTien)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          {/* Top Booking Hotels */}
          <div className="col-md-6">
            <div className="table-responsive">
              <div className="dashboard__booking-view-box">
                <div className="dashboard__booking-view-title">
                  Top Booking Hotel
                </div>
                <Link
                  style={{ color: "#fff" }}
                  to="/admin/hotels"
                  className="dashboard__booking-view-action"
                >
                  View All
                </Link>
              </div>
              <Table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels
                    .slice(0, 4)
                    .map((hotel) => {
                      return {
                        quantity: bookings.filter(
                          (booking) => booking.MaKhachSan === hotel._id
                        ).length,
                        hotel,
                      };
                    })
                    .sort((a, b) => b.quantity - a.quantity)
                    .map((ht, index) => (
                      <tr className="" key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Badge color="dark">{ht["hotel"].TenChoNghi}</Badge>
                        </td>
                        <td>
                          <Badge color="danger">
                            {ht["hotel"]?.QuanLy[0]?.name}
                          </Badge>
                        </td>

                        <td
                          className="text-truncate"
                          style={{ maxWidth: "140px" }}
                        >
                          {ht["hotel"].DiaChi}
                        </td>

                        <td>
                          <Badge color="warning">{ht["hotel"]?.XepHang}</Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
