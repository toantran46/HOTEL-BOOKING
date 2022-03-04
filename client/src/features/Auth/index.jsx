import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Header from './components/Header';
import Container from './components/Container';



Auth.propTypes = {
    
};

function Auth(props) {
    return (
        <div className='body'>
            <Header />
            <Container/>
        </div>
    );
}

export default Auth;