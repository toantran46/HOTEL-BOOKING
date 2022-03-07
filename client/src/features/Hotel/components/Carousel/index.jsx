import React from 'react';
import PropTypes from 'prop-types';

import "./Carousel.scss";

Carousel.propTypes = {

};

function Carousel(props) {

    const { childrens } = props;
    const [currentElement, setCurrentElement] = React.useState(0);

    return (
        <div className='carousel' id='carousel'>
            <div className="carousel__inner">
                <ul className="carousel__inner__list" id='lightSlider' style={{ transform: `translate(-${currentElement * 385}px, 0px)` }}>
                    {childrens?.map((child, index) =>
                        <li key={index} className='carousel__inner__list__item'>
                            {child}
                        </li>
                    )}
                </ul>
            </div>
            <div className='carousel__controls'>
                {
                    currentElement !== 0 &&
                    <a onClick={() => setCurrentElement(prev => prev !== 0 ? prev - 1 : prev)} className='carousel__controls__prev'>
                        <i class="bi bi-chevron-left"></i>
                    </a>
                }
                {
                    currentElement !== childrens?.length - 6 &&
                    <a onClick={() => setCurrentElement(prev => prev !== childrens?.length - 3 ? prev + 1 : prev)} className='carousel__controls__next'>
                        <i class="bi bi-chevron-right"></i>
                    </a>
                }
            </div>
        </div>
    );
}

export default Carousel;