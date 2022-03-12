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
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
            },
            {
                image: "https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
                name: "Vũng Tàu",
                total: "1,821 chổ nghỉ"
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
                score: 9.0,
                feedBackMessage: "Tuyệt hảo",
                numVoted: "296 đánh giá"
            }
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