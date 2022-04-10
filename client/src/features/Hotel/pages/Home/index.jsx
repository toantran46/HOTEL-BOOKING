import React from 'react';
import PropTypes from 'prop-types';
import "./Home.scss";
import SearchHotel from 'features/Hotel/components/SearchHotel';
import PlaceBanner from './components/PlaceBanner';
import Category from './components/Category';
import { choNghiApi } from 'api/ChoNghiApi';
import { loaiChoNghiApi } from 'api/LoaiChoNghiApi';
import { thanhPhoApi } from 'api/ThanhPhoApi';
Home.propTypes = {

};

function Home(props) {

    const [placeType, setPlaceType] = React.useState([]);
    const [placeEachCity, setPlaceEachCity] = React.useState([]);
    const [favouritePlace, setFavouritePlace] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState([]);


    //fetch total place group by city
    React.useState(() => {
        const fetchTotalPlaceEachCity = async () => {
            try {
                setIsLoading(true);
                const { ThanhPhos } = await thanhPhoApi.getAll({ action: "getTotalPlace" })
                const data = ThanhPhos.map(ThanhPho => (
                    {
                        _id: ThanhPho._id,
                        name: ThanhPho.TenThanhPho,
                        image: ThanhPho.HinhAnh,
                        total: ThanhPho.TongSo + " chổ nghĩ"
                    }));
                setPlaceEachCity(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }

        fetchTotalPlaceEachCity();
    }, [])

    //fetch total place group by place type
    React.useState(() => {
        const fetchTotalPlaceEachPlaceType = async () => {
            try {
                setIsLoading(true);
                const { LoaiChoNghis } = await loaiChoNghiApi.getAll({ action: "getTotalPlace" })
                const data = LoaiChoNghis.map(LoaiChoNghi => (
                    {
                        _id: LoaiChoNghi._id,
                        name: LoaiChoNghi.TenLoaiChoNghi,
                        image: LoaiChoNghi.HinhAnh,
                        total: LoaiChoNghi.TongSo + " chổ nghĩ"
                    }));
                setPlaceType(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
        }
        fetchTotalPlaceEachPlaceType();
    }, [])

    //fetch favourite places
    React.useState(() => {
        const fetchFavouritePlaces = async () => {
            try {
                setIsLoading(true);
                const { ChoNghis } = await choNghiApi.getAll({ filter: "DiemDanhGia", value: 9 })

                const data = ChoNghis.map(ChoNghi => ({
                    _id: ChoNghi._id,
                    image: ChoNghi.HinhAnh[0],
                    name: ChoNghi.TenChoNghi,
                    place: `${ChoNghi.DiaChi}, ${ChoNghi.ThanhPho[0].TenThanhPho}`,
                    score: parseFloat(ChoNghi.DiemDG).toFixed(1),
                    feedBackMessage: "Tuyệt hảo",
                    numVoted: `${ChoNghi.PhanHoi.length} đánh giá`

                }))
                setFavouritePlace(data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }

        fetchFavouritePlaces();
    }, [])




    const favouriteHotel = {
        title: "Khách sạn mà khách yêu thích",
        list: [
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/74529578.jpg?k=a7fcefd47d7271daf44f6ce78a215b9505f9f8e5cac3af093b78b9c489fd8461&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.5,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/38437078.jpg?k=241519692574af90306f0dbec0121eacfddc9a183df3ea34a7b7c8f2b4f5febb&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.2,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/74065694.jpg?k=7d852b0255118faf9ca8f22ac30b033f8b7448ad7f47867f13bd213c6cb2e411&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.1,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/75328633.jpg?k=87304e5542c63c022f2cbc134b02b85b65496a9ed8c6ca129b49c02f817589db&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.9,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/102743522.jpg?k=ec1674f7d6baa425ce4d27fcde9327376b0e5d36b7972a12a82285f53761aa68&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.4,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/hotel/max500/38437078.jpg?k=241519692574af90306f0dbec0121eacfddc9a183df3ea34a7b7c8f2b4f5febb&o=",
                name: "Sugar Loft Apartments",
                place: "Rio de Janeiro",
                score: 9.7,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            },
        ],
        num: 4
    }
    return (
        <div className='home'>
            <SearchHotel />
            <PlaceBanner list={[...placeEachCity].splice(0, 5)} />
            <Category
                title="Tìm theo loại chổ nghĩ" list={placeType} />
            <Category
                title="Khám phá Việt Nam"
                description="Các điểm đến phổ biến này có nhiều điều chờ đón bạn"
                list={placeEachCity} />
            <Category
                title="Khách sạn mà khách yêu thích"
                list={favouritePlace}
                num={4}
                destination="/" />
        </div>
    );
}

export default Home;