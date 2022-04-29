import { loaiChoNghiApi } from "api/LoaiChoNghiApi";
import { loaiGiuongApi } from "api/LoaiGiuongApi";
import { loaiPhongApi } from "api/LoaiPhongApi";
import BedTypeForm from "features/Admin/components/BedTypeForm";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import HotelTypeForm from "features/Admin/components/HotelTypeForm";
import RoomTypeForm from "features/Admin/components/RoomTypeForm";
import { default as React, useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import "./types.scss";

function TypesPage(props) {
  // Hotel Type
  const [hotelType, setHotelType] = useState([]);
  const [showHotelTypeModal, setShowHotelTypeModal] = useState(false);
  const [showDeleteHotelTypeModal, setShowDeleteHotelTypeModal] =
    useState(false);
  const [selectedHotelType, setSelectedHotelType] = useState({});

  useEffect(() => {
    const fetchHotelType = async () => {
      try {
        const { LoaiChoNghis } = await loaiChoNghiApi.getAll();
        setHotelType(LoaiChoNghis);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelType();
  }, []);

  const showHotelTypeForm = (hoteltype = {}) => {
    setShowHotelTypeModal(true);
    setSelectedHotelType(hoteltype);
  };

  const hideHotelTypeForm = () => {
    setShowHotelTypeModal(false);
    setSelectedHotelType({});
  };

  const showDeleteHotelTypeForm = (hoteltype) => {
    setShowDeleteHotelTypeModal(true);
    setSelectedHotelType(hoteltype);
  };

  const hideDeleteHotelTypeForm = () => {
    setShowDeleteHotelTypeModal(false);
  };

  const handleRemoveHotelType = async () => {
    try {
      await loaiChoNghiApi.delete(selectedHotelType._id);
      setShowDeleteHotelTypeModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onHotelTypeSubmit = async (data) => {
    try {
      const file = data.HinhAnh[0].originFileObj;
      console.log(file);
      let formData = null;
      if (selectedHotelType._id) {
        if (file) {
          formData = new FormData();
          formData.append("TenLoaiChoNghi", data.TenLoaiChoNghi);
          formData.append("HinhAnh", file);
        } else {
          delete data.HinhAnh;
          formData = data;
        }

        await loaiChoNghiApi.update(selectedHotelType._id, formData);
      } else {
        formData = new FormData();
        formData.append("TenLoaiChoNghi", data.TenLoaiChoNghi);
        formData.append("HinhAnh", file);
        await loaiChoNghiApi.add(formData);
      }
      hideHotelTypeForm();
    } catch (error) {
      console.log(error);
    }
  };

  // Room Type

  const [roomType, setRoomType] = useState([]);
  const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);
  const [showDeleteRoomTypeModal, setShowDeleteRoomTypeModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState({});

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const { LoaiPhongs } = await loaiPhongApi.getAll();
        setRoomType(LoaiPhongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoomType();
  }, []);

  const showRoomTypeForm = (roomtype = {}) => {
    setShowRoomTypeModal(true);
    setSelectedRoomType(roomtype);
  };

  const hideRoomTypeForm = () => {
    setShowRoomTypeModal(false);
    setSelectedRoomType({});
  };

  const showDeleteRoomTypeForm = (roomtype) => {
    setShowDeleteRoomTypeModal(true);
    setSelectedRoomType(roomtype);
  };

  const hideDeleteRoomTypeForm = () => {
    setShowDeleteRoomTypeModal(false);
    setSelectedRoomType({});
  };

  const handleRemoveRoomType = async () => {
    try {
      await loaiPhongApi.delete(selectedRoomType._id);
      hideDeleteRoomTypeForm();
    } catch (error) {
      console.log(error);
    }
  };

  const onRoomTypeSubmit = async (data) => {
    try {
      if (selectedRoomType._id) {
        await loaiPhongApi.update(selectedRoomType._id, data);
        setSelectedRoomType({});
      } else {
        await loaiPhongApi.add(data);
      }
      hideRoomTypeForm();
    } catch (error) {
      console.log(error);
    }
  };

  // Bed Type

  const [bedType, setBedType] = useState([]);
  const [showBedTypeModal, setShowBedTypeModal] = useState(false);
  const [showDeleteBedTypeModal, setShowDeleteBedTypeModal] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState({});

  useEffect(() => {
    const fetchBedType = async () => {
      try {
        const { LoaiGiuongs } = await loaiGiuongApi.getAll();
        setBedType(LoaiGiuongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBedType();
  }, []);

  const showBedTypeForm = (bedtype = {}) => {
    setShowBedTypeModal(true);
    setSelectedBedType(bedtype);
  };

  const hideBedTypeForm = () => {
    setShowBedTypeModal(false);
    setSelectedBedType({});
  };

  const showDeleteBedTypeForm = (bedtype) => {
    setShowDeleteBedTypeModal(true);
    setSelectedBedType(bedtype);
  };

  const hideDeleteBedTypeForm = () => {
    setShowDeleteBedTypeModal(false);
    setSelectedBedType({});
  };

  const handleRemoveBedType = async () => {
    try {
      await loaiGiuongApi.delete(selectedBedType._id);
      hideDeleteBedTypeForm();
    } catch (error) {
      console.log(error);
    }
  };

  const onBedTypeSubmit = async (data) => {
    try {
      if (selectedBedType._id) {
        await loaiGiuongApi.update(selectedBedType._id, data);
        setSelectedBedType({});
      } else {
        await loaiGiuongApi.add(data);
      }
      hideBedTypeForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="types-page">
      <div className="row">
        {/* Hotel Type */}
        <div className="col-md-4 col-sm-6">
          <div className="table-responsive">
            <Table className="table table-hover align-middle">
              {/* add Btn */}
              <div
                onClick={showHotelTypeForm}
                className="types-page__action types-page__addBtn shadow-sm bg-dark"
              >
                <i className="fa-solid fa-plus types-page__icon"></i>
              </div>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Hotel Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelType.map((type, index) => (
                  <tr className="" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={type.HinhAnh}
                        alt={type.HinhAnh}
                        width={38}
                        height={38}
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Badge color="dark">{type.TenLoaiChoNghi}</Badge>
                    </td>
                    <td>
                      <div className="types-page__actions">
                        <div
                          onClick={() => showHotelTypeForm(type)}
                          className="types-page__action shadow-sm bg-warning"
                        >
                          <i className="fa-solid fa-pen types-page__icon"></i>
                        </div>

                        <div
                          onClick={() => showDeleteHotelTypeForm(type)}
                          className="types-page__action shadow-sm bg-danger"
                        >
                          <i className="fa-solid fa-trash types-page__icon"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Hotel Detail Modal */}
          <DetailModal
            size="md"
            isOpen={showHotelTypeModal}
            hideModal={hideHotelTypeForm}
          >
            {selectedHotelType && (
              <HotelTypeForm
                hideModal={hideHotelTypeForm}
                selectedHotelType={selectedHotelType}
                onSubmit={onHotelTypeSubmit}
              />
            )}
          </DetailModal>

          {/* Hotel Delete Modal */}
          <DeleteModal
            isOpen={showDeleteHotelTypeModal}
            hideDeleteModal={hideDeleteHotelTypeForm}
            handleRemove={handleRemoveHotelType}
          />
        </div>

        {/* Room Type */}
        <div className="col-md-4 col-sm-6">
          <div className="table-responsive">
            <Table className="table table-hover align-middle">
              {/* add Btn */}
              <div
                onClick={showRoomTypeForm}
                className="types-page__action types-page__addBtn shadow-sm bg-dark"
              >
                <i className="fa-solid fa-plus types-page__icon"></i>
              </div>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomType.map((type, index) => (
                  <tr className="" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Badge color="dark">{type.TenLoaiPhong}</Badge>
                    </td>
                    <td>
                      <div className="types-page__actions">
                        <div
                          onClick={() => showRoomTypeForm(type)}
                          className="types-page__action shadow-sm bg-warning"
                        >
                          <i className="fa-solid fa-pen types-page__icon"></i>
                        </div>

                        <div
                          onClick={() => showDeleteRoomTypeForm(type)}
                          className="types-page__action shadow-sm bg-danger"
                        >
                          <i className="fa-solid fa-trash types-page__icon"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Hotel Detail Modal */}
          <DetailModal
            size="sm"
            isOpen={showRoomTypeModal}
            hideModal={hideRoomTypeForm}
          >
            {selectedRoomType && (
              <RoomTypeForm
                hideModal={hideRoomTypeForm}
                selectedRoomType={selectedRoomType}
                onSubmit={onRoomTypeSubmit}
              />
            )}
          </DetailModal>

          {/* Hotel Delete Modal */}
          <DeleteModal
            isOpen={showDeleteRoomTypeModal}
            hideDeleteModal={hideDeleteRoomTypeForm}
            handleRemove={handleRemoveRoomType}
          />
        </div>

        {/* Bed Type */}
        <div className="col-md-4 col-sm-6">
          <div className="table-responsive">
            <Table className="table table-hover align-middle">
              {/* add Btn */}
              <div
                onClick={showBedTypeForm}
                className="types-page__action types-page__addBtn shadow-sm bg-dark"
              >
                <i className="fa-solid fa-plus types-page__icon"></i>
              </div>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bed Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bedType.map((type, index) => (
                  <tr className="" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Badge color="dark">{type.TenLoaiGiuong}</Badge>
                    </td>
                    <td>
                      <div className="types-page__actions">
                        <div
                          onClick={() => showBedTypeForm(type)}
                          className="types-page__action shadow-sm bg-warning"
                        >
                          <i className="fa-solid fa-pen types-page__icon"></i>
                        </div>

                        <div
                          onClick={() => showDeleteBedTypeForm(type)}
                          className="types-page__action shadow-sm bg-danger"
                        >
                          <i className="fa-solid fa-trash types-page__icon"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Hotel Detail Modal */}
          <DetailModal
            size="sm"
            isOpen={showBedTypeModal}
            hideModal={hideBedTypeForm}
          >
            {selectedBedType && (
              <BedTypeForm
                hideModal={hideBedTypeForm}
                selectedBedType={selectedBedType}
                onSubmit={onBedTypeSubmit}
              />
            )}
          </DetailModal>

          {/* Hotel Delete Modal */}
          <DeleteModal
            isOpen={showDeleteBedTypeModal}
            hideDeleteModal={hideDeleteBedTypeForm}
            handleRemove={handleRemoveBedType}
          />
        </div>
      </div>
    </div>
  );
}

export default TypesPage;
