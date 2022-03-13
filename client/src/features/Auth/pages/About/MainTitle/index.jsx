import React from 'react';
import PropTypes from 'prop-types';
import "./MainTitle.scss"
MainTitle.propTypes = {
    main: PropTypes.string,
    sub: PropTypes.string,
};

MainTitle.defaultProps = {
    main: '',
    sub: '',
};

function MainTitle(props) {
    const { main, sub } = props;
    return (
        <div className='main-title'>
            <h3 className='main-title__title'>{main}</h3>
            <p className='main-title__description'>{sub}</p>
        </div>
    );
}

export default MainTitle;