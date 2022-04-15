import React from 'react';
import PropTypes from 'prop-types';
import "./PlaceBanner.scss";
import { PLACE, ICONS } from 'constants';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { choosePlace } from 'features/Hotel/HotelSlice';
PlaceBanner.propTypes = {
    list: PropTypes.array
};

PlaceBanner.defaultProps = {
    list: []
};

function PlaceBanner(props) {
    const { list } = props;
    const dispatch = useDispatch();

    const handleSearch = city => {
        dispatch(choosePlace({
            cityName: city.name, _idCity: city._id
        }))
    }

    return (
        <div className='place-banner'>
            <Row>
                {
                    [...list].splice(3, 2).map(city =>
                        <Col key={city._id}>
                            <Link
                                onClick={() => handleSearch(city)}
                                to="/search" className='place-banner__city'>
                                <img className='city-image' src={city.image} alt='city' />
                                <div className='place-banner__city__info'>
                                    <div>{city.name} <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>{city.total}</span>
                                </div>
                            </Link>
                        </Col>
                    )

                }
            </Row>
            <br />
            <Row>
                {
                    [...list].splice(0, 3).map(city =>
                        <Col key={city._id}>
                            <Link
                                onClick={() => handleSearch(city)}
                                to="/search" className='place-banner__city'>
                                <img className='city-image' src={city.image} alt='city' />
                                <div className='place-banner__city__info'>
                                    <div>{city.name} <img src='https://t-cf.bstatic.com/static/img/flags/24/vn/baf61f68aef5e509e90f3aee952893b6ff23fe4e.png' alt='location' /></div>
                                    <span>{city.total}</span>
                                </div>
                            </Link>
                        </Col>
                    )

                }
            </Row>
        </div>
    );
}

export default PlaceBanner;