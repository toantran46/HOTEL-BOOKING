import { phongApi } from "api/PhongApi";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import Pagination from "features/Admin/components/Pagination";
import RoomDetail from "features/Admin/components/RoomDetail";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import { formatMoney } from "utils/format";
import "./room.scss";

function RoomPage(props) {
  const [rooms, setRooms] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});

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

  return (
    <div className="room-list shadow-sm">
      <div className="table-responsive">
        <Table className="table table-sm table-hover align-middle">
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
                  <Badge color="primary">{room.LoaiPhong.TenLoaiPhong}</Badge>
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
      <Pagination page={1} totalRows={50} limit={10} />

      {/* Room Detail Modale */}
      <DetailModal isOpen={showRoomModal} hideModal={hideModal}>
        {selectedRoom._id && <RoomDetail selectedRoom={selectedRoom} />}
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