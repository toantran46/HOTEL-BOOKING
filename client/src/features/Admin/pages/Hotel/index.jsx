import { choNghiApi } from "api/ChoNghiApi";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import HotelDetail from "features/Admin/components/HotelDetail";
import Pagination from "features/Admin/components/Pagination";
import PaginationStyled from "features/Hotel/components/PaginationStyled";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import "./hotel.scss";

function HotelPage(props) {
  const [hotel, setHotel] = useState([]);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showDeleteHotelModal, setShowDeleteHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [getNewData, setGetNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { ChoNghis, _totalPage } = await choNghiApi.getAll({ _page: pagination.page, _limit: pagination.limit });
        setHotel(ChoNghis);
        setPagination(prev => ({ ...prev, totalPage: _totalPage }))

      } catch (error) {
        console.log(error);
      }
    };
    fetchHotel();
  }, [pagination.page]);

  //handle change page 
  const handleChangePage = page => {
    setPagination(prev => ({ ...prev, page }))
  }
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

  const handleRemoveBooking = async () => {
    try {
      await choNghiApi.delete(selectedHotel._id);
      setShowDeleteHotelModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(hotel);
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
            {hotel.map((ht, index) => (
              <tr className="" key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Badge color="dark">{ht.TenChoNghi}</Badge>
                </td>
                <td>
                  <Badge color="light" className="text-dark">
                    {ht?.QuanLy[0]?.name}
                  </Badge>
                </td>
                <td>
                  <Badge color="warning">{ht?.QuanLy[0]?.phone}</Badge>
                </td>
                <td className="text-truncate" style={{ maxWidth: "100px" }}>
                  {ht.DiaChi}
                </td>
                <td>
                  <Badge color="danger">{ht.XepHang}</Badge>
                </td>
                <td>
                  <Badge color="success">{`${ht.ThoiGianNhanPhong.Tu} - ${ht.ThoiGianNhanPhong.Den}`}</Badge>
                </td>
                <td>
                  <Badge color="dark">
                    {`${ht.ThoiGianTraPhong.Tu} - ${ht.ThoiGianTraPhong.Den}`}
                  </Badge>
                </td>
                <td>
                  <div className="hotel-list__actions">
                    <div
                      onClick={() => showModal(ht)}
                      className="hotel-list__action shadow-sm bg-primary"
                    >
                      <i className="fa-solid fa-info hotel-list__icon"></i>
                    </div>

                    <div
                      onClick={() => showDeleteModal(ht)}
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

      <PaginationStyled currentPage={pagination.page} totalPage={pagination.totalPage} onChange={handleChangePage} />

      {/* Hotel Detail Modal */}
      <DetailModal isOpen={showHotelModal} hideModal={hideModal}>
        {selectedHotel._id && <HotelDetail selectedHotel={selectedHotel} />}
      </DetailModal>

      {/* Hotel Delete Modal */}
      <DeleteModal
        isOpen={showDeleteHotelModal}
        hideDeleteModal={hideDeleteModal}
        handleRemove={handleRemoveBooking}
      />
    </div>
  );
}

export default HotelPage;
