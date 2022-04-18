import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import FormSearch from "features/Hotel/components/FormSearch";
import BreadcrumbStyled from "features/Hotel/components/BreadcrumbStyled";

import "./HotelDetailPage.scss";
import GroupImage from "features/Hotel/components/GroupImage";
import ShowStar from "features/Hotel/components/ShowStar";
import Convenients from "features/Hotel/components/Convenients";
import FavouriteConvenients from "features/Hotel/components/FavouriteConvenients";
import InfoSearch from "features/Hotel/components/InfoSearch";
import ListRoom from "features/Hotel/components/ListRoom";

import { ScrollToView } from "assets/globaJS";
import FeedBack from "features/Hotel/components/FeedBack";
import ViewDetailComments from "features/Hotel/components/ViewDetailComments";
import ViewAllFeedBack from "features/Hotel/components/ViewAllFeedBack";
import ViewOnGoogleMap from "features/Hotel/components/ViewOnGoogleMap";
import GeneralRule from "./components/GeneralRule";
import Note from "./components/Note";
import { message, Skeleton } from "antd";
import { choNghiApi } from "api/ChoNghiApi";
import { phanHoiApi } from "api/PhanHoiApi";
import { phongApi } from "api/PhongApi";
import { useDispatch, useSelector } from "react-redux";

import { booking, chooseDate, choosePlace, saveCurrentPlace } from 'features/Hotel/HotelSlice';
import { thanhPhoApi } from "api/ThanhPhoApi";

import moment from 'moment';
HotelDetailPage.propTypes = {};

function HotelDetailPage(props) {
  const { placeId } = useParams();


  //get data from redux
  const { placeChoosen, receiveDate, returnDate, searchValue } = useSelector(state => state.hotelInfo.homePage);

  //save data for place
  const [place, setPlace] = React.useState();
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  //save data for feedback
  const [feedBack, setFeedBack] = React.useState({
    comments: [],
    totalFeedBack: null,
    mediumScore: null,
  });

  const [isLoadingFeedBack, setIsLoadingFeedBack] = React.useState(false);

  const [isVisibleAllFeedBack, setIsVisibleAllFeedBack] = React.useState(false);
  const [dateFilter, setDateFilter] = useState(() => (receiveDate && returnDate) ? ({ NgayNhanPhong: moment(receiveDate), NgayTraPhong: moment(returnDate) }) : null);

  //
  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log({ dateFilter })
  //choose room
  const [roomSelected, setRoomSelected] = React.useState([]);

  const handleBook = () => {
    if (roomSelected.length < 1 || !receiveDate || !returnDate) {
      message.info("Hãy chọn ngày nhận,trả phòng và chọn cho mình phòng ưng ý bạn nhé ! ");
      ScrollToView("empty-room");
      return;
    }

    //navigate to booking page
    navigate("/booking");
  };
  //handle search place 
  const handleSearch = (searchValue) => {
    const fetchPlaceBySearchValue = async () => {
      try {
        const { ChoNghis } = await choNghiApi.getAll({ search: searchValue, _limit: 1 });
        if (ChoNghis.length > 0) {
          dispatch(choosePlace({
            _id: ChoNghis[0]._id,
            placeName: ChoNghis[0].TenChoNghi,
            _idCity: ChoNghis[0].ThanhPho[0]._id,
            cityName: ChoNghis[0].ThanhPho[0].TenThanhPho
          }));

        } else
        //Not found Place ( maybe user enter a city name)
        {
          const { ThanhPhos } = await thanhPhoApi.getAll({ search: searchValue, _limit: 1 });

          if (ThanhPhos.length > 0) {
            dispatch(choosePlace({
              _id: null,
              placeName: null,
              _idCity: ThanhPhos[0]?._id,
              cityName: ThanhPhos[0]?.TenThanhPho
            }));
          } else {
            dispatch(choosePlace({
              _id: null,
              placeName: null,
              _idCity: null,
              cityName: searchValue
            }));
          }

        }
        //navite to main page to view result
        navigate('/search')
      } catch (error) {
        console.log(error)
      }
    }

    fetchPlaceBySearchValue();

    // navigate("/search");
  };



  //handle update return , receive date
  React.useEffect(() => {
    dispatch(chooseDate({ type: "receiveDate", receiveDate: dateFilter.NgayNhanPhong.format("YYYY-MM-DD") }))
    dispatch(chooseDate({ type: "returnDate", returnDate: dateFilter.NgayTraPhong.format("YYYY-MM-DD") }))
  }, [dateFilter])

  // fetch rooms

  React.useEffect(() => {
    const fetchRoom = async () => {
      try {
        const rooms = await phongApi.getEmptyRoom(
          placeId,
          dateFilter?.NgayNhanPhong,
          dateFilter?.NgayTraPhong
        );
        setRoom(rooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [placeId, dateFilter]);

  //fetch all feed back
  React.useEffect(() => {
    const fetchFeedBacks = async () => {
      try {
        const { PhanHois, _totalPage, TongSo, DiemTB } = await phanHoiApi.getAll({ MaKhachSan: placeId });
        setIsLoadingFeedBack(false);
        setFeedBack({
          comments: PhanHois,
          totalFeedBack: TongSo,
          mediumScore: DiemTB,
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    setIsLoadingFeedBack(true);
    setTimeout(() => {
      fetchFeedBacks();
    }, 3000);
  }, [placeId]);

  //fetch places
  React.useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { ChoNghi } = await choNghiApi.get(placeId);
        setIsLoading(false);
        setPlace(ChoNghi);
        dispatch(saveCurrentPlace(ChoNghi._id))
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    setIsLoading(true);
    setTimeout(() => {
      fetchPlace();
    }, 2000);
  }, [placeId]);

  //handle chooseRoom for booking
  const handleChooseRoom = roomSelected => {
    setRoomSelected(prev => {
      const index = prev.findIndex(item => item.room?._id === roomSelected.room._id);

      if (roomSelected.quantity === 0) {
        let newRoom = [...prev];
        if (index !== -1) newRoom.splice(index, 1);
        return newRoom;
      }


      if (index === -1) return [...prev, roomSelected];
      let newRoomSelected = [...prev];
      newRoomSelected[index] = roomSelected;
      return newRoomSelected;
    })

  }
  //handle booking
  const handleBooking = () => {

    if (!receiveDate && !returnDate) return message.info("Vui lòng chọn ngày nhận, trả phòng !");

    if (roomSelected.length < 1) return message.info("Vui lòng chọn phòng !");

    const placeInfo = {
      _id: place._id,
      type: place.LoaiChoNghi.TenLoaiChoNghi,
      rank: place.XepHang,
      banner: place.HinhAnh[0],
      timeGetAndReturnRoom: { getFrom: place.ThoiGianNhanPhong.Tu, getTo: place.ThoiGianNhanPhong.Den, returnFrom: place.ThoiGianTraPhong.Tu },
      chargeCancleBooking: place.HuyDatPhong,
      name: place.TenChoNghi,
      address: place.DiaChi + ', ' + place.ThanhPho.TenThanhPho,
      mediumScore: feedBack.mediumScore,
      totalFeedBack: feedBack.totalFeedBack
    }

    const timeInfo = {
      returnDate, receiveDate
    }

    dispatch(booking({ placeInfo, roomSelected, timeInfo }))
    navigate("/booking", { state: { credits: place.TinDung } });

  }

  const ImageSkeleton = ({ width, height, style }) => {
    return <Skeleton.Image style={{ width, height, ...style }} />;
  };

  return (
    <div className="wrapper">
      <BreadcrumbStyled />
      <div className="wrapper__content">
        <div className="wrapper__content__left">
          <div className="quote">
            <img src="https://t-cf.bstatic.com/static/img/bpg/bpg_logo/43fb545d9c32614b87f0615a97620ad3d8685525.png" />
            Chúng tôi luôn khớp giá
          </div>
          <FormSearch
            onSearch={handleSearch}
            placeName={placeChoosen.cityName}
            receiveDate={receiveDate}
            returnDate={returnDate} />
          <ViewOnGoogleMap />
        </div>
        <div className="wrapper__content__right">
          <Row className="wrapper__content__right__top">
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("empty-room")}
              >
                Thông tin & giá
              </a>
            </Col>
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("favourite-convenients")}
              >
                Tiện nghi
              </a>
            </Col>
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("general-rule")}
              >
                Quy tắc chung
              </a>
            </Col>
            <Col>
              <a className="top-item" onClick={() => ScrollToView("feedback")}>
                Đánh giá của khách (760)
              </a>
            </Col>
          </Row>
          {!isLoading && (
            <>
              {" "}
              <div className="wrapper__content__right__top-main">
                <div>
                  <span className="wrapper__content__right__top-main__type">
                    {place?.LoaiChoNghi?.TenLoaiChoNghi}
                  </span>
                  <span className="wrapper__content__right__top-main__name">
                    {place?.TenChoNghi}
                  </span>
                  <ShowStar num={5} />
                </div>
                <button onClick={() => handleBook()} className="btn-primary">
                  Đặt ngay
                </button>
              </div>
              <div className="wrapper__content__right__location">
                <span className="location-image" />{" "}
                {`${place?.DiaChi}, ${place?.ThanhPho.TenThanhPho}`}
              </div>{" "}
              {!isLoading && <GroupImage images={place?.HinhAnh} />}
              <Convenients convenients={place?.TienNghi} />
            </>
          )}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Skeleton paragraph={{ rows: 1 }} />
              <Skeleton.Button />
            </div>
          )}

          {isLoading && (
            <>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ImageSkeleton
                    width="265px"
                    height="170px"
                    style={{ marginBottom: "0.8rem" }}
                  />
                  <ImageSkeleton width="265px" height="170px" />
                </div>
                <div>
                  <ImageSkeleton
                    width="540px"
                    height="355px"
                    style={{ marginLeft: "0.8rem" }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.8rem",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <ImageSkeleton
                    style={{ marginRight: "0.8rem" }}
                    width="154px"
                    height="117px"
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.8rem",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton.Button
                      active
                      style={{
                        marginRight: "0.8rem",
                        width: "80px",
                        height: "8px",
                      }}
                    />

                    <Skeleton.Button
                      active
                      style={{
                        marginRight: "0.8rem",
                        width: "154px",
                        height: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="wrapper__body">
        <div className="wrapper__body__about-hotel">
          <h5>
            Tận hưởng dịch vụ đỉnh cao, đẳng cấp thế giới tại{" "}
            {isLoading ? (
              <Skeleton.Input active />
            ) : (
              <cite>Pullman Vung Tau</cite>
            )}
          </h5>
          {!isLoading && (
            <p>
              Nằm ở thành phố Vũng Tàu, cách Bãi Sau 100 m và Bãi Dứa 1,8 km,
              Annata Hotel Vung Tau cung cấp chỗ nghỉ với sảnh khách chung và
              WiFi miễn phí cũng như chỗ đỗ xe riêng miễn phí cho khách lái xe.
              Chỗ nghỉ này có các phòng gia đình và sân hiên tắm nắng. Chỗ nghỉ
              cung cấp dịch vụ lễ tân 24 giờ, dịch vụ phòng và phòng giữ hành lý
              cho khách. Phòng nghỉ tại đây được trang bị máy điều hòa, TV
              truyền hình cáp màn hình phẳng, tủ lạnh, ấm đun nước, vòi sen, dép
              đi trong phòng và bàn làm việc. Tất cả các phòng có phòng tắm
              riêng, đồ vệ sinh cá nhân miễn phí và ga trải giường. Khách nghỉ
              tại khách sạn có thể thưởng thức bữa sáng kiểu Á. Annata Hotel
              Vung Tau nằm trong bán kính 2 km từ Bãi Trước và 2,2 km từ Mũi
              Nghinh Phong. Sân bay gần nhất là sân bay quốc tế Tân Sơn Nhất,
              cách chỗ nghỉ 108 km. Các cặp đôi đặc biệt thích địa điểm này — họ
              cho điểm 8,2 cho kỳ nghỉ dành cho 2 người.
            </p>
          )}
          {isLoading && <Skeleton paragraph={{ rows: 5 }} active />}
        </div>

        <div
          className="wrapper__body__favourite-convenients"
          id="favourite-convenients"
        >
          <p className="wrapper__body__favourite-convenients__title">
            Các tiện nghi được ưa chuộng nhất
          </p>
          {!isLoading && <FavouriteConvenients convenients={place?.TienNghi} />}
          {isLoading && <Skeleton paragraph={{ rows: 0 }} active />}
        </div>

        <div className="wrapper__body__empty-room" id="empty-room">
          <div className="wrapper__body__empty-room__header">
            <div className="title">Phòng trống</div>
            <div className="quote no-bg">
              <img src="https://t-cf.bstatic.com/static/img/bpg/bpg_logo/43fb545d9c32614b87f0615a97620ad3d8685525.png" />
              Chúng tôi luôn khớp giá
            </div>
          </div>
          <InfoSearch setDateFilter={setDateFilter} dateFilter={dateFilter} />
          <ListRoom
            onBooking={handleBooking}
            onChooseRoom={handleChooseRoom}
            roomSelectedInfo={{ totalRoom: roomSelected.length, totalPrice: roomSelected.reduce((a, room) => a + room.price, 0) }}
            rooms={room} />
          {/* <ListRoom rooms={room} /> */}

          <FeedBack
            isLoadingFeedBack={isLoadingFeedBack}
            setIsVisibleAllFeedBack={setIsVisibleAllFeedBack}
            feedBack={feedBack}
            isLoading={isLoading}
          />
          <br />
          {/* <ViewDetailComments /> */}

          <a
            onClick={() => setIsVisibleAllFeedBack(true)}
            className="btn-primary-outline"
          >
            Đọc tất cả đánh giá
          </a>
          {
            isVisibleAllFeedBack && (
              <ViewAllFeedBack
                setIsVisibleAllFeedBack={setIsVisibleAllFeedBack}
              />
            )
          }
          <GeneralRule
            receiveDate={place?.ThoiGianNhanPhong}
            returnDate={place?.ThoiGianTraPhong}
            cancelBook={place?.HuyDatPhong}
            credits={place?.TinDung}
          />
          <Note />
        </div >
      </div >
    </div >
  );
}

export default HotelDetailPage;
