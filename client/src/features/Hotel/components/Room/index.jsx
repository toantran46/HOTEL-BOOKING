import React from 'react';
import PropTypes from 'prop-types';

import "./Room.scss";
import FavouriteConvenients from '../FavouriteConvenients';
import { ICONS } from 'constants';
Room.propTypes = {

};

function Room(props) {
    const { roomInfo } = props;
    const convenients = [
        {
            icon: `<svg viewBox="0 0 128 128">
            <path d="M24 88h8v16h-8zm0-16h8V56h-8zm32 32h8V88h-8zm0-32h8V56h-8zm0-32h8V24h-8zm64 16v60a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V44a4 4 0 0 1 4-4h28V12a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v58.3l5.2-5.1a4 4 0 0 1 5.6 0l5.2 5.1V56a4 4 0 0 1 .3-1.5l8-20a4 4 0 0 1 7.4 0l8 20a4 4 0 0 1 .3 1.5zM16 112h24V48H16zm32 0h24V16H48v96zm32 0h16V81.7l-8-8-8 8zm32-55.2l-4-10-4 10V112h8z"></path>
            </svg>`,
            text: "Nhìn ra thành phố"
        },
        {
            icon: `<svg viewBox="0 0 128 128">
                    <path d="M116 112H69V80.7a10.5 10.5 0 0 0 5.5-9.2 8.5 8.5 0 0 0-.2-1.7 8.5 8.5 0 0 0 1 1.4 10.5 10.5 0 0 0 14.9-14.9 8.5 8.5 0 0 0-1.4-1 8.5 8.5 0 0 0 1.7.2 10.5 10.5 0 0 0 0-21 8.5 8.5 0 0 0-1.7.2 8.5 8.5 0 0 0 1.4-1 10.5 10.5 0 1 0-14.9-14.9 8.5 8.5 0 0 0-1 1.4 8.5 8.5 0 0 0 .2-1.7 10.5 10.5 0 1 0-21 0 8.5 8.5 0 0 0 .2 1.7 8.5 8.5 0 0 0-1-1.4 10.5 10.5 0 0 0-14.9 14.9 8.5 8.5 0 0 0 1.4 1 8.5 8.5 0 0 0-1.7-.2 10.5 10.5 0 0 0 0 21 8.5 8.5 0 0 0 1.7-.2 8.5 8.5 0 0 0-1.4 1 10.5 10.5 0 0 0 14.9 14.9 8.5 8.5 0 0 0 1-1.4 8.5 8.5 0 0 0-.2 1.7 10.5 10.5 0 0 0 5.5 9.2V112H12a4 4 0 0 0 0 8h104a4 4 0 0 0 0-8zM87.3 68.3a6.5 6.5 0 0 1-9.1 0 42 42 0 0 1-5.1-12 15.6 15.6 0 0 0 2.4-2.2 42.2 42.2 0 0 1 11.8 5 6.5 6.5 0 0 1 0 9.2zM97 45a6.5 6.5 0 0 1-6.5 6.5c-2 0-6.7-2.1-11.3-4.5a15.6 15.6 0 0 0 .4-3.3v-.9c4.4-2.3 9-4.3 11-4.3A6.5 6.5 0 0 1 97 45zM78.2 21.7a6.5 6.5 0 0 1 9.1 9.1 37 37 0 0 1-10.2 4.6 15.6 15.6 0 0 0-3.3-3.8c1.4-4.5 3.1-8.7 4.4-10zM64 12a6.5 6.5 0 0 1 6.5 6.5c0 1.7-1.7 5.8-3.8 9.9a14.7 14.7 0 0 0-5.4 0 35 35 0 0 1-3.8-10A6.5 6.5 0 0 1 64 12zm-23.3 9.7a6.5 6.5 0 0 1 9.1 0 32 32 0 0 1 4.5 9.9 15.6 15.6 0 0 0-3.4 3.8 35 35 0 0 1-10.2-4.6 6.5 6.5 0 0 1 0-9.1zM31 45a6.5 6.5 0 0 1 6.5-6.5c1.9 0 6.5 2 11 4.3v1a15.6 15.6 0 0 0 .3 3.2 38.8 38.8 0 0 1-11.3 4.5A6.5 6.5 0 0 1 31 45zm18.8 23.3a6.5 6.5 0 0 1-9.1-9.1c1.4-1.5 6.7-3.5 11.8-5a15.6 15.6 0 0 0 2.4 2.1 42.1 42.1 0 0 1-5 12zm12.7-9.1h3c2.5 4.8 5 10.2 5 12.3a6.5 6.5 0 0 1-13 0c0-2 2.5-7.4 5-12.3zM48 104q-24 0-24-24 24 0 24 24zm56-24q0 24-24 24 0-24 24-24z"></path>
                </svg>` ,
            text: 'Sân vườn'
        },
        {
            icon: ` <svg viewBox="0 0 128 128">
                        <path d="M8.7 79.2a3.8 3.8 0 0 1 5.5-1.3c21 15 34.5 9 50 2.2 14.5-6.5 30.8-13.7 53.6-1.4a4.5 4.5 0 0 1 1.8 5.9 3.9 3.9 0 0 1-5.4 2c-19.5-10.7-32.8-4.8-47 1.5-8.7 3.9-17.6 7.9-28 7.9A50 50 0 0 1 9.9 85.2a4.6 4.6 0 0 1-1.2-6zm109 15.5c-22.7-12.4-39-5-53.5 1.4-15.5 6.9-29 12.9-50-2.2a3.8 3.8 0 0 0-5.6 1.3 4.6 4.6 0 0 0 1.2 6A50 50 0 0 0 39.3 112c10.3 0 19.2-4 28-7.9 14-6.3 27.4-12.2 46.9-1.6a3.9 3.9 0 0 0 5.4-2 4.5 4.5 0 0 0-1.8-5.8zM100 56a12 12 0 1 0-12-12 12 12 0 0 0 12 12zM64.2 72c7.2-3.3 15.2-7 23.8-8.2 0 0-4-8.8-6.8-13.9l-18-29.2c-2.5-4.3-7.5-6-13.5-3.6L27.9 26a6.2 6.2 0 0 0-3.5 7.8 6 6 0 0 0 8 3.4L50 29.7a4 4 0 0 1 5 1.7l6 13.2L24 72c17.6 9.8 26.3 6.3 40.3 0z"></path>
                    </svg>` ,
            text: 'Hồ bơi ngoài trời'
        },
        {
            icon: `<svg class="bk-icon -iconset-wifi c-bh-strip__icon" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><circle cx="64" cy="100" r="12"></circle><path d="M118.3 32.7A94.9 94.9 0 0 0 64 16 94.9 94.9 0 0 0 9.7 32.7a4 4 0 1 0 4.6 6.6A87 87 0 0 1 64 24a87 87 0 0 1 49.7 15.3 4 4 0 1 0 4.6-6.6zM87.7 68.4a54.9 54.9 0 0 0-47.4 0 4 4 0 0 0 3.4 7.2 47 47 0 0 1 40.6 0 4 4 0 0 0 3.4-7.2z"></path><path d="M104 50.5a81.2 81.2 0 0 0-80 0 4 4 0 0 0 4 7 73.2 73.2 0 0 1 72 0 4 4 0 0 0 4-7z"></path></svg>`,
            text: 'Wi-Fi miễn phí'
        },
        {
            icon: `<svg viewBox="0 0 128 128">
                    <path d="M108 8H20A12 12 0 0 0 8 20v88a12 12 0 0 0 12 12h88a12 12 0 0 0 12-12V20a12 12 0 0 0-12-12zM70 76H58v24H42V28h28a24 24 0 0 1 0 48z"></path>
                </svg>` ,
            text: 'Chỗ đỗ xe miễn phí'
        },
    ]
    return (
        <>
            <tr className='room'>
                <td rowSpan={2}>
                    <div className='room__name'>Phòng Superior 2 giường đơn nhìn ra cảnh thành phố</div>
                    <div className='room__bed'>2 giường đơn</div>
                    <div className='room__about'>Với tầm nhìn ra thành phố hoặc biển, phòng giường đôi này có khu vực tiếp khách với TV thông minh màn hình phẳng 40 inch và tiện nghi pha trà/cà phê. Phòng tắm riêng đi kèm vòi sen. Đồ vệ sinh cá nhân hiệu C.O. Bigelow được cung cấp cho khách.</div>
                    <FavouriteConvenients convenients={convenients} sameColor />
                </td>
                <td>
                    {ICONS.PERSON}
                    {ICONS.PERSON}
                </td>
                <td>
                    <div className='room__price'>VND 64.014.300</div>
                    <div className='room__info'>Đã bao gồm thuế và phí</div>

                </td>
                <td>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>Miễn phí hủy</div>
                    </div>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>KHÔNG CẦN THANH TOÁN TRƯỚC –<em className='small'>thanh toán tại chỗ nghỉ</em> </div>
                    </div>
                </td>
                <td>
                    <select>
                        <option>0</option>
                        <option value="1">
                            1
                            (VND&nbsp;64.014.300)
                        </option>
                        <option value="1">
                            2
                            (VND&nbsp;64.014.300)
                        </option>
                    </select>
                </td>
            </tr>
            <tr className='room'>
                <td>
                    {ICONS.PERSON}
                </td>
                <td>
                    <div className='room__price'>VND 54.014.300</div>
                    <div className='room__info'>Đã bao gồm thuế và phí</div>

                </td>
                <td>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>Miễn phí hủy</div>
                    </div>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>KHÔNG CẦN THANH TOÁN TRƯỚC –<em className='small'>thanh toán tại chỗ nghỉ</em> </div>
                    </div>
                </td>
                <td>
                    <select>
                        <option>0</option>
                        <option value="1">
                            1
                            (VND&nbsp;64.014.300)
                        </option>
                        <option value="1">
                            2
                            (VND&nbsp;64.014.300)
                        </option>
                    </select>
                </td>
            </tr>

        </>
    );
}

export default Room;