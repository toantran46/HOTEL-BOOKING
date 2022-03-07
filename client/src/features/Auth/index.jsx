import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Header from './components/Header';
import Container from './components/Container';
import Page from './components/Page';
import FooterInfor from './components/FooterInfor';



Auth.propTypes = {

};

function Auth(props) {
    return (
        <div className='body'>
            <div className="content-bg">
                <Header />
                <Container />
            </div>

            <Page />
            <FooterInfor />
        </div>
    );
}

export default Auth;