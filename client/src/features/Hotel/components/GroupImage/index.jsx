import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import "./GroupImage.scss";
GroupImage.propTypes = {
    images: PropTypes.array,
};
GroupImage.defaultProps = {
    images: [],
};

function GroupImage(props) {
    const { images } = props;

    return (
        <div className='group-image'>
            <Row>
                <Col xs={4} className="group-image__left">
                    <img src={images[0]} alt='img1' />
                    <img src={images[1]} alt='img2' />
                </Col>
                <Col xs={8} className="group-image__right">
                    <img src={images[2]} alt='img3' />
                </Col>
            </Row>
            <div className='group-image__list-image-bottom'>
                {
                    images.slice(3).map((img, index) =>
                        <div key={index}>
                            <img src={img} alt={`${index + 4}`} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default GroupImage;