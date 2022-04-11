import React from 'react';
import PropTypes from 'prop-types';

import "./FavouriteConvenients.scss";
FavouriteConvenients.propTypes = {
    convenients: PropTypes.array,
    sameColor: PropTypes.bool
};

FavouriteConvenients.defaultProps = {
    convenients: [],
    sameColor: false
};

function FavouriteConvenients(props) {
    const { convenients, sameColor } = props;

    return (
        <div className='favourite-convenients' style={{ color: sameColor ? "#008009" : "#000" }} >
            {
                convenients?.map((convenient, index) =>
                    <div className='favourite-convenients__item' key={index}>
                        <span dangerouslySetInnerHTML={{ __html: convenient.Icon }} />
                        <span className='icon'> {convenient.TenTienNghi}</span>
                    </div>
                )
            }
        </ div>
    );
}

export default FavouriteConvenients;