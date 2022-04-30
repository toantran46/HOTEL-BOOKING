import { choNghiApi } from "api/ChoNghiApi";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import HotelDetail from "features/Admin/components/HotelDetail";
import HotelForm from "features/Admin/components/HotelForm";
import Pagination from "features/Admin/components/Pagination";
import PaginationStyled from "features/Hotel/components/PaginationStyled";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import { toastSucsess } from "utils/notifi";
import "./hotel.scss";

function HotelPage(props) {
  const [hotel, setHotel] = useState([]);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showDeleteHotelModal, setShowDeleteHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [getNewData, setGetNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });

  const [isEdit, setIsEdit] = useState(false);

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
  }, [pagination.page, getNewData]);

  //handle change page 
  const handleChangePage = page => {
    setPagination(prev => ({ ...prev, page }))
  }

  //handle update hotel
  const handleSubmit = async values => {
    try {
      setIsLoading(true);

      //get all new file return format [FILE,FILE,...]  

      let imageStatic = [];
      let newFile = [];

      values.HinhAnhMoi?.forEach(f => {
        if (f.file) newFile.push(f.file);
        else {
          imageStatic.push(f.url);
        }
      });
      //get all image have been remove 
      const imagesRemoved = selectedHotel.HinhAnh.filter(oldImg => !imageStatic.includes(oldImg));

      //data for POST
      let data;
      //check data for post have file ?
      if (newFile.length < 1) {
        //send data normal needn't formdata
        data = {
          TenChoNghi: values.TenChoNghi,
          TieuDeDatDiem: values.TieuDeDatDiem,
          MoTaDatDiem: values.MoTaDatDiem,
          DiaChi: values.DiaChi,
          ThanhPho: values.ThanhPho,
          LoaiChoNghi: values.LoaiChoNghi,
          XepHang: values.XepHang,
          TienNghi: values.TienNghi,
          HinhAnhURL: imageStatic,
          HuyDatPhong: values.HuyDatPhong,
          BaoHiemNhamLan: values.BaoHiemNhamLan,
          ThoiGianNhanPhong: {
            Tu: values.ThoiGianNhanPhongTu,
            Den: values.ThoiGianNhanPhongDen,
          },
          ThoiGianTraPhong: {
            Tu: values.ThoiGianTraPhongTu,
            Den: values.ThoiGianTraPhongDen,
          },
          TinDung: values.TinDung,
          HinhAnhDaXoa: imagesRemoved
        }

      } else {
        //send have file
        data = new FormData();
        data.append('TenChoNghi', values.TenChoNghi)
        data.append('TieuDeDatDiem', values.TieuDeDatDiem)
        data.append('MoTaDatDiem', values.MoTaDatDiem)
        data.append('DiaChi', values.DiaChi)
        data.append('ThanhPho', values.ThanhPho)
        data.append('LoaiChoNghi', values.LoaiChoNghi)
        data.append('XepHang', values.XepHang)
        data.append('TienNghi', JSON.stringify(values.TienNghi))
        data.append('HinhAnhURL', JSON.stringify(imageStatic))
        data.append('HuyDatPhong', values.HuyDatPhong)
        data.append('BaoHiemNhamLan', values.BaoHiemNhamLan)
        data.append('ThoiGianNhanPhong', JSON.stringify({
          Tu: values.ThoiGianNhanPhongTu,
          Den: values.ThoiGianNhanPhongDen
        }))
        data.append('ThoiGianTraPhong', JSON.stringify({
          Tu: values.ThoiGianTraPhongTu,
          Den: values.ThoiGianTraPhongDen
        }))
        data.append('TinDung', JSON.stringify(values.TinDung));
        data.append('HinhAnhDaXoa', JSON.stringify(imagesRemoved));

        //file
        newFile.forEach(file => {
          data.append('HinhAnh', file);
        })
      }

      const { message } = await choNghiApi.update(selectedHotel._id, data);
      toastSucsess(message);
      setIsLoading(false);
      setGetNewData(prev => ~prev);
      hideModal();
      setIsEdit(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }


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
                      onClick={() => { showModal(ht); setIsEdit(true) }}
                      className="hotel-list__action shadow-sm bg-info" >
                      <i class="bi bi-pencil"></i>
                    </div>
                    <div
                      onClick={() => { showModal(ht); setIsEdit(false) }}
                      className="hotel-list__action shadow-sm bg-primary">
                      <i className="fa-solid fa-info hotel-list__icon"></i>
                    </div>

                    <div
                      onClick={() => showDeleteModal(ht)}
                      className="hotel-list__action shadow-sm bg-danger">
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
        {(selectedHotel._id && !isEdit) ? <HotelDetail selectedHotel={selectedHotel} /> : <HotelForm isLoading={isLoading} selectedHotel={selectedHotel} onSubmit={handleSubmit} />}
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
