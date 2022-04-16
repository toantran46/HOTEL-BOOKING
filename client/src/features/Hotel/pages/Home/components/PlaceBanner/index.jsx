import { choosePlace } from "features/Hotel/HotelSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import SkeletonImage from "../SkeletonImage";
import "./PlaceBanner.scss";

PlaceBanner.propTypes = {
  list: PropTypes.array,
};

PlaceBanner.defaultProps = {
  list: [],
};

function PlaceBanner(props) {
  const { list } = props;
  const dispatch = useDispatch();

  const handleSearch = (city) => {
    dispatch(
      choosePlace({
        cityName: city.name,
        _idCity: city._id,
      })
    );
  };

  const loading = false;

  return (
    <div className="place-banner">
      <Row>
        {!loading &&
          [...list].splice(3, 2).map((city, index) => (
            <Col key={city._id}>
              <Link
                onClick={() => handleSearch(city)}
                to="/search"
                className="place-banner__city"
              >
                <img className="city-image" src={city.image} alt="city" />
                <div className="place-banner__city__info">
                  <div>
                    {city.name}{" "}
                    <img
                      src="https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png"
                      alt="location"
                    />
                  </div>
                  <span>{city.total}</span>
                </div>
              </Link>
            </Col>
          ))}

        {loading &&
          [1, 2].map((i) => (
            <Col key={i}>
              <SkeletonImage width="550px" height="270px" />
            </Col>
          ))}
      </Row>
      <br />
      <Row>
        {!loading &&
          [...list].splice(0, 3).map((city) => (
            <Col key={city._id}>
              <Link
                onClick={() => handleSearch(city)}
                to="/search"
                className="place-banner__city"
              >
                <img className="city-image" src={city.image} alt="city" />
                <div className="place-banner__city__info">
                  <div>
                    {city.name}{" "}
                    <img
                      src="https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png"
                      alt="location"
                    />
                  </div>
                  <span>{city.total}</span>
                </div>
              </Link>
            </Col>
          ))}

        {loading &&
          [1, 2, 3].map((i) => (
            <Col key={i}>
              <SkeletonImage width="360px" height="270px" />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default PlaceBanner;
