import { EditFilled, EditOutlined } from "@ant-design/icons";
import { choNghiApi } from "api/ChoNghiApi";
import { datPhongApi } from "api/DatPhongApi";
import { phongApi } from "api/PhongApi";
import { tinDungApi } from "api/TinDungApi";
import BookingDetail from "features/Admin/components/BookingDetail";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import Pagination from "features/Admin/components/Pagination";
import PaginationStyled from "features/Hotel/components/PaginationStyled";
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

import { Button as Button1, Popconfirm } from 'antd';

import { formatMoney, formatDate } from "utils/format";
import "./booking.scss";
import { toastError, toastSucsess } from "utils/notifi";

function BookingPage(props) {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDeleteBookingModal, setShowDeleteBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [hotel, setHotel] = useState({});
  const [payment, setPayment] = useState({});
  const [getNewData, setGetNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { DatPhongs, totalPage } = await datPhongApi.getAll({ _page: pagination.page, _limit: pagination.limit, action: 'admin' });
        setBookings(DatPhongs);
        setPagination(prev => ({ ...prev, totalPage }))
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, [pagination.page, getNewData]);

  //handle change page 
  const handleChangePage = page => {
    setPagination(prev => ({ ...prev, page }))
  }

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
      setIsLoading(true);
      const { message } = await datPhongApi.delete(selectedBooking._id);
      setShowDeleteBookingModal(false);
      setIsLoading(false);
      setGetNewData(prev => !prev);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleConfirmBill = async (_id) => {
    try {
      setIsLoading(true);
      const { message } = await datPhongApi.update(_id, { TrangThai: "Đã thanh toán", DaThanhToan: 1 });
      setShowDeleteBookingModal(false);
      setIsLoading(false);
      toastSucsess(message);
      setGetNewData(prev => !prev);
    } catch (error) {
      setIsLoading(false);
      const errMessage = error.response.data;
      toastError(errMessage.message);
      // console.log(error);
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
                  <Badge color="info">
                    {formatDate(new Date(booking.NgayDatPhong))}
                  </Badge>
                </td>
                <td>
                  <Badge color="primary">
                    {formatDate(new Date(booking.NgayTraPhong))}
                  </Badge>
                </td>
                <td>
                  <Badge style={{ marginRight: 10 }} color={booking.TrangThai === "Đã thanh toán" ? "success" : "danger"}>{booking.TrangThai}</Badge>
                  {
                    booking.TrangThai !== "Đã thanh toán" &&
                    <Popconfirm title="Bạn có chắc muốn xác nhận đã thanh toán ?" onConfirm={() => handleConfirmBill(booking._id)}>
                      <Button1 size="small" icon={<EditOutlined />} shape="circle" />
                    </Popconfirm>
                  }

                </td>
                <td>
                  <Badge color="warning">{formatMoney(booking.TongTien)}</Badge>
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
      {/* Booking Pagination */}
      <PaginationStyled currentPage={pagination.page} totalPage={pagination.totalPage} onChange={handleChangePage} />
      {/* Booking Detail Modal */}
      <DetailModal isOpen={showBookingModal} hideModal={hideModal}>
        {selectedBooking._id && (
          <BookingDetail
            selectedBooking={selectedBooking}
            hotel={hotel}
            rooms={rooms}
            payment={payment}
          />
        )}
      </DetailModal>

      {/* Booking Delete Modal */}
      <DeleteModal
        isLoading={isLoading}
        isOpen={showDeleteBookingModal}
        hideDeleteModal={hideDeleteModal}
        handleRemove={handleRemoveBooking}
      />
    </div>
  );
}

export default BookingPage;
