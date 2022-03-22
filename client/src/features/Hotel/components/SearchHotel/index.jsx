import React from 'react';
import PropTypes from 'prop-types';

import "./SearchHotel.scss";
import InputField from 'custom-fields/InputField';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { ICONS } from 'constants';
import { debounce } from 'lodash';
import { Spin } from 'antd';

SearchHotel.propTypes = {

};

function SearchHotel(props) {
    const [searchValue, setSearchValue] = React.useState('');
    const [receiveDate, setReceiveDate] = React.useState();
    const [returnDate, setReturnDate] = React.useState();

    const [places, setPlaces] = React.useState([]);
    const [isFetching, setIsFetching] = React.useState(false);



    React.useEffect(() => {
        const fetchPlaces = async () => {
            setIsFetching(true);
            setPlaces([]);

            setTimeout(() => {
                setIsFetching(false);
                setPlaces([
                    { icon: ICONS.LOCATION, name: "Pull man Vũng Tàu" },
                    { icon: ICONS.LOCATION, name: "Dusit Princess" },
                    { icon: ICONS.LOCATION, name: "Vung Tau Melody Apartment" },
                    { icon: ICONS.LOCATION, name: "The Shells Resort & Spa Phu Quoc" },
                    { icon: ICONS.LOCATION, name: "La Veranda Resort Phu Quoc - MGallery" },
                ])
            }, 2000);
        }
        searchValue ? fetchPlaces() : setPlaces([]);
    }, [searchValue]);
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
                            {/* <img src='https://t-cf.bstatic.com/static/img/cross_product_index/accommodation/07ca5cacc9d77a7b50ca3c424ecd606114d9be75.svg' alt='place' /> */}
                            <SearchOutlined style={{ color: "#666" }} />
                            <><InputField
                                onChange={({ target }) => setSearchValue(target.value)}
                                placeholder='Bạn muốn đến đâu' />
                                {
                                    isFetching ? <Spin size='small' /> : searchValue ? <div className='form-search-tips'>
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
                                    </div> : ""
                                }
                            </>
                        </div>
                        <div className='search-hotel__main__form__item date'>
                            <input type='text' placeholder="Nhận phòng" onFocus={(e) => e.currentTarget.type = 'date'} onChange={({ target }) => setReceiveDate(target.value)} />
                            <span className='split'></span>
                            <input type='text' placeholder="Trả phòng" onFocus={(e) => e.currentTarget.type = 'date'} onChange={({ target }) => setReturnDate(target.value)} />
                        </div>
                        <div className='btnSearch'>
                            <Link to="/search" state={{
                                roadmap: [searchValue],
                                searchValue, receiveDate, returnDate
                            }} className='btn-primary'>Tìm</Link>
                        </div>
                    </div>


                </div>
            </div >
        </div >
    );
}

export default SearchHotel;