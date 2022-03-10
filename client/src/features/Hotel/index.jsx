import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HotelDetailPage from './pages/HoTelDetailPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Home from './pages/Home';

Hotel.propTypes = {

};


function Hotel(props) {
    return (
        <div className='wrapper-hotel'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<MainPage />} />
                <Route path='/:hotelId' element={<HotelDetailPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Hotel;