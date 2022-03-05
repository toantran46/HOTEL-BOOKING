import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

Hotel.propTypes = {

};


function Hotel(props) {
    return (
        <div className='hotel'>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:hotelId' element={<div>hotel detail</div>} />
            </Routes>
        </div>
    );
}

export default Hotel;