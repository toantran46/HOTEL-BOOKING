import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import "./PlaceBooked.scss";
import Trip from '../Trip';
import PaginationStyled from 'features/Hotel/components/PaginationStyled';
PlaceBooked.propTypes = {

};

function PlaceBooked(props) {
    return (
        <div className='place-booked'>
            <Title main='Lịch sử chuyến đi (3)' />
            <div>
                <Trip />
                <Trip />
                <Trip />
                <br />
                <PaginationStyled currentPage={1} pageSize={1} totalPage={4} />
            </div>
        </div>
    );
}

export default PlaceBooked;