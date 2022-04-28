import React from 'react';
import PropTypes from 'prop-types';
import "./ChooseTimeGetRoom.scss";
import SelectField from 'custom-fields/SelectField';
import { Select } from 'antd';
ChooseTimeGetRoom.propTypes = {

};

function ChooseTimeGetRoom(props) {

    const { receiveDate,
        returnDate,
        setReturnDate,
        setReceiveDate } = props;

    console.log(props);

    return (
        <div className='mt-1 choose-time-get-room__room-time'>
            <div className='mt-2 choose-time-get-room__room-time__receive'>
                <h5>Nhận phòng</h5>
                <div>Từ:</div>
                <div className='time'>
                    <button
                        onClick={() => setReceiveDate(prev => ({ ...prev, from: '12' }))}
                        className={receiveDate.from === "12" ? 'active' : ''}>12:00</button>
                    <button
                        onClick={() => setReceiveDate(prev => ({ ...prev, from: '14' }))}
                        className={receiveDate.from === "14" ? 'active' : ''}>14:00</button>
                    <button

                        onClick={() => setReceiveDate(prev => ({ ...prev, from: '15' }))}
                        className={receiveDate.from === "15" ? 'active' : ''}>15:00</button>
                    <Select
                        labelInValue
                        onChange={(value) => setReceiveDate(prev => ({ ...prev, from: value }))}
                        defaultValue='other'
                        options={[{ label: 'Khác', value: 'other' }, { value: '7h30' }]} />
                </div>
                <div>Đến:</div>
                <div className='time'>
                    <button
                        onClick={() => setReceiveDate(prev => ({ ...prev, to: '12' }))}
                        className={receiveDate.to === "12" ? 'active' : ''}>12:00</button>
                    <button
                        onClick={() => setReceiveDate(prev => ({ ...prev, to: '22' }))}
                        className={receiveDate.to === "22" ? 'active' : ''}>22:00</button>
                    <button
                        onClick={() => setReceiveDate(prev => ({ ...prev, to: '00' }))}
                        className={receiveDate.to === "00" ? 'active' : ''}>00:00</button>
                    <Select
                        onChange={(value) => setReceiveDate(prev => ({ ...prev, to: value }))}
                        defaultValue='other'
                        options={[{ label: 'Khác', value: 'other' }, { value: '7' }]} />
                </div>
            </div>
            <div className='mt-2 choose-time-get-room__room-time__return'>
                <h5>Trả phòng</h5>
                <div>Từ:</div>
                <div className='time'>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, from: '00' }))}
                        className={returnDate.from === "00" ? 'active' : ''}>00:00</button>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, from: '10' }))}
                        className={returnDate.from === "10" ? 'active' : ''}>10:00</button>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, from: '12' }))}
                        className={returnDate.from === "12" ? 'active' : ''}>12:00</button>
                    <Select
                        onClick={(value) => setReturnDate(prev => ({ ...prev, from: value }))}
                        defaultValue='other'
                        options={[{ label: 'Khác', value: 'other' }, { value: '7' }]} />
                </div>
                <div>Đến:</div>
                <div className='time'>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, to: '10' }))}
                        className={returnDate.to === "10" ? 'active' : ''}>10:00</button>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, to: '11' }))}
                        className={returnDate.to === "11" ? 'active' : ''}>11:00</button>
                    <button
                        onClick={() => setReturnDate(prev => ({ ...prev, to: '12' }))}
                        className={returnDate.to === "12" ? 'active' : ''}>12:00</button>
                    <Select
                        onClick={(value) => setReturnDate(prev => ({ ...prev, to: value }))}
                        defaultValue='other'
                        options={[{ label: 'Khác', value: 'other' }, { value: '7' }]} />
                </div>
            </div>
        </div>
    );
}

export default ChooseTimeGetRoom;