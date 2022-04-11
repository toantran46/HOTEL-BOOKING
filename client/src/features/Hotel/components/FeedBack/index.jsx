import React from 'react';
import PropTypes from 'prop-types';
import "./FeedBack.scss";
import { getMessageByScore, ScrollToView } from 'assets/globaJS';
import Carousel from '../Carousel';
import HightLightComments from '../HightLightComments';


FeedBack.propTypes = {
    setIsVisibleAllFeedBack: PropTypes.func,
    feedBack: PropTypes.object,
};

FeedBack.defaultProps = {
    setIsVisibleAllFeedBack: null,
    feedBack: { comments: [], totalFeedBack: null, mediumScore: null },
};

function FeedBack(props) {

    const { setIsVisibleAllFeedBack, feedBack } = props;

    const [topFeedBack, setTopFeedBack] = React.useState([]);

    const [content, setContent] = React.useState();



    React.useEffect(() => {
        const newTopFeedBack = feedBack?.comments.sort((a, b) => b - a);
        setTopFeedBack(newTopFeedBack);
    }, [feedBack.comments])


    React.useEffect(() => {
        const newContent = topFeedBack.map((fb) => <HightLightComments key={fb._id} feedBack={fb} />);
        setContent(newContent);
    }, [topFeedBack])



    return (
        <div className='feedback' id='feedback'>
            <div className='feedback__header'>
                <div className='feedback__header__title'>Đánh giá của khách</div>
                <a className="btn-primary" onClick={() => ScrollToView("empty-room")}>Xem phòng trống</a>
            </div>
            <div className="feedback__score-wrapper">
                <div className='score'>{parseFloat(feedBack?.mediumScore).toFixed(1)}</div>
                <div className='feedback__score-wrapper__message'>{getMessageByScore(feedBack?.mediumScore)}</div>
                <div className='feedback__score-wrapper__numVoted'>{feedBack.totalFeedBack} đánh giá</div>
                <div onClick={() => setIsVisibleAllFeedBack(true)} className='feedback__score-wrapper__readAll'>Đọc tất cả đánh giá</div>
            </div>

            <div className="wrapperSlider">
                <div className="wrapperSlider__title">Đọc xem khách yêu thích điều gì nhất:</div>
                <Carousel isPadding={true} childrens={content} showNum={3} />
            </div>
        </div>
    );
}

export default FeedBack;