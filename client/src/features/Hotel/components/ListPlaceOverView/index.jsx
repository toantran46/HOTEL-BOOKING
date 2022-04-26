import React from 'react';
import PropTypes from 'prop-types';
import PlaceOverView from '../PlaceOverView';
import FilterLoading from '../FilterLoading';

import "./ListPlaceOverView.scss";
import { useSelector } from 'react-redux';
import { getDistanceByDate } from 'assets/globaJS';
import { Skeleton } from 'antd';

ListPlaceOverView.propTypes = {
  places: PropTypes.array,
  isChoosenDate: PropTypes.bool,
  isFiltering: PropTypes.bool,
  isFirstLoading: PropTypes.bool,
};

ListPlaceOverView.defaultProps = {
  places: [],
  isChoosenDate: false,
  isFiltering: false,
  isFirstLoading: false,
};

function ListPlaceOverView(props) {
  const { places, isChoosenDate, isFiltering, isFirstLoading } = props;

  //get data from redux
  const { placeChoosen: { _id }, returnDate, receiveDate } = useSelector(state => state.hotelInfo.homePage);

  console.log({ isFirstLoading, isFiltering })

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
      {isFirstLoading &&
        [1, 2, 3].map((i) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #eee",
              marginBottom: "1rem",
            }}
            key={i}>
            <Skeleton.Image style={{ width: "200px", height: "200px" }} />
            <Skeleton paragraph={{ rows: 5 }} style={{ marginLeft: "1rem" }} />
          </div>
        ))}
      <FilterLoading isFiltering={isFiltering && !isFirstLoading} />
    </div>
  );
}

export default ListPlaceOverView;