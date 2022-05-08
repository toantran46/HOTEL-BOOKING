import { loaiChoNghiApi } from "api/LoaiChoNghiApi";
import { phongApi } from "api/PhongApi";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import Pagination from "features/Admin/components/Pagination";
import RoomDetail from "features/Admin/components/RoomDetail";
import RoomForm from "features/Admin/components/RoomForm";
import PaginationStyled from "features/Hotel/components/PaginationStyled";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Badge, Table } from "reactstrap";
import { formatMoney } from "utils/format";
import "./room.scss";
import { toastError, toastSucsess } from "utils/notifi";
import { ConsoleSqlOutlined } from "@ant-design/icons";

RoomPage.propTypes = {
  MaKhachSan: PropTypes.string,
  notPagination: PropTypes.bool,
};

RoomPage.defaultProps = {
  MaKhachSan: '',
  notPagination: false,
};


function RoomPage(props) {
  const { MaKhachSan, notPagination } = props;
  const [rooms, setRooms] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [getNewData, setGetNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        let query = notPagination ? {} : { _page: pagination.page, _limit: pagination.limit, action: "admin" };
        console.log({ query })
        query = MaKhachSan ? { ...query, MaKhachSan } : query;
        const { Phongs, totalPage } = await phongApi.getAll(query);
        setRooms(Phongs);
        setPagination(prev => ({ ...prev, totalPage }))
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  }, [pagination.page, MaKhachSan, getNewData]);


  //handle change page 
  const handleChangePage = page => {
    setPagination(prev => ({ ...prev, page }))
  }

  const showModal = (room) => {
    setShowRoomModal(true);
    setSelectedRoom(room);
  };

  const hideModal = () => {
    setShowRoomModal(false);
  };

  const showDeleteModal = (room) => {
    setShowDeleteRoomModal(true);
    setSelectedRoom(room);
  };

  const hideDeleteModal = () => {
    setShowDeleteRoomModal(false);
  };

  const handleRemoveRoom = async () => {
    try {
      await phongApi.delete(selectedRoom._id);
      setShowDeleteRoomModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  //handle add and update 
  const handleSubmit = async values => {
    try {

      let ThongTinGiuong = [];

      for (let i = 0; i < values.totalBed; i++) {
        ThongTinGiuong = [...ThongTinGiuong, { Giuong: values["Giuong" + i].split("-")[0], SoLuong: values["SoLuong" + i] }]
      }

      const data = {
        LoaiPhong: values.LoaiPhong,
        TenPhong: values.TenPhong,
        HutThuoc: values.HutThuoc,
        ThongTinGiuong,
        SoLuongKhach: +values.SoLuongKhach,
        KichThuoc: values.KichThuoc,
        Gia: +values.Gia,
        TienNghi: values.TienNghi,
        SoLuongPhong: +values.SoLuongPhong
      }

      setIsLoading(true);
      const { message } = await phongApi.update(selectedRoom._id, data);
      toastSucsess(message);
      setIsLoading(false);
      setGetNewData(prev => !prev);
      hideModal();
    } catch (error) {
      setIsLoading(false);
      const errMessage = error.response.data;
      toastError(errMessage.message);
    }

  }

  return (
    <div className="room-list shadow-sm">
      <div className="table-responsive">
        <Table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Room Type</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>State</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr className="" key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Badge color="dark">{room.TenPhong}</Badge>
                </td>
                <td>
                  <Badge color="info">{room.LoaiPhong.TenLoaiPhong}</Badge>
                </td>
                <td>
                  <Badge color="danger" className="ms-3">
                    {room.SoLuongPhong}
                  </Badge>
                </td>

                <td>
                  <Badge color="secondary">{room.KichThuoc}</Badge>
                </td>
                <td>
                  <Badge color="success">{room.TrangThai}</Badge>
                </td>
                <td>
                  <Badge color="warning">{formatMoney(room.Gia)}</Badge>
                </td>

                <td>
                  <div className="room-list__actions">
                    <div
                      onClick={() => { showModal(room); setIsEdit(true) }}
                      className="room-list__action shadow-sm bg-info" >
                      <i class="bi bi-pencil"></i>
                    </div>
                    <div
                      onClick={() => showModal(room)}
                      className="room-list__action shadow-sm bg-primary"
                    >
                      <i className="fa-solid fa-info room-list__icon"></i>
                    </div>

                    <div
                      onClick={() => showDeleteModal(room)}
                      className="room-list__action shadow-sm bg-danger"
                    >
                      <i className="fa-solid fa-trash room-list__icon"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
      {
        !notPagination && <PaginationStyled currentPage={pagination.page} totalPage={pagination.totalPage} onChange={handleChangePage} />
      }


      {/* Room Detail Modale */}
      <DetailModal isOpen={showRoomModal} hideModal={hideModal} >
        {(selectedRoom._id && !isEdit) ? <RoomDetail selectedRoom={selectedRoom} /> : <RoomForm selectedRoom={selectedRoom} isLoading={isLoading} onSubmit={handleSubmit} />}
      </DetailModal>

      {/* Room Delete Modale */}
      <DeleteModal
        isOpen={showDeleteRoomModal}
        hideDeleteModal={hideDeleteModal}
        handleRemove={handleRemoveRoom}
      />
    </div>
  );
}

export default RoomPage;
