import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./PlaceBooked.scss";
import Trip from '../Trip';
import PaginationStyled from 'features/Hotel/components/PaginationStyled';
import { Alert } from 'antd';
PlaceBooked.propTypes = {
    placeBooked: PropTypes.array,
    onChangePage: PropTypes.func,
    pagination: PropTypes.object,
    total: PropTypes.number,
};

PlaceBooked.defaultProps = {
    placeBooked: [],
    onChangePage: null,
    pagination: {},
    total: null,
};

function PlaceBooked(props) {
    const { placeBooked, onChangePage, pagination, total } = props;

    const handleChangePage = page => {
        if (!onChangePage) return;

        onChangePage(page);
    }

    return (
        <div className='place-booked'>
            <Title main={`Lịch sử chuyến đi (${total})`} />
            <div>
                {
                    placeBooked.length > 0 ?
                        placeBooked?.map(bookInfo => <Trip bookInfo={bookInfo} key={bookInfo._id} />)
                        : <Alert type='info' description="Bạn chưa từng đặt phòng trên LTHBooking.vn" closable showIcon />
                }
                <br />
                {
                    total > 0 &&
                    <PaginationStyled onChange={page => handleChangePage(page)} currentPage={pagination?.page} pageSize={1} totalPage={pagination?.totalPage} />
                }
            </div>
        </div>
    );
}

export default PlaceBooked;