import React from 'react';
import PropTypes from 'prop-types';
import HotelOverView from '../HotelOverView';
import FilterLoading from '../FilterLoading';

import "./ListHotelOverView.scss";

ListHoTelOverView.propTypes = {
    listHotel: PropTypes.array,
    isChoosenDate: PropTypes.bool
};

ListHoTelOverView.defaultProps = {
    listHotel: [],
    isChoosenDate: false
};

function ListHoTelOverView(props) {
    const { listHotel, isChoosenDate } = props;

    return (
        <div className='list-hotel-overview'>
            {
                listHotel?.map(hotel => <HotelOverView key={hotel._id} hotelInfo={hotel} isChoosenDate={isChoosenDate} />)
            }
            <FilterLoading />
        </div>
    );
}

export default ListHoTelOverView;