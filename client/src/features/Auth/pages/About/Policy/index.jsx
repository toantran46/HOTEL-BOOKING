import React from 'react';
import PropTypes from 'prop-types';
import "./Policy.scss";
import { Button } from 'antd';
import SelectField from 'custom-fields/SelectField';

import { Switch } from 'antd';
Policy.propTypes = {

};

function Policy(props) {
    return (
        <div className='policy'>
            <div className='box'>
                <h5>Hủy đặt phòng</h5>
                <div style={{ width: "60%" }} className="mb-3">
                    <SelectField label='Khách có thể hủy đặt phòng trước bao nhiêu ngày để được miễn phí?' name='receiveDate' options={
                        [
                            { label: "Cùng ngày nhận phòng (18:00)", value: 0 },
                            { label: "1 ngày", value: 1 },
                            { label: "2 ngày", value: 2 },
                            { label: "3 ngày", value: 3 },
                            { label: "7 ngày", value: 7 },
                            { label: "14 ngày", value: 14 },
                        ]} />
                </div>
                <div style={{ width: "60%" }} className="mb-3">
                    <SelectField label='nếu không khách sẽ phải trả 100%' name='note' options={
                        [
                            { label: "Của tổng đợt lưu trú", value: -1 },
                            { label: "Của đêm đầu tiên", value: 1 },

                        ]} />
                </div>

                <div className='policy__info'>
                    <div className='policy__info__cancle-time'>
                        <i class="bi bi-bell-fill"></i>
                        Khách phải hủy trước 1 ngày hoặc thanh toán 100% giá phòng đêm đầu tiên.
                    </div>
                    <div className='policy__info__note'>
                        Xin lưu ý: Quý vị sẽ có thể thay đổi các chính sách của mình sau. Phần này chỉ giúp Quý vị bắt đầu.
                    </div>
                </div>
            </div>
            <div className='box mt-2 policy__insurance'>
                <div className='policy__insurance__top'>
                    <h5>Bảo hiểm đối với những đặt phòng do nhầm lẫn</h5>
                    <div>
                        <Switch />
                        <span style={{ marginLeft: 10 }}>Không</span>
                    </div>
                </div>
                <div className='policy__insurance__info'>
                    Để giúp Quý vị tiết kiệm thời gian xử lý những đặt phòng do nhầm lẫn, chúng tôi tự động miễn phí hủy cho những khách hủy trong vòng 24 giờ đầu tiên sau khi họ đặt. Quý vị có thể thay đổi khoảng thời gian này trong kênh quản lý chỗ nghỉ của mình trong tương lai.</div>
            </div>

            <div className='mt-1 policy__room-time'>
                <div className='mt-2 policy__room-time__receive'>
                    <h5>Nhận phòng</h5>
                    <div>Từ:</div>
                    <div className='time'>
                        <button className='active'>12:00</button>
                        <button>14:00</button>
                        <button>15:00</button>
                        <SelectField name='receiveDate' options={[{ label: '7h30', value: '7h30' }]} />
                    </div>
                    <div>Đến:</div>
                    <div className='time'>
                        <button className='active'>12:00</button>
                        <button>22:00</button>
                        <button>00:00</button>
                        <SelectField name='receiveDate' options={[{ label: '7h30', value: '7h30' }]} />
                    </div>
                </div>
                <div className='mt-2 policy__room-time__return'>
                    <h5>Trả phòng</h5>
                    <div>Từ:</div>
                    <div className='time'>
                        <button className='active'>00:00</button>
                        <button>10:00</button>
                        <button>12:00</button>
                        <SelectField name='receiveDate' options={[{ label: '7h30', value: '7h30' }]} />
                    </div>
                    <div>Đến:</div>
                    <div className='time'>
                        <button className='active'>10:00</button>
                        <button>11:00</button>
                        <button>12:00</button>
                        <SelectField name='receiveDate' options={[{ label: '7h30', value: '7h30' }]} />
                    </div>
                </div>
            </div>

            <Button className='w-75 mt-3' type='primary'>Tiếp tục</Button>
        </div>
    );
}

export default Policy;