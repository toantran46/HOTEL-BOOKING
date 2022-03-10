import React from 'react';
import PropTypes from 'prop-types';

import "./Home.scss";
import SearchHotel from 'features/Hotel/components/SearchHotel';
Home.propTypes = {

};

function Home(props) {
    return (
        <div className='home'>
            <SearchHotel />
        </div>
    );
}

export default Home;