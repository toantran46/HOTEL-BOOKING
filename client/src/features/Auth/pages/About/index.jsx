import React from 'react';
import PropTypes from 'prop-types';
import HeaderAbout from 'features/Auth/components/HeaderAbout';
import NavStep from 'features/Auth/components/NavStep';
import InforBasic from './InforBasic';

import './About.scss';

import FooterAbout from 'features/Auth/components/FooterAbout';
import LayoutNPrice from './LayoutNPrice';
About.propTypes = {

};

function About(props) {
    return (
        <div className='about'>
            <HeaderAbout />
            <NavStep />
            <InforBasic />
            {/* <LayoutNPrice /> */}
            <FooterAbout />
        </div>
    );
}

export default About;