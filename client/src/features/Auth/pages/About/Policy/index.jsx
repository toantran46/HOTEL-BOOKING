import React from 'react';
import PropTypes from 'prop-types';
import "./Policy.scss";
import { Button, Select } from 'antd';
import SelectField from 'custom-fields/SelectField';

import { Switch } from 'antd';
import ChooseTimeGetRoom from './components/ChooseTimeGetRoom';
Policy.propTypes = {

};

function Policy(props) {

    const [cancleDate, setCancelDate] = React.useState('18:00');
    const [charge, setCharge] = React.useState('của tổng đợt lưu trú');

    const [receiveDate, setReceiveDate] = React.useState({ from: '12:00', to: '12:00' });
    const [returnDate, setReturnDate] = React.useState({ from: '00:00', to: '10:00' });

    return (
        <div className='policy'>
            <div className='box'>
                <h5>Hủy đặt phòng</h5>
                <div style={{ width: "60%" }} className="mb-3">
                    <Select
                        labelInValue
                        onChange={({ value }) => setCancelDate(value)}
                        style={{ width: "100%" }}
                        defaultValue="18:00"
                        label='Khách có thể hủy đặt phòng trước bao nhiêu ngày để được miễn phí?' name='receiveDate' options={
                            [
                                { value: "18:00", label: "Cùng ngày nhận phòng (18:00)" },
                                { value: "1 ngày" },
                                { value: "2 ngày" },
                                { value: "3 ngày" },
                                { value: "7 ngày" },
                                { value: "14 ngày" },
                            ]} />
                </div>
                <div style={{ width: "60%" }} className="mb-3">
                    <Select
                        labelInValue
                        style={{ width: "100%" }}
                        defaultValue="Của tổng đợt lưu trú"
                        label='nếu không khách sẽ phải trả 100%'
                        name='note'
                        onChange={({ value }) => setCharge(value)}
                        options={
                            [
                                { value: "của tổng đợt lưu trú" },
                                { value: "của đêm đầu tiên" },

                            ]} />
                </div>

                <div className='policy__info'>
                    <div className='policy__info__cancle-time'>
                        <i class="bi bi-bell-fill"></i>
                        Khách phải hủy trước {cancleDate} hoặc thanh toán 100% giá phòng {charge}.
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

            <ChooseTimeGetRoom
                receiveDate={receiveDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                setReceiveDate={setReceiveDate} />
            <Button className='w-75 mt-3' type='primary'>Tiếp tục</Button>
        </div>
    );
}

export default Policy;