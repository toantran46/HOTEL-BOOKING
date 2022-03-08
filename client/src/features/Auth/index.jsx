import React from 'react';
import PropTypes from 'prop-types';

import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';

Auth.propTypes = {

};

function Auth(props) {
    return (
        <div className='auth'>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Routes>
        </div>
    );
}

export default Auth;