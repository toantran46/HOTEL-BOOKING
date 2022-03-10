import React from 'react';
import PropTypes from 'prop-types';

import "./SearchHotel.scss";
import InputField from 'custom-fields/InputField';
import { Link } from 'react-router-dom';
import { PLACE, ICONS } from 'constants';
import { Col, Row } from 'reactstrap';
import Carousel from '../Carousel';
SearchHotel.propTypes = {

};

function SearchHotel(props) {

    const placeType = new Array(4).fill();

    return (
        <div>
            <div className='search-hotel'>
                <div className='search-hotel__main'>
                    <div className='search-hotel__main__title'>
                        Tìm chỗ nghỉ tiếp theo
                    </div>
                    <div className='search-hotel__main__description'>
                        Tìm ưu đãi Genius đặc biệt tại khắp nơi trên thế giới!
                    </div>
                    <div className='search-hotel__main__form'>
                        <div className='search-hotel__main__form__item form-search'>
                            <img src='https://t-cf.bstatic.com/static/img/cross_product_index/accommodation/07ca5cacc9d77a7b50ca3c424ecd606114d9be75.svg' alt='place' />
                            <InputField placeholder='Bạn muốn đến đâu' />
                            {/* <div className='form-search-tips'>
                            <p>Điểm đến được ưa thích gần đây</p>
                            <ul>
                                <li className='place'>
                                    <div className='icon'>
                                        {ICONS.LOCATION}
                                    </div>
                                    <div>
                                        <div className='place-name'> Cần Thơ</div>
                                        <span>Việt Nam</span>
                                    </div>
                                </li>
                                <li className='place'>
                                    <div className='icon'>
                                        {ICONS.LOCATION}
                                    </div>
                                    <div>
                                        <div className='place-name'> Cần Thơ</div>
                                        <span>Việt Nam</span>
                                    </div>
                                </li>
                                <li className='place'>
                                    <div className='icon'>
                                        {ICONS.LOCATION}
                                    </div>
                                    <div>
                                        <div className='place-name'> Cần Thơ</div>
                                        <span>Việt Nam</span>
                                    </div>
                                </li>
                                <li className='place'>
                                    <div className='icon'>
                                        {ICONS.LOCATION}
                                    </div>
                                    <div>
                                        <div className='place-name'> Cần Thơ</div>
                                        <span>Việt Nam</span>
                                    </div>
                                </li>
                                <li className='place'>
                                    <div className='icon'>
                                        {ICONS.LOCATION}
                                    </div>
                                    <div>
                                        <div className='place-name'> Cần Thơ</div>
                                        <span>Việt Nam</span>
                                    </div>
                                </li>
                            </ul> */}
                            {/* </div> */}
                        </div>
                        <div className='search-hotel__main__form__item date'>
                            <input type='text' placeholder="Nhận phòng" onFocus={(e) => e.currentTarget.type = 'date'} />
                            <span className='split'></span>
                            <input type='text' placeholder="Trả phòng" onFocus={(e) => e.currentTarget.type = 'date'} />
                        </div>
                        <div className='btnSearch'>
                            <Link to="/search" className='btn-primary'>Tìm</Link>
                        </div>
                    </div>


                </div>
            </div >
            <div className='search-hotel__main__container'>
                <div>
                    <Row>
                        <Col>
                            <Link to="/search" className='search-hotel__main__container__city'>
                                <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688828.webp?k=6ff2042e10f68221007161a36c476226806abfe0a511a9104d45263cc0cedf55&o=)%20no-repeat%20center%20center;%20background-size:%20cover' alt='city' />
                                <div className='search-hotel__main__container__city__info'>
                                    <div>Đà lạt <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>2,144 chổ ở</span>
                                </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/search" className='search-hotel__main__container__city'>
                                <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688843.webp?k=cf7302d43a44850ddf8509da48c3198d4dda0aa75832b5737cc241249bf394aa&o=) no-repeat center center; background-size: cover' alt='city' />
                                <div className='search-hotel__main__container__city__info'>
                                    <div>Đà nẵng <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>2,144 chổ ở</span>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Link to="/search" className='search-hotel__main__container__city'>
                                <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688892.webp?k=ab98c6d1cae80333bbd3129cfeb692f9fd1b17caa359d2fb4fdf35a4160e5ccf&o=) no-repeat center center; background-size: cover;' alt='city' />
                                <div className='search-hotel__main__container__city__info'>
                                    <div>TP. Hồ Chí Minh <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>5,604 chổ ở</span>
                                </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/search" className='search-hotel__main__container__city'>
                                <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/729313.webp?k=9ea95483578f6f8deafa3ffc66812a6e3bf1ee802a32156b905fb3e8201b7eee&o=) no-repeat center center; background-size: cover;' alt='city' />
                                <div className='search-hotel__main__container__city__info'>
                                    <div>Cần Thơ <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>330 chổ ở</span>
                                </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/search" className='search-hotel__main__container__city'>
                                <img className='city-image' src='https://t-cf.bstatic.com/xdata/images/city/540x270/688878.webp?k=f99bc5f3a6cfdbaacddae7ce5912f1aefc40e81ecfa99682b91177df1866b883&o=) no-repeat center center; background-size: cover' alt='city' />
                                <div className='search-hotel__main__container__city__info'>
                                    <div>Phú Quốc <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>672 chổ ở</span>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </div>


                <div className='search-hotel__main__container__category'>
                    <div className='find-what'>Tìm theo loại chổ nghĩ</div>
                    <Carousel childrens={
                        new Array(10).fill().map(() =>
                            <Link to="/search">
                                <div className='search-hotel__main__container__category__info'>
                                    <img src='https://t-cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=' alt='hotel' />
                                    <div className='text'>
                                        <h6 className='title'>Khách sạn</h6>
                                        <span>844,552 khách sạn</span>
                                    </div>
                                </div></Link>)
                    } showNum={6} />
                </div>


                <div className='search-hotel__main__container__category'>
                    <div className='find-what'>Khám phá Việt Nam</div>
                    <span className='description'>Các điểm đến phổ biến này có nhiều điều chờ đón bạn</span>
                    <Carousel childrens={
                        new Array(10).fill().map(() =>
                            <Link to="/search">
                                <div className='search-hotel__main__container__category__info'>
                                    <img src='https://t-cf.bstatic.com/xdata/images/city/square250/688956.webp?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=' alt='hotel' />
                                    <div className='text'>
                                        <h6 className='title'>Vũng Tàu</h6>
                                        <span>1,821 chổ nghỉ</span>
                                    </div>
                                </div></Link>)
                    } showNum={6} />
                </div>
                <div className='search-hotel__main__container__category'>
                    <div className='find-what'>Khách sạn mà khách yêu thích</div>
                    <Carousel childrens={
                        new Array(10).fill().map(() =>
                            <Link to="/search">
                                <div className='search-hotel__main__container__category__info'>
                                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max500/74529578.jpg?k=a7fcefd47d7271daf44f6ce78a215b9505f9f8e5cac3af093b78b9c489fd8461&o=' alt='hotel' />
                                    <div className='text'>
                                        <h6 className='title'>Sugar Loft Apartments</h6>
                                        <div>Rio de Janeiro</div>
                                        <div className='wrapper-info'>
                                            <div className='score'>9,0</div>
                                            <div className='feedback-message'>Tuyệt hảo</div>
                                            <div>296 đánh giá</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>)
                    } showNum={4} />
                </div>
                <br />
                <br />

            </div>
        </div >
    );
}

export default SearchHotel;