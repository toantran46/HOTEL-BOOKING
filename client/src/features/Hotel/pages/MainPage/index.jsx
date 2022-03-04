import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input } from 'reactstrap';

import "./styles.scss";
import { Link } from 'react-router-dom';

import { MdSearch } from "react-icons/md";
import FilterItem from 'features/Hotel/components/FilterItem';


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

                        <div className='wrapper__content__left__filter'>
                            <p>Chọn lọc theo</p>
                            <FilterItem />
                        </div>

                    </div>


                </div>
                <div className='wrapper__content__right'></div>
            </div>
        </div>
    );
}

export default MainPage;