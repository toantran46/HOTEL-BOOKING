import React from 'react';
import PropTypes from 'prop-types';
import "./Home.scss";
import SearchHotel from 'features/Hotel/components/SearchHotel';
import PlaceBanner from './components/PlaceBanner';
import Category from './components/Category';
Home.propTypes = {

};

function Home(props) {

    const placeType = {
        title: "Tìm theo loại chổ nghĩ",
        list: [
            {
                image: "https://t-cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
                name: "Khách sạn",
                total: "844,552 khách sạn"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
                name: "Apartments",
                total: "758,901 apartments"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
                name: "Resorts",
                total: "17,508 resorts"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
                name: "Villas",
                total: "397,582 villas"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
                name: "Cabins",
                total: "32,558 cabins"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_cottages/5e1fd9cd716f4825c6c7eac5abe692c52cc64516.jpg",
                name: "Cottages",
                total: "134,133 cottages"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_glamping/6e181b9e942c160f4605239be7ddc1728cbcc4c8.jpg",
                name: "Glamping",
                total: "10,566 Glamping Sites"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_aparthotel/10e092f390b128dcff92727912299eef7824b751.jpg",
                name: "Serviced Apartments",
                total: "31,841 serviced apartments"
            },
            {
                image: "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-holidayhomes_300/604c7484d34a9e8791c2d5a0e2df4bc8c803dc7c.jpg",
                name: "Vacation Homes",
                total: "397,582 vacation homes"
            },
        ],
    }

    const VNdiscover = {
        title: "Khám phá Việt Namĩ",
        description: "Các điểm đến phổ biến này có nhiều điều chờ đón bạn",
        list: [
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=",
                name: "Đà lạt",
                total: "2,145 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688879.webp?k=82ca0089828054a1a9c46b14ea7f1625d73d42505ae58761e8bcc067f9e72475&o=",
                name: "Phú Quốc",
                total: "672 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688893.webp?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=",
                name: "Hồ Chí Minh City",
                total: "5,605 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688844.webp?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=",
                name: "Đà Nẵng",
                total: "2,509 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688907.webp?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=",
                name: "Nha Trang",
                total: "1,657 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688853.webp?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=",
                name: "Hà Nội",
                total: "3,803 chổ nghỉ"
            },
        ],
    }

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
            <PlaceBanner />
            <Category title={placeType.title} list={placeType.list} />
            <Category title={VNdiscover.title} list={VNdiscover.list} />
            <Category title={favouriteHotel.title} list={favouriteHotel.list} num={favouriteHotel.num} />
        </div>
    );
}

export default Home;