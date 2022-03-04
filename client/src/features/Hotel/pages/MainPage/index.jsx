import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input } from 'reactstrap';

import "./styles.scss";
import { Link } from 'react-router-dom';

import { MdSearch } from "react-icons/md";
import FilterItem from 'features/Hotel/components/FilterItem';
import HotelOverView from 'features/Hotel/components/HotelOverView';
import Pagination from 'features/Hotel/components/Pagination';


MainPage.propTypes = {

};

function MainPage(props) {
    return (
        <div className='wrapper'>
            <Breadcrumb className='wrapper__breadcrumb'>
                <BreadcrumbItem className='wrapper__breadcrumb__item'>
                    <Link to="/">Trang chủ</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className='wrapper__breadcrumb__item'>
                    <Link to="/">Việt Nam</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className='wrapper__breadcrumb__item'>
                    <Link to="/">Bà Rịa - Vũng Tàu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className='wrapper__breadcrumb__item'>
                    <Link className='active' to="/">Kết quả tìm kiếm</Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <div className='wrapper__content'>
                <div className='wrapper__content__left'>
                    <div className='wrapper__content__left__form'>
                        <p>Tìm</p>
                        <Form>
                            <FormGroup>
                                <label>Tên chỗ nghỉ / điểm đến</label>
                                <Input placeholder='' name="placeName" />
                            </FormGroup>
                            <FormGroup>
                                <label>Ngày nhận phòng</label>
                                <Input type="date" name='receiveDate' />
                            </FormGroup>
                            <FormGroup>
                                <label>Ngày trả phòng</label>
                                <Input type="date" name='returnDate' />
                            </FormGroup>
                            <button className='searchBtn'>Tìm</button>
                        </Form>
                    </div>
                    <div className='wrapper__content__left__filter'>
                        <p className='title'>Chọn lọc theo</p>
                        <FilterItem title="Sức khỏe & an toàn" items={[{ content: "Các chỗ nghỉ có biện pháp đảm bảo sức khỏe và an toàn", num: 124 }]} />
                        <FilterItem
                            title="Các bộ lọc phổ biến"
                            items={
                                [
                                    { content: "Giáp biển", num: 302 },
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
                        <FilterItem
                            title="Các hoạt động thú vị"
                            items={
                                [
                                    { content: "Bãi biển", num: 342 },
                                    { content: "Đi bộ đường dài", num: 114 },
                                    { content: "Khu vực bãi tắm riêng", num: 144 },
                                    { content: "Ca-nô", num: 104 },
                                    { content: "Phòng tắm chung", num: 90 },
                                    { content: "Massage", num: 55 },
                                ]} />
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
                    <HotelOverView />
                    <HotelOverView />
                    <HotelOverView />
                    <HotelOverView />

                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default MainPage;