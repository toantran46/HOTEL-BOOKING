import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./PlaceBooked.scss";
import Trip from '../Trip';
import PaginationStyled from 'features/Hotel/components/PaginationStyled';
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
                    placeBooked?.map(bookInfo => <Trip bookInfo={bookInfo} key={bookInfo._id} />)
                }
                <br />
                <PaginationStyled onChange={page => handleChangePage(page)} currentPage={pagination?.page} pageSize={1} totalPage={pagination?.totalPage} />
            </div>
        </div>
    );
}

export default PlaceBooked;