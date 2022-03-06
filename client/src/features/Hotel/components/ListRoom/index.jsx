import React from 'react';
import PropTypes from 'prop-types';

import "./ListRoom.scss"
import Room from '../Room';

ListRoom.propTypes = {

};

function ListRoom(props) {

    return (
        <div className='list-room'>
            <table>
                <thead>
                    <th className='type'>Loại chỗ nghỉ</th>
                    <th className='suitable'>Phù hợp cho</th>
                    <th className='price'>Giá cho 25 đêm</th>
                    <th className='options'>Các lựa chọn</th>
                    <th className='chooseRoom'>Chọn phòng</th>
                </thead>
                <tbody>
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                </tbody>
            </table>
            <div className='list-room__book'>
                <div className='list-room__book__top' />
                <div className='list-room__book__container'>
                    <a className="btn-primary">Tôi sẽ đặt</a>
                    <ul>
                        <li>Xác nhận tức thời</li>
                        <li>Không cần đăng ký</li>
                        <li>Không mất phí đặt phòng hay phí thẻ tín dụng!</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default ListRoom;