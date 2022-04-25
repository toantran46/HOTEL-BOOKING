import { choNghiApi } from "api/ChoNghiApi";
import { datPhongApi } from "api/DatPhongApi";
import { phongApi } from "api/PhongApi";
import { tinDungApi } from "api/TinDungApi";
import BookingDetail from "features/Admin/components/BookingDetail";
import Pagination from "features/Admin/components/Pagination";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { formatMoney, formatDate } from "utils/format";
import "./booking.scss";

function BookingPage(props) {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDeleteBookingModal, setShowDeleteBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [hotel, setHotel] = useState({});
  const [payment, setPayment] = useState({});

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

  const showModal = async (booking) => {
    setShowBookingModal(true);
    setSelectedBooking(booking);

    try {
      const { ChoNghi } = await choNghiApi.get(booking.MaKhachSan);
      setHotel(ChoNghi);

      const { TinDung } = await tinDungApi.get(booking.TinDung.LoaiThe);
      setPayment(TinDung);

      const { Phongs } = await phongApi.getAll();
      setRooms(Phongs);
    } catch (error) {
      console.log(error);
    }
  };

  const hideModal = () => {
    setShowBookingModal(false);
  };

  const showDeleteModal = (booking) => {
    setShowDeleteBookingModal(true);
    setSelectedBooking(booking);
  };

  const hideDeleteModal = () => {
    setShowDeleteBookingModal(false);
  };

  const handleRemoveBooking = async () => {
    try {
      await datPhongApi.delete(selectedBooking._id);
      setShowDeleteBookingModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="booking-list shadow-sm">
      <div className="table-responsive">
        <Table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Orderer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>State</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 10).map((booking, index) => (
              <tr className="" key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Badge color="dark">{booking.HoTenNguoiDat}</Badge>
                </td>
                <td>
                  <Badge color="light" className="text-dark">
                    {booking.Email}
                  </Badge>
                </td>
                <td>
                  <Badge color="warning">{booking.SoDienThoai}</Badge>
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
                    {formatMoney(booking.TongTien)}đ
                  </Badge>
                </td>
                <td>
                  <div className="booking-list__actions">
                    <div
                      onClick={() => showModal(booking)}
                      className="booking-list__action shadow-sm bg-primary"
                    >
                      <i className="fa-solid fa-info booking-list__icon"></i>
                    </div>

                    <div
                      onClick={() => showDeleteModal(booking)}
                      className="booking-list__action shadow-sm bg-danger"
                    >
                      <i className="fa-solid fa-trash booking-list__icon"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination page={1} totalRows={50} limit={10} />

      <Modal
        className="modal-dialog modal-dialog-scrollable"
        size="xl"
        centered
        isOpen={showBookingModal}
        toggle={hideModal}
      >
        <ModalHeader toggle={hideModal}>
          <div>
            <img
              src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
              alt="admin logo"
            />
            <span className="sidebar__logo-name text-dark">LTH Booking</span>
          </div>
        </ModalHeader>
        <ModalBody>
          {selectedBooking._id && (
            <BookingDetail
              selectedBooking={selectedBooking}
              hotel={hotel}
              rooms={rooms}
              payment={payment}
            />
          )}
        </ModalBody>
      </Modal>

      <Modal centered isOpen={showDeleteBookingModal} toggle={hideDeleteModal}>
        <ModalHeader toggle={hideDeleteModal}>
          <div>
            <img
              src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
              alt="admin logo"
            />
            <span className="sidebar__logo-name text-dark">LTH Booking</span>
          </div>
        </ModalHeader>
        <ModalBody>Are you sure remove this booking ?</ModalBody>

        <ModalFooter>
          <Button onClick={handleRemoveBooking} color="primary">
            Confirm
          </Button>{" "}
          <Button onClick={hideDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BookingPage;
