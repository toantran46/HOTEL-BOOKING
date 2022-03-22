import React from 'react';
import PropTypes from 'prop-types';
import "./PlaceBanner.scss";
import { PLACE, ICONS } from 'constants';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
PlaceBanner.propTypes = {

};

function PlaceBanner(props) {
    return (
        <div className='place-banner'>
            <Row>
                <Col>
                    <Link state={
                        {
                            roadmap: ["Đà lạt"],
                            searchValue: "Đà lạt"
                        }
                    } to="/search" className='place-banner__city'>
                        <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688828.webp?k=6ff2042e10f68221007161a36c476226806abfe0a511a9104d45263cc0cedf55&o=)%20no-repeat%20center%20center;%20background-size:%20cover' alt='city' />
                        <div className='place-banner__city__info'>
                            <div>Đà lạt <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                            <span>2,144 chổ ở</span>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link
                        state={
                            {
                                roadmap: ["Đà nẵng"],
                                searchValue: "Đà nẵng"
                            }
                        }
                        to="/search" className='place-banner__city'>
                        <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688843.webp?k=cf7302d43a44850ddf8509da48c3198d4dda0aa75832b5737cc241249bf394aa&o=) no-repeat center center; background-size: cover' alt='city' />
                        <div className='place-banner__city__info'>
                            <div>Đà nẵng <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                            <span>2,144 chổ ở</span>
                        </div>
                    </Link>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Link
                        state={
                            {
                                roadmap: ["Cần Thơ"],
                                searchValue: "Cần Thơ"
                            }
                        }
                        to="/search" className='place-banner__city'>
                        <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688892.webp?k=ab98c6d1cae80333bbd3129cfeb692f9fd1b17caa359d2fb4fdf35a4160e5ccf&o=) no-repeat center center; background-size: cover;' alt='city' />
                        <div className='place-banner__city__info'>
                            <div>TP. Hồ Chí Minh <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                            <span>5,604 chổ ở</span>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link
                        state={
                            {
                                roadmap: ["Cần Thơ"],
                                searchValue: "Cần Thơ"
                            }
                        }
                        to="/search" className='place-banner__city'>
                        <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/729313.webp?k=9ea95483578f6f8deafa3ffc66812a6e3bf1ee802a32156b905fb3e8201b7eee&o=) no-repeat center center; background-size: cover;' alt='city' />
                        <div className='place-banner__city__info'>
                            <div>Cần Thơ <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                            <span>330 chổ ở</span>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link
                        state={
                            {
                                roadmap: ["Phú Quốc"],
                                searchValue: "Phú Quốc"
                            }
                        }
                        to="/search" className='place-banner__city'>
                        <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688878.webp?k=f99bc5f3a6cfdbaacddae7ce5912f1aefc40e81ecfa99682b91177df1866b883&o=) no-repeat center center; background-size: cover' alt='city' />
                        <div className='place-banner__city__info'>
                            <div>Phú Quốc <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                            <span>672 chổ ở</span>
                        </div>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceBanner;