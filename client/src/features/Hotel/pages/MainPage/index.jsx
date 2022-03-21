import React from 'react';
// import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input } from 'reactstrap';

import "./MainPage.scss";
import { Link } from 'react-router-dom';

import FilterItem from 'features/Hotel/components/FilterItem';
import HotelOverView from 'features/Hotel/components/HotelOverView';
import Pagination from 'features/Hotel/components/Pagination';
import FilterLoading from 'features/Hotel/components/FilterLoading';
import ListHoTelOverView from 'features/Hotel/components/ListHotelOverView';
import FormSearch from 'features/Hotel/components/FormSearch';
import BreadcrumbStyled from 'features/Hotel/components/BreadcrumbStyled';


MainPage.propTypes = {

};

function MainPage(props) {

    const listHotel = [{
        _id: 1,
        star: 5,
        banner: 'https://t-cf.bstatic.com/xdata/images/hotel/square600/137122365.webp?k=a246cec494000af14def5f1cc2bcd4db310a6b13a44d5580cbefad21ca1e3e58&o=&s=1',
        name: 'Dusit Princess Moonrise Beach Resort',
        place: 'Duong Dong, Phú Quốc',
        convenients: [
            {
                icon: "M13.165 19.747a5 5 0 0 0 2.214.503 5.39 5.39 0 0 0 3.923-1.743l-1.072.033a6.261 6.261 0 0 0 5.112 1.704.75.75 0 1 0-.184-1.488 4.761 4.761 0 0 1-3.888-1.296.75.75 0 0 0-1.072.033 3.888 3.888 0 0 1-2.83 1.257 3.498 3.498 0 0 1-1.547-.352.75.75 0 0 0-.656 1.349zm-2.78-11.309L9.618 23.2a.75.75 0 0 0 1.498.078l.767-14.761a.75.75 0 1 0-1.498-.078zM5.002 23.48L9.948 8.084a.75.75 0 1 0-1.428-.458L3.574 23.02a.75.75 0 1 0 1.428.458zM9.001 8.568l8.276 2.709a1.5 1.5 0 0 0 1.943-1.723c-.274-2.213-1.937-4.068-4.162-4.596-2.062-.413-3.71-.063-4.958.783-.545.369-.9.749-1.089 1.031l-.42.697a.75.75 0 1 0 1.287.772l.4-.667c.068-.1.293-.34.663-.592.92-.623 2.16-.886 3.797-.559a3.97 3.97 0 0 1 3.003 3.373l.009.056-.001.001-8.282-2.71a.75.75 0 0 0-.466 1.425zm.037-1.437L1.504 9.176H1.5c.2-1.74 1.417-3.116 3.056-3.509 2.084-.417 3.741.097 4.725 1.606a.75.75 0 1 0 1.256-.82C9.184 4.376 6.901 3.67 4.235 4.203A5.512 5.512 0 0 0 .02 8.942a1.501 1.501 0 0 0 1.877 1.682L9.43 8.579a.75.75 0 0 0-.392-1.448zm5.572-1.034l3.1-3.117a1.495 1.495 0 0 0-.424-2.42 5.614 5.614 0 0 0-5.86.594c-.653.49-1.115 1.169-1.412 1.975a6.623 6.623 0 0 0-.385 2.52l.005.095-.002.713a.75.75 0 0 0 1.5 0v-.769l-.004-.1a5.192 5.192 0 0 1 .294-1.941c.203-.552.502-.992.91-1.297a4.122 4.122 0 0 1 4.31-.436l.011.006a.003.003 0 0 1 0-.005L13.546 5.04a.75.75 0 1 0 1.064 1.058zm-8.38-1.82L4.28 2.16c-.002-.003-.002-.001-.003 0 .767-.148 1.56-.223 2.354-.222 1.352.126 2.617.946 3.315 2.19a.75.75 0 1 0 1.308-.735A5.829 5.829 0 0 0 6.7.44C5.743.437 4.854.521 3.98.69a1.498 1.498 0 0 0-.8 2.49l1.947 2.113a.75.75 0 0 0 1.104-1.016zM.75 24h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5z",
                name: "Giáp biển"
            },
        ],
        description: 'Nằm ở thành phố Vũng Tàu, cách Bãi Sau 550 m và Bãi Dứa 1,2 km, Vung Tau Melody Apartment cung cấp chỗ nghỉ với WiFi miễn phí và khu vực ghế ngồi.',
        votedMessage: 'Tuyệt vời',
        votedNum: 628,
        votedScore: 8.8,
        roomInfo: {
            _id: 1,
            name: "Phòng Deluxe Giường Đôi Nhìn ra quang cảnh Thành phố",
            bed: "1 giường đôi cực lớn",
            isCancle: true,
            oldPrice: "7.850.000",
            price: "3.297.000",
        }
    },
    {
        _id: 2,
        star: 1,
        banner: 'https://t-cf.bstatic.com/xdata/images/hotel/square600/273953720.webp?k=099979974a69eb9fdc2c744d3e467428b4425ba74940c783dc5c9e140e2ff04a&o=&s=1',
        name: 'Vung Tau Melody Apartment',
        place: 'Vũng Tàu',
        convenients: [
            {
                icon: "M13.165 19.747a5 5 0 0 0 2.214.503 5.39 5.39 0 0 0 3.923-1.743l-1.072.033a6.261 6.261 0 0 0 5.112 1.704.75.75 0 1 0-.184-1.488 4.761 4.761 0 0 1-3.888-1.296.75.75 0 0 0-1.072.033 3.888 3.888 0 0 1-2.83 1.257 3.498 3.498 0 0 1-1.547-.352.75.75 0 0 0-.656 1.349zm-2.78-11.309L9.618 23.2a.75.75 0 0 0 1.498.078l.767-14.761a.75.75 0 1 0-1.498-.078zM5.002 23.48L9.948 8.084a.75.75 0 1 0-1.428-.458L3.574 23.02a.75.75 0 1 0 1.428.458zM9.001 8.568l8.276 2.709a1.5 1.5 0 0 0 1.943-1.723c-.274-2.213-1.937-4.068-4.162-4.596-2.062-.413-3.71-.063-4.958.783-.545.369-.9.749-1.089 1.031l-.42.697a.75.75 0 1 0 1.287.772l.4-.667c.068-.1.293-.34.663-.592.92-.623 2.16-.886 3.797-.559a3.97 3.97 0 0 1 3.003 3.373l.009.056-.001.001-8.282-2.71a.75.75 0 0 0-.466 1.425zm.037-1.437L1.504 9.176H1.5c.2-1.74 1.417-3.116 3.056-3.509 2.084-.417 3.741.097 4.725 1.606a.75.75 0 1 0 1.256-.82C9.184 4.376 6.901 3.67 4.235 4.203A5.512 5.512 0 0 0 .02 8.942a1.501 1.501 0 0 0 1.877 1.682L9.43 8.579a.75.75 0 0 0-.392-1.448zm5.572-1.034l3.1-3.117a1.495 1.495 0 0 0-.424-2.42 5.614 5.614 0 0 0-5.86.594c-.653.49-1.115 1.169-1.412 1.975a6.623 6.623 0 0 0-.385 2.52l.005.095-.002.713a.75.75 0 0 0 1.5 0v-.769l-.004-.1a5.192 5.192 0 0 1 .294-1.941c.203-.552.502-.992.91-1.297a4.122 4.122 0 0 1 4.31-.436l.011.006a.003.003 0 0 1 0-.005L13.546 5.04a.75.75 0 1 0 1.064 1.058zm-8.38-1.82L4.28 2.16c-.002-.003-.002-.001-.003 0 .767-.148 1.56-.223 2.354-.222 1.352.126 2.617.946 3.315 2.19a.75.75 0 1 0 1.308-.735A5.829 5.829 0 0 0 6.7.44C5.743.437 4.854.521 3.98.69a1.498 1.498 0 0 0-.8 2.49l1.947 2.113a.75.75 0 0 0 1.104-1.016zM.75 24h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5z",
                name: "Giáp biển"
            },
        ],
        description: 'Nằm ở thành phố Vũng Tàu, cách Bãi Sau 550 m và Bãi Dứa 1,2 km, Vung Tau Melody Apartment cung cấp chỗ nghỉ với WiFi miễn phí và khu vực ghế ngồi.',
        votedMessage: 'Tuyệt hảo',
        votedNum: 628,
        votedScore: 9.8,
        roomInfo: {
            _id: 1,
            name: "Phòng Deluxe Giường Đôi Nhìn ra quang cảnh Thành phố",
            bed: "1 giường đôi lớn",
            isCancle: true,
            oldPrice: "1.222.500",
            price: "1.555.333",
        }
    },
    {
        _id: 3,
        star: 5,
        banner: 'https://t-cf.bstatic.com/xdata/images/hotel/square600/259018488.webp?k=b18ac001a341bf6d310459be3aa05b2430a548d01439f26ea1cd45bef1066df9&o=&s=1',
        name: 'The Shells Resort & Spa Phu Quoc',
        place: 'Vũng Tàu',
        convenients: [
            {
                icon: "M13.165 19.747a5 5 0 0 0 2.214.503 5.39 5.39 0 0 0 3.923-1.743l-1.072.033a6.261 6.261 0 0 0 5.112 1.704.75.75 0 1 0-.184-1.488 4.761 4.761 0 0 1-3.888-1.296.75.75 0 0 0-1.072.033 3.888 3.888 0 0 1-2.83 1.257 3.498 3.498 0 0 1-1.547-.352.75.75 0 0 0-.656 1.349zm-2.78-11.309L9.618 23.2a.75.75 0 0 0 1.498.078l.767-14.761a.75.75 0 1 0-1.498-.078zM5.002 23.48L9.948 8.084a.75.75 0 1 0-1.428-.458L3.574 23.02a.75.75 0 1 0 1.428.458zM9.001 8.568l8.276 2.709a1.5 1.5 0 0 0 1.943-1.723c-.274-2.213-1.937-4.068-4.162-4.596-2.062-.413-3.71-.063-4.958.783-.545.369-.9.749-1.089 1.031l-.42.697a.75.75 0 1 0 1.287.772l.4-.667c.068-.1.293-.34.663-.592.92-.623 2.16-.886 3.797-.559a3.97 3.97 0 0 1 3.003 3.373l.009.056-.001.001-8.282-2.71a.75.75 0 0 0-.466 1.425zm.037-1.437L1.504 9.176H1.5c.2-1.74 1.417-3.116 3.056-3.509 2.084-.417 3.741.097 4.725 1.606a.75.75 0 1 0 1.256-.82C9.184 4.376 6.901 3.67 4.235 4.203A5.512 5.512 0 0 0 .02 8.942a1.501 1.501 0 0 0 1.877 1.682L9.43 8.579a.75.75 0 0 0-.392-1.448zm5.572-1.034l3.1-3.117a1.495 1.495 0 0 0-.424-2.42 5.614 5.614 0 0 0-5.86.594c-.653.49-1.115 1.169-1.412 1.975a6.623 6.623 0 0 0-.385 2.52l.005.095-.002.713a.75.75 0 0 0 1.5 0v-.769l-.004-.1a5.192 5.192 0 0 1 .294-1.941c.203-.552.502-.992.91-1.297a4.122 4.122 0 0 1 4.31-.436l.011.006a.003.003 0 0 1 0-.005L13.546 5.04a.75.75 0 1 0 1.064 1.058zm-8.38-1.82L4.28 2.16c-.002-.003-.002-.001-.003 0 .767-.148 1.56-.223 2.354-.222 1.352.126 2.617.946 3.315 2.19a.75.75 0 1 0 1.308-.735A5.829 5.829 0 0 0 6.7.44C5.743.437 4.854.521 3.98.69a1.498 1.498 0 0 0-.8 2.49l1.947 2.113a.75.75 0 0 0 1.104-1.016zM.75 24h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5z",
                name: "Giáp biển"
            },
        ],
        description: 'Nằm ở thành phố Vũng Tàu, cách Bãi Sau 550 m và Bãi Dứa 1,2 km, Vung Tau Melody Apartment cung cấp chỗ nghỉ với WiFi miễn phí và khu vực ghế ngồi.',
        votedMessage: 'Tuyệt vời',
        votedNum: 628,
        votedScore: 8.6,
        roomInfo: {
            _id: 1,
            name: "Suite Luxury Nhìn ra Biển",
            bed: "1 giường đôi lớn",
            isCancle: true,
            oldPrice: "5.130.000",
            price: "3.078.000",
        }
    },
    {
        _id: 4,
        star: 3,
        banner: 'https://t-cf.bstatic.com/xdata/images/hotel/square600/283035863.webp?k=153a6d922fa5a336248a830190e1ff3d3e9ee5045c89bb7b8a69a79da0c75bef&o=&s=1',
        name: 'La Veranda Resort Phu Quoc - MGallery',
        place: 'Duong Dong, Phú Quốc',
        convenients: [
            {
                icon: "M13.165 19.747a5 5 0 0 0 2.214.503 5.39 5.39 0 0 0 3.923-1.743l-1.072.033a6.261 6.261 0 0 0 5.112 1.704.75.75 0 1 0-.184-1.488 4.761 4.761 0 0 1-3.888-1.296.75.75 0 0 0-1.072.033 3.888 3.888 0 0 1-2.83 1.257 3.498 3.498 0 0 1-1.547-.352.75.75 0 0 0-.656 1.349zm-2.78-11.309L9.618 23.2a.75.75 0 0 0 1.498.078l.767-14.761a.75.75 0 1 0-1.498-.078zM5.002 23.48L9.948 8.084a.75.75 0 1 0-1.428-.458L3.574 23.02a.75.75 0 1 0 1.428.458zM9.001 8.568l8.276 2.709a1.5 1.5 0 0 0 1.943-1.723c-.274-2.213-1.937-4.068-4.162-4.596-2.062-.413-3.71-.063-4.958.783-.545.369-.9.749-1.089 1.031l-.42.697a.75.75 0 1 0 1.287.772l.4-.667c.068-.1.293-.34.663-.592.92-.623 2.16-.886 3.797-.559a3.97 3.97 0 0 1 3.003 3.373l.009.056-.001.001-8.282-2.71a.75.75 0 0 0-.466 1.425zm.037-1.437L1.504 9.176H1.5c.2-1.74 1.417-3.116 3.056-3.509 2.084-.417 3.741.097 4.725 1.606a.75.75 0 1 0 1.256-.82C9.184 4.376 6.901 3.67 4.235 4.203A5.512 5.512 0 0 0 .02 8.942a1.501 1.501 0 0 0 1.877 1.682L9.43 8.579a.75.75 0 0 0-.392-1.448zm5.572-1.034l3.1-3.117a1.495 1.495 0 0 0-.424-2.42 5.614 5.614 0 0 0-5.86.594c-.653.49-1.115 1.169-1.412 1.975a6.623 6.623 0 0 0-.385 2.52l.005.095-.002.713a.75.75 0 0 0 1.5 0v-.769l-.004-.1a5.192 5.192 0 0 1 .294-1.941c.203-.552.502-.992.91-1.297a4.122 4.122 0 0 1 4.31-.436l.011.006a.003.003 0 0 1 0-.005L13.546 5.04a.75.75 0 1 0 1.064 1.058zm-8.38-1.82L4.28 2.16c-.002-.003-.002-.001-.003 0 .767-.148 1.56-.223 2.354-.222 1.352.126 2.617.946 3.315 2.19a.75.75 0 1 0 1.308-.735A5.829 5.829 0 0 0 6.7.44C5.743.437 4.854.521 3.98.69a1.498 1.498 0 0 0-.8 2.49l1.947 2.113a.75.75 0 0 0 1.104-1.016zM.75 24h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5z",
                name: "Giáp biển"
            },
        ],
        description: 'Nằm ở thành phố Vũng Tàu, cách Bãi Sau 550 m và Bãi Dứa 1,2 km, Vung Tau Melody Apartment cung cấp chỗ nghỉ với WiFi miễn phí và khu vực ghế ngồi.',
        votedMessage: 'Tuyệt hảo',
        votedNum: 142,
        votedScore: 9.2,
        roomInfo: {
            _id: 1,
            name: "Phòng Premier Deluxe Giường đôi Nhìn ra Biển",
            bed: "1 giường đôi lớn",
            isCancle: true,
            oldPrice: null,
            price: "3.208.597",
        }
    }
    ]

    return (
        <div className='wrapper'>
            <BreadcrumbStyled />
            <div className='wrapper__content'>
                <div className='wrapper__content__left'>
                    <FormSearch />

                    <div className='wrapper__content__left__filter'>
                        <p className='title'>Chọn lọc theo</p>
                        <FilterItem
                            title="Các bộ lọc phổ biến"
                            items={
                                [
                                    { content: "Khách sạn", num: 203 },
                                    { content: "Biệt thự", num: 7 },
                                ]
                            } />
                        <FilterItem
                            title="Xếp hạng sao"
                            items={
                                [
                                    { content: "1 sao", num: 25 },
                                    { content: "2 sao", num: 55 },
                                    { content: "3 sao", num: 115 },
                                    { content: "4 sao", num: 100 },
                                    { content: "5 sao", num: 10 },
                                ]
                            } />
                        {/* <FilterItem
                            title="Các hoạt động thú vị"
                            items={
                                [
                                    { content: "Bãi biển", num: 342 },
                                    { content: "Đi bộ đường dài", num: 114 },
                                    { content: "Khu vực bãi tắm riêng", num: 144 },
                                    { content: "Ca-nô", num: 104 },
                                    { content: "Phòng tắm chung", num: 90 },
                                    { content: "Massage", num: 55 },
                                ]} /> */}
                        <FilterItem
                            title="Điểm đánh giá của khách"
                            items={
                                [
                                    { content: "Tuyệt hảo: 9 điểm trở lên", num: 342 },
                                    { content: "Rất tốt: 8 điểm trở lên", num: 114 },
                                    { content: "Tốt: 7 điểm trở lên", num: 144 },
                                    { content: "Dễ chịu: 6 điểm trở lên", num: 104 },
                                ]} />
                        <FilterItem
                            title="Tiện nghi phòng"
                            items={
                                [
                                    { content: "Khu vực bếp", num: 342 },
                                    { content: "Phòng tắm riêng", num: 114 },
                                    { content: "Điều hòa không khí", num: 144 },
                                    { content: "Bàn làm việc", num: 104 },
                                    { content: "Bồn tắm", num: 90 },
                                ]} />
                    </div>


                </div>
                <div className='wrapper__content__right'>
                    <p className='wrapper__content__right__search-result'>Vũng Tàu: tìm thấy 606 chỗ nghỉ</p>
                    <ListHoTelOverView listHotel={listHotel} isChoosenDate />
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default MainPage;