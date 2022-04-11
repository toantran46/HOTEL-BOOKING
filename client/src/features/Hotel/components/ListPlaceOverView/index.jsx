import React from 'react';
import PropTypes from 'prop-types';
import PlaceOverView from '../PlaceOverView';
import FilterLoading from '../FilterLoading';

import "./ListPlaceOverView.scss";

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
    return (
        <div className='list-hotel-overview'>
            {
                places?.map(place => <PlaceOverView
                    isActive={place._id === "6234068d805fd970edaba0bb"}
                    key={place._id}
                    placeInfo={place}
                    isChoosenDate={isChoosenDate} />)
            }
            <FilterLoading isFiltering={isFiltering} />
        </div>
    );
}

export default ListPlaceOverView;