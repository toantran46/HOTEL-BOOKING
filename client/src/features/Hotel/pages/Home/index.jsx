import React from "react";
import PropTypes from "prop-types";
import "./Home.scss";
import SearchHotel from "features/Hotel/components/SearchHotel";
import PlaceBanner from "./components/PlaceBanner";
import Category from "./components/Category";
import { choNghiApi } from "api/ChoNghiApi";
import { loaiChoNghiApi } from "api/LoaiChoNghiApi";
import { thanhPhoApi } from "api/ThanhPhoApi";
import SkeletonImage from "./components/SkeletonImage";
import { filter } from "lodash";
Home.propTypes = {};

function Home(props) {
  const [placeType, setPlaceType] = React.useState([]);
  const [placeEachCity, setPlaceEachCity] = React.useState([]);
  const [favouritePlace, setFavouritePlace] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  //fetch total place group by city
  React.useState(() => {
    const fetchTotalPlaceEachCity = async () => {
      try {
        setIsLoading(true);
        const { ThanhPhos } = await thanhPhoApi.getAll({
          action: "getTotalPlace",
        });
        const data = ThanhPhos.map((ThanhPho) => ({
          _id: ThanhPho._id,
          name: ThanhPho.TenThanhPho,
          image: ThanhPho.HinhAnh,
          total: ThanhPho.TongSo + " chổ nghĩ",
        }));
        setPlaceEachCity(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchTotalPlaceEachCity();
  }, []);

  //fetch total place group by place type
  React.useState(() => {
    const fetchTotalPlaceEachPlaceType = async () => {
      try {
        setIsLoading(true);
        const { LoaiChoNghis } = await loaiChoNghiApi.getAll({
          action: "getTotalPlace",
        });
        const data = LoaiChoNghis.map((LoaiChoNghi) => ({
          _id: LoaiChoNghi._id,
          name: LoaiChoNghi.TenLoaiChoNghi,
          image: LoaiChoNghi.HinhAnh,
          total: LoaiChoNghi.TongSo + " chổ nghĩ",
        }));
        setPlaceType(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchTotalPlaceEachPlaceType();
  }, []);

  //fetch favourite places
  React.useState(() => {
    const fetchFavouritePlaces = async () => {
      try {
        setIsLoading(true);
        const { ChoNghis } = await choNghiApi.getAll({
          filterV2: "DiemDanhGia",
          value: 9,
        });

        const data = ChoNghis.map((ChoNghi) => ({
          _id: ChoNghi._id,
          image: ChoNghi.HinhAnh[0],
          name: ChoNghi.TenChoNghi,
          place: `${ChoNghi.DiaChi}, ${ChoNghi.ThanhPho[0].TenThanhPho}`,
          score: parseFloat(ChoNghi.DiemTB).toFixed(1),
          feedBackMessage: "Tuyệt hảo",
          numVoted: `${ChoNghi.PhanHoi.length} đánh giá`,
        }));
        setFavouritePlace(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchFavouritePlaces();
  }, []);

  return (
    <div className="home">
      <SearchHotel />
      <PlaceBanner list={[...placeEachCity].splice(0, 5)} />
      <Category
        name="placeType"
        title="Tìm theo loại chổ nghĩ"
        list={placeType} />
      <Category
        isLoading={isLoading}
        title="Khám phá Việt Nam"
        description="Các điểm đến phổ biến này có nhiều điều chờ đón bạn"
        list={placeEachCity}
      />
      <Category
        name="favouriteHotel"
        isLoading={isLoading}
        title="Khách sạn mà khách yêu thích"
        list={favouritePlace}
        num={4}
        destination="/"
      />
    </div>
  );
}

export default Home;
