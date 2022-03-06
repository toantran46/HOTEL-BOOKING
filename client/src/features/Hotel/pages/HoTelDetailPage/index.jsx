import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import FormSearch from 'features/Hotel/components/FormSearch';
import BreadcrumbStyled from 'features/Hotel/components/BreadcrumbStyled';

import "./HotelDetailPage.scss"
import GroupImage from 'features/Hotel/components/GroupImage';
import ShowStar from 'features/Hotel/components/ShowStar';
import Convenients from 'features/Hotel/components/Convenients';

HotelDetailPage.propTypes = {

};

function HotelDetailPage(props) {

    const { hotelId } = useParams();

    return (
        <div className='wrapper'>
            <BreadcrumbStyled />
            <div className='wrapper__content'>
                <div className='wrapper__content__left'>
                    <div className='quote'>
                        <img src='https://t-cf.bstatic.com/static/img/bpg/bpg_logo/43fb545d9c32614b87f0615a97620ad3d8685525.png' />
                        Chúng tôi luôn khớp giá
                    </div>
                    <FormSearch />
                </div>
                <div className='wrapper__content__right'>
                    <Row className='wrapper__content__right__top'>
                        <Col>
                            <a className='top-item'>
                                Thông tin & giá
                            </a>
                        </Col>
                        <Col>
                            <a className='top-item'>
                                Tiện nghi
                            </a>
                        </Col>
                        <Col>
                            <a className='top-item'>
                                Quy tắc chung
                            </a>
                        </Col>
                        <Col>
                            <a className='top-item'>
                                Đánh giá của khách (760)
                            </a>
                        </Col>
                    </Row>
                    <div className='wrapper__content__right__top-main'>
                        <div>
                            <span className='wrapper__content__right__top-main__type'>Khách sạn</span>
                            <span className='wrapper__content__right__top-main__name'>Pullman Vung Tau</span>
                            <ShowStar num={5} />
                        </div>
                        <a href="#" className="btn-primary">Đặt ngay</a>
                    </div>
                    <div className='wrapper__content__right__location'>
                        <span className='location-image' /> 15 Thi Sach, Thang Tam, Vũng Tàu, Việt Nam
                    </div>
                    <GroupImage />
                    <Convenients />
                </div>
            </div>
        </div>
    );
}

export default HotelDetailPage;