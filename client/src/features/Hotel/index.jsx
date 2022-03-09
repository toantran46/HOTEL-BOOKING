import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HotelDetailPage from './pages/HoTelDetailPage';
import Header from 'components/Header';
import Footer from 'components/Footer';

Hotel.propTypes = {

};


function Hotel(props) {
    return (
        <div className='hotel'>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:hotelId' element={<HotelDetailPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Hotel;