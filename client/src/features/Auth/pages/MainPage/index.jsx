import React from 'react';
import PropTypes from 'prop-types';

import Header from 'features/Auth/components/Header';
import Container from 'features/Auth/components/Container';
import WarrantContent from 'features/Auth/components/WarrantContent';
import FooterInfor from 'features/Auth/components/FooterInfor';

import './MainPage.scss';

MainPage.propTypes = {

};

function MainPage(props) {
    return (
        <div className='body'>
            <div className="content-bg">
                <Header />
                <Container />
            </div>

            <WarrantContent />
            <FooterInfor />
        </div>
    );
}

export default
    MainPage;