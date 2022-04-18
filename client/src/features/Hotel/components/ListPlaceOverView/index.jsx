import React from 'react';
import PropTypes from 'prop-types';
import PlaceOverView from '../PlaceOverView';
import FilterLoading from '../FilterLoading';

import "./ListPlaceOverView.scss";
import { useSelector } from 'react-redux';
import { getDistanceByDate } from 'assets/globaJS';

ListPlaceOverView.propTypes = {
    places: PropTypes.array,
    isChoosenDate: PropTypes.bool,
    isFiltering: PropTypes.bool,
};

ListPlaceOverView.defaultProps = {
    places: [],
    isChoosenDate: false,
    isFiltering: false
};

function ListPlaceOverView(props) {
    const { places, isChoosenDate, isFiltering } = props;

    //get data from redux
    const { placeChoosen: { _id }, returnDate, receiveDate } = useSelector(state => state.hotelInfo.homePage);

    return (
        <div className='list-hotel-overview'>
            {
                places?.map(place => <PlaceOverView
                    isActive={place._id === _id}
                    key={place._id}
                    placeInfo={place}
                    numDate={getDistanceByDate(receiveDate, returnDate)}
                    isChoosenDate={isChoosenDate} />)
            }
            <FilterLoading isFiltering={isFiltering} />
        </div>
    );
}

export default ListPlaceOverView;