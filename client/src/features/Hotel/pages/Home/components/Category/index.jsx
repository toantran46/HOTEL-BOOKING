import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carousel from "features/Hotel/components/Carousel";
import "./Category.scss";
import { useDispatch } from "react-redux";
import { choosePlace } from "features/Hotel/HotelSlice";
import SkeletonItem from "components/SkeletonItem";
Category.propTypes = {
  title: PropTypes.string,
  destination: PropTypes.string,
  description: PropTypes.string,
  list: PropTypes.array,
  num: PropTypes.number,
};

Category.defaultProps = {
  title: "",
  description: "",
  destination: "/search",
  list: [],
  num: 6,
};

function Category(props) {
  const { title, description, list, num, destination } = props;
  const dispatch = useDispatch();

  const handleSearch = (category) => {
    dispatch(
      choosePlace({
        cityName: category.name,
        _idCity: category._id,
      })
    );
  };
  const loading = false;
  return (
    <div className="category">
      <div className="title">{title}</div>
      <span className="description">{description}</span>
      {!loading && (
        <Carousel
          childrens={list.map((ob) => (
            <Link
              to={
                destination === "/search"
                  ? destination
                  : `${destination}${ob._id}`
              }
              onClick={() => destination === "/search" && handleSearch(ob)}
            >
              <div className="category__info">
                <img src={ob.image} alt={ob.name} />
                <div className="text">
                  <h6 className="name">{ob.name}</h6>
                  {ob.total && <span className="total">{ob.total}</span>}
                  {ob.place && <div className="place">{ob.place}</div>}
                  {ob.score && (
                    <div className="wrapper-info">
                      <div className="score">{ob.score}</div>
                      <div className="feedback-message">
                        {ob.feedBackMessage}
                      </div>
                      <div>{ob.numVoted}</div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
          showNum={num}
        />
      )}
      {loading && (
        <div style={{ display: "flex", overflow: "hidden" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonItem key={i} width={num} height="266px" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
