import React from 'react';
import PropTypes from 'prop-types';

import "./Carousel.scss";

Carousel.propTypes = {

};

function Carousel(props) {

    const { childrens, showNum } = props;
    const [currentElement, setCurrentElement] = React.useState(0);

    const [currentWidth, setCurrentWidth] = React.useState("370");

    React.useEffect(() => {
        setCurrentWidth(`calc((100% - ${(showNum - 1) * 15}px) / ${showNum} )`);
    }, [showNum])


    return (
        <div className='carousel' id='carousel'>
            <div className="carousel__inner">
                <ul className="carousel__inner__list" >
                    {childrens?.map((child, index) =>
                        <li key={index} className='carousel__inner__list__item' style={{ width: currentWidth }}>
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
                    currentElement !== childrens?.length - 3 &&
                    <a onClick={() => setCurrentElement(prev => prev !== childrens?.length - 3 ? prev + 1 : prev)} className='carousel__controls__next'>
                        <i class="bi bi-chevron-right"></i>
                    </a>
                }
            </div>
        </div>
    );
}

export default Carousel;