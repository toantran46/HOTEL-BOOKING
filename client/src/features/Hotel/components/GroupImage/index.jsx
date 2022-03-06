import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import "./GroupImage.scss";
GroupImage.propTypes = {

};

function GroupImage(props) {
    return (
        <div className='group-image'>
            <Row>
                <Col xs={4} className="group-image__left">
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/61372313.jpg?k=ad1ba75dfdf05624a25250f9c8663ef649af6de80502fffd6df3441e2c80f28b&o=&hp=1' alt='img1' />
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/61372316.jpg?k=70441b153ca865b914ff16f1641d8507cb334daa4081973ea181d5d51481e7c3&o=&hp=1' alt='img2' />
                </Col>
                <Col xs={8} className="group-image__right">
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/252174446.jpg?k=401d73b2d80ca8760e7023ad2f07686122054ab9a0d8985e660c8defa74bde4a&o=&hp=1' alt='img3' />
                </Col>
            </Row>
            <div className='group-image__list-image-bottom'>
                <div>
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/251659806.jpg?k=c1a4904a5600b386aa59cc2afe1bf29cdf4828f147278eb33e5329a5559b42d3&o=&hp=1' alt='img4' />
                </div>
                <div>
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/78136283.jpg?k=cec093e1230351491dd75c3bb912ade41810a561ee5011b085b41ecda710e7db&o=&hp=1' alt='img4' />
                </div>
                <div>
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/251659877.jpg?k=00c36793dc860b356babdf29f1b52681656a80a529772a91ff83fc58f295da15&o=&hp=1' alt='img4' />
                </div>
                <div>
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/150537669.jpg?k=b5f656be142a5abb76f98d28feac83566ddc3f5e22302b399db315698f462aec&o=&hp=1' alt='img4' />
                </div>
                <div>
                    <img src='https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/251659783.jpg?k=e0e7c917b24323dc20604b1b130f2a98fd0194172558407fd8ce8b08bc5c9847&o=&hp=1' alt='img4' />
                </div>
            </div>
        </div>
    );
}

export default GroupImage;