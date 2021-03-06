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
import { message, Skeleton, Spin } from "antd";
import { choNghiApi } from "api/ChoNghiApi";
import { phanHoiApi } from "api/PhanHoiApi";
import { phongApi } from "api/PhongApi";
import { useDispatch, useSelector } from "react-redux";
import {
  booking,
  chooseDate,
  choosePlace,
  saveCurrentPlace,
} from "features/Hotel/HotelSlice";
import { thanhPhoApi } from "api/ThanhPhoApi";

import moment from "moment";
import { geocodingApi } from "api/GeocodingApi";
HotelDetailPage.propTypes = {};

function HotelDetailPage(props) {
  const { placeId } = useParams();

  //get data from redux
  const { placeChoosen, receiveDate, returnDate, searchValue } = useSelector(
    (state) => state.hotelInfo.homePage
  );

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
  const [dateFilter, setDateFilter] = useState(() => ({
    NgayNhanPhong: moment(receiveDate || new Date()),
    NgayTraPhong: moment(
      returnDate || new Date().setDate(new Date().getDate() + 1)
    ),
  }));
  const { state } = useLocation();
  const navigate = useNavigate();

  //get from redux
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log({ dateFilter });
  //choose room
  const [roomSelected, setRoomSelected] = React.useState([]);

  //save data for lat lng
  const [location, setLocation] = React.useState({
    lat: 10.337189658366952,
    lng: 107.08280682625144,
  });

  const handleBook = () => {
    if (roomSelected.length < 1 || !receiveDate || !returnDate) {
      message.info(
        "H??y ch???n ng??y nh???n,tr??? ph??ng v?? ch???n cho m??nh ph??ng ??ng ?? b???n nh?? ! "
      );
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
        const { ChoNghis } = await choNghiApi.getAll({
          search: searchValue,
          _limit: 1,
        });
        if (ChoNghis.length > 0) {
          dispatch(
            choosePlace({
              _id: ChoNghis[0]._id,
              placeName: ChoNghis[0].TenChoNghi,
              _idCity: ChoNghis[0].ThanhPho[0]._id,
              cityName: ChoNghis[0].ThanhPho[0].TenThanhPho,
            })
          );
        }
        //Not found Place ( maybe user enter a city name)
        else {
          const { ThanhPhos } = await thanhPhoApi.getAll({
            search: searchValue,
            _limit: 1,
          });

          if (ThanhPhos.length > 0) {
            dispatch(
              choosePlace({
                _id: null,
                placeName: null,
                _idCity: ThanhPhos[0]?._id,
                cityName: ThanhPhos[0]?.TenThanhPho,
              })
            );
          } else {
            dispatch(
              choosePlace({
                _id: null,
                placeName: null,
                _idCity: null,
                cityName: searchValue,
              })
            );
          }
        }
        //navite to main page to view result
        navigate("/search");
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaceBySearchValue();

    // navigate("/search");
  };

  //handle update return , receive date
  React.useEffect(() => {
    dispatch(
      chooseDate({
        type: "receiveDate",
        receiveDate: dateFilter.NgayNhanPhong.format("YYYY-MM-DD"),
      })
    );
    dispatch(
      chooseDate({
        type: "returnDate",
        returnDate: dateFilter.NgayTraPhong.format("YYYY-MM-DD"),
      })
    );
  }, [dateFilter]);

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
        const { PhanHois, _totalPage, TongSo, DiemTB } =
          await phanHoiApi.getAll({ MaKhachSan: placeId });
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
        dispatch(saveCurrentPlace(ChoNghi._id));
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
  const handleChooseRoom = (roomSelected) => {
    setRoomSelected((prev) => {
      const index = prev.findIndex(
        (item) => item.room?._id === roomSelected.room._id
      );

      if (roomSelected.quantity === 0) {
        let newRoom = [...prev];
        if (index !== -1) newRoom.splice(index, 1);
        return newRoom;
      }

      if (index === -1) return [...prev, roomSelected];
      let newRoomSelected = [...prev];
      newRoomSelected[index] = roomSelected;
      return newRoomSelected;
    });
  };
  //handle booking
  const handleBooking = () => {
    if (!receiveDate && !returnDate)
      return message.info("Vui l??ng ch???n ng??y nh???n, tr??? ph??ng !");

    if (roomSelected.length < 1) return message.info("Vui l??ng ch???n ph??ng !");

    const placeInfo = {
      _id: place._id,
      type: place.LoaiChoNghi.TenLoaiChoNghi,
      rank: place.XepHang,
      banner: place.HinhAnh[0],
      timeGetAndReturnRoom: {
        getFrom: place.ThoiGianNhanPhong.Tu,
        getTo: place.ThoiGianNhanPhong.Den,
        returnFrom: place.ThoiGianTraPhong.Tu,
      },
      chargeCancleBooking: place.HuyDatPhong,
      name: place.TenChoNghi,
      address: place.DiaChi + ", " + place.ThanhPho.TenThanhPho,
      mediumScore: feedBack.mediumScore,
      totalFeedBack: feedBack.totalFeedBack,
    };

    const timeInfo = {
      returnDate,
      receiveDate,
    };

    dispatch(booking({ placeInfo, roomSelected, timeInfo }));
    navigate("/booking", { state: { credits: place.TinDung } });
  };

  //fetch lat lng from this place's address

  React.useEffect(() => {
    const fetchLocationFromAddress = async () => {
      try {
        const { results } = await geocodingApi.get(`${place?.DiaChi} ${place?.ThanhPho?.TenThanhPho}`);
        if (results.length < 1) return;
        const lction = results[0].geometry.location;
        setLocation({ lat: lction.lat, lng: lction.lng })
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLocationFromAddress();
  }, [place]);

  //set default returnDate , receiveDate
  React.useEffect(() => {
    dispatch(
      chooseDate({
        type: "receiveDate",
        receiveDate: dateFilter.NgayNhanPhong.format("YYYY-MM-DD"),
      })
    );
    dispatch(
      chooseDate({
        type: "returnDate",
        returnDate: dateFilter.NgayTraPhong.format("YYYY-MM-DD"),
      })
    );
  }, [dateFilter]);

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
            Ch??ng t??i lu??n kh???p gi??
          </div>
          <FormSearch
            onSearch={handleSearch}
            placeName={placeChoosen.cityName}
            receiveDate={receiveDate}
            returnDate={returnDate}
          />

          <ViewOnGoogleMap
            place={{
              banner: place?.HinhAnh[0],
              name: place?.TenChoNghi,
              rank: place?.XepHang,
              address: place?.DiaChi + ", " + place?.ThanhPho?.TenThanhPho,
              mediumScore: feedBack?.mediumScore,
              totalFeedBack: feedBack?.totalFeedBack,
            }}
            location={location}
          />
        </div>
        <div className="wrapper__content__right">
          <Row className="wrapper__content__right__top">
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("empty-room")}
              >
                Th??ng tin & gi??
              </a>
            </Col>
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("favourite-convenients")}
              >
                Ti???n nghi
              </a>
            </Col>
            <Col>
              <a
                className="top-item"
                onClick={() => ScrollToView("general-rule")}
              >
                Quy t???c chung
              </a>
            </Col>
            <Col>
              <a className="top-item" onClick={() => ScrollToView("feedback")}>
                ????nh gi?? c???a kh??ch (
                {isLoadingFeedBack ? (
                  <Spin size="small" />
                ) : (
                  feedBack.totalFeedBack
                )}
                )
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
                  <ShowStar num={place?.XepHang} />
                </div>
                <button onClick={() => handleBook()} className="btn-primary">
                  ?????t ngay
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
                    key={i}
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
                    key={i}
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
            {isLoading ? (
              <Skeleton.Input active />
            ) : (
              <cite>{place?.TieuDeDatDiem}</cite>
            )}
          </h5>
          {!isLoading && (
            <p>
              {/* N???m ??? th??nh ph??? V??ng T??u, c??ch B??i Sau 100 m v?? B??i D???a 1,8 km,
              Annata Hotel Vung Tau cung c???p ch??? ngh??? v???i s???nh kh??ch chung v??
              WiFi mi???n ph?? c??ng nh?? ch??? ????? xe ri??ng mi???n ph?? cho kh??ch l??i xe.
              Ch??? ngh??? n??y c?? c??c ph??ng gia ????nh v?? s??n hi??n t???m n???ng. Ch??? ngh???
              cung c???p d???ch v??? l??? t??n 24 gi???, d???ch v??? ph??ng v?? ph??ng gi??? ha??nh ly??
              cho kh??ch. Ph??ng ngh??? t???i ????y ???????c trang b??? m??y ??i???u h??a, TV
              truy???n h??nh c??p m??n h??nh ph???ng, t??? l???nh, ???m ??un n?????c, v??i sen, d??p
              ??i trong ph??ng v?? b??n l??m vi???c. T???t c??? c??c ph??ng c?? ph??ng t???m
              ri??ng, ????? v??? sinh c?? nh??n mi???n ph?? v?? ga tr???i gi?????ng. Kh??ch ngh???
              t???i kh??ch s???n c?? th??? th?????ng th???c b???a s??ng ki???u ??. Annata Hotel
              Vung Tau n???m trong b??n k??nh 2 km t??? B??i Tr?????c v?? 2,2 km t??? M??i
              Nghinh Phong. S??n bay g???n nh???t l?? s??n bay qu???c t??? T??n S??n Nh???t,
              c??ch ch??? ngh??? 108 km. C??c c???p ????i ?????c bi???t th??ch ?????a ??i???m n??y ??? h???
              cho ??i???m 8,2 cho k??? ngh??? d??nh cho 2 ng?????i. */}
              {place?.MoTaDatDiem}
            </p>
          )}
          {isLoading && <Skeleton paragraph={{ rows: 5 }} active />}
        </div>

        <div
          className="wrapper__body__favourite-convenients"
          id="favourite-convenients"
        >
          <p className="wrapper__body__favourite-convenients__title">
            C??c ti???n nghi ???????c ??a chu???ng nh???t
          </p>
          {!isLoading && <FavouriteConvenients convenients={place?.TienNghi} />}
          {isLoading && <Skeleton paragraph={{ rows: 0 }} active />}
        </div>

        <div className="wrapper__body__empty-room" id="empty-room">
          <div className="wrapper__body__empty-room__header">
            <div className="title">Ph??ng tr???ng</div>
            <div className="quote no-bg">
              <img src="https://t-cf.bstatic.com/static/img/bpg/bpg_logo/43fb545d9c32614b87f0615a97620ad3d8685525.png" />
              Ch??ng t??i lu??n kh???p gi??
            </div>
          </div>
          <InfoSearch setDateFilter={setDateFilter} dateFilter={dateFilter} />
          <ListRoom
            onBooking={handleBooking}
            onChooseRoom={handleChooseRoom}
            roomSelectedInfo={{
              totalRoom: roomSelected.length,
              totalPrice: roomSelected.reduce((a, room) => a + room.price, 0),
            }}
            rooms={room}
          />
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
            className="btn-primary-outline">
            ?????c t???t c??? ????nh gi??
          </a>

          {isVisibleAllFeedBack && (
            <ViewAllFeedBack
              isOwner={
                user.Quyen === "MANAGER" && user._id === place.QuanLy?._id
              }
              setIsVisibleAllFeedBack={setIsVisibleAllFeedBack}
            />
          )}

          <GeneralRule
            receiveDate={place?.ThoiGianNhanPhong}
            returnDate={place?.ThoiGianTraPhong}
            cancelBook={place?.HuyDatPhong}
            credits={place?.TinDung}
          />
          <Note />
        </div>
      </div>
    </div>
  );
}

export default HotelDetailPage;
