import React from 'react';
import PropTypes from 'prop-types';
import "./Title.scss";

Title.propTypes = {
    main: PropTypes.string,
    sub: PropTypes.string,
};

Title.defaultProps = {
    main: '',
    sub: '',
};

function Title(props) {
    const { main, sub } = props;
    return (
        <div className='title'>
            <h4 className='main'>{main}</h4>
            <div className='sub'>{sub}</div>
        </div >
    );
}

export default Title;