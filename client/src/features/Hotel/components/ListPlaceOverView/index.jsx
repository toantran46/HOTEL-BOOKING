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
<<<<<<< HEAD
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
=======
  const { places, isChoosenDate, isFiltering } = props;
  //get data from redux
  const {
    placeChoosen: { _id },
    returnDate,
    receiveDate,
  } = useSelector((state) => state.hotelInfo.homePage);

  return (
    <div className="list-hotel-overview">
      {places.length > 0 &&
        places?.map((place) => (
          <PlaceOverView
            isActive={place._id === _id}
            key={place._id}
            placeInfo={place}
            numDate={getDistanceByDate(receiveDate, returnDate)}
            isChoosenDate={isChoosenDate}
          />
        ))}
      {places.length === 0 &&
        [1, 2, 3].map((i) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #eee",
              marginBottom: "1rem",
            }}
            key={i}
          >
            <Skeleton.Image style={{ width: "200px", height: "200px" }} />
            <Skeleton paragraph={{ rows: 5 }} style={{ marginLeft: "1rem" }} />
          </div>
        ))}
      <FilterLoading isFiltering={isFiltering} />
    </div>
  );
>>>>>>> abdf29cef5493a39b6a47803e716290ed020a369
}

export default ListPlaceOverView;