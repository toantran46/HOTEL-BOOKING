import React from 'react';
import PropTypes from 'prop-types';

import "./SearchHotel.scss";
import InputField from 'custom-fields/InputField';
import { Link } from 'react-router-dom';
import { PLACE, ICONS } from 'constants';
SearchHotel.propTypes = {

};

function SearchHotel(props) {
    return (
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
                        <div className='form-search-tips'>
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
                            </ul>
                        </div>
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
        </div>
    );
}

export default SearchHotel;