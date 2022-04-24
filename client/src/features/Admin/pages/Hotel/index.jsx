import { choNghiApi } from "api/ChoNghiApi";
import HotelDetail from "features/Admin/components/HotelDetail";
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
import "./hotel.scss";

function HotelPage(props) {
  const [hotel, setHotel] = useState([]);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showDeleteHotelModal, setShowDeleteHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});

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

  const showModal = (hotel) => {
    setShowHotelModal(true);
    setSelectedHotel(hotel);
  };

  const hideModal = () => {
    setShowHotelModal(false);
  };

  const showDeleteModal = (hotel) => {
    setShowDeleteHotelModal(true);
    setSelectedHotel(hotel);
  };

  const hideDeleteModal = () => {
    setShowDeleteHotelModal(false);
  };

  const handleRemoveHotel = async () => {
    try {
      await choNghiApi.delete(selectedHotel._id);
      setShowDeleteHotelModal(false);
    } catch (error) {
      console.log(error);
    }
  };

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
                    <div
                      onClick={() => showModal(hotel)}
                      className="hotel-list__action shadow-sm bg-primary"
                    >
                      <i className="fa-solid fa-info hotel-list__icon"></i>
                    </div>

                    <div
                      onClick={() => showDeleteModal(hotel)}
                      className="hotel-list__action shadow-sm bg-danger"
                    >
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

      <Modal
        className="modal-dialog modal-dialog-scrollable"
        size="xl"
        centered
        isOpen={showHotelModal}
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
          {selectedHotel._id && <HotelDetail selectedHotel={selectedHotel} />}
        </ModalBody>
      </Modal>

      <Modal centered isOpen={showDeleteHotelModal} toggle={hideDeleteModal}>
        <ModalHeader toggle={hideDeleteModal}>
          <div>
            <img
              src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
              alt="admin logo"
            />
            <span className="sidebar__logo-name text-dark">LTH Booking</span>
          </div>
        </ModalHeader>
        <ModalBody>
          Are you sure remove Hotel{" "}
          <Badge color="danger">{selectedHotel.TenChoNghi}</Badge>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleRemoveHotel} color="primary">
            Confirm
          </Button>{" "}
          <Button onClick={hideDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default HotelPage;
