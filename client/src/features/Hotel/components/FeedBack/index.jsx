import React from 'react';
import PropTypes from 'prop-types';
import "./FeedBack.scss";
import { ScrollToView } from 'assets/globaJS';
import Carousel from '../Carousel';
import HightLightComments from '../HightLightComments';


FeedBack.propTypes = {

};

function FeedBack(props) {

    const comments = new Array(10).fill().map(() => <HightLightComments />);

    return (
        <div className='feedback' id='feedback'>
            <div className='feedback__header'>
                <div className='feedback__header__title'>Đánh giá của khách</div>
                <a className="btn-primary" onClick={() => ScrollToView("empty-room")}>Xem phòng trống</a>
            </div>
            <div className="feedback__score-wrapper">
                <div className='score'>8,0</div>
                <div className='feedback__score-wrapper__message'>Rất tốt</div>
                <div className='feedback__score-wrapper__numVoted'>756 đánh giá</div>
                <div className='feedback__score-wrapper__readAll'>Đọc tất cả đánh giá</div>
            </div>

            <div className="wrapperSlider">
                <div className="wrapperSlider__title">Đọc xem khách yêu thích điều gì nhất:</div>
                <Carousel childrens={comments} showNum={3} />
            </div>
        </div>
    );
}

export default FeedBack;