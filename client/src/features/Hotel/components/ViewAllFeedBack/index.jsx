import React from 'react';
import PropTypes from 'prop-types';
import "./ViewAllFeedBack.scss";
import FeedBackItem from '../FeedBackItem';
ViewAllFeedBack.propTypes = {

};

function ViewAllFeedBack(props) {
    const [isVisible, setIsVisible] = React.useState(false);



    return (<>
        {
            isVisible &&
            <div className='viewall-feedback'>

                <div className='viewall-feedback__wrapper'>
                    <div className='viewall-feedback__wrapper__top'>

                        <div className='viewall-feedback__wrapper__top__left'>
                            <div className='score custom-score'>8,4</div>
                            <div className='numVoted'>
                                <div>Rất tốt</div>
                                <span>158 đánh giá</span>
                            </div>
                            <div className='info'>Trải nghiệm từ khách thật 100% </div>
                        </div>
                        <a className="btn-primary-outline">Viết đánh giá</a>
                    </div>
                    <div className='viewall-feedback__wrapper__main'>
                        <div className='viewall-feedback__wrapper__main__header'>
                            <h6>Đánh giá của khách</h6>
                            <div className='viewall-feedback__wrapper__main__header__right'>
                                <span>Sắp xếp đánh giá theo:</span><select>
                                    <option>Mới nhất</option>
                                    <option>Cũ nhất</option>
                                    <option>Điểm cao nhất</option>
                                    <option>Điểm thấp nhất</option>
                                </select>
                            </div>
                        </div>
                        <div className='viewall-feedback__wrapper__main__list-feedback'>
                            <FeedBackItem />
                            <FeedBackItem />
                            <FeedBackItem />
                        </div>
                    </div>
                    <div className='viewall-feedback__wrapper__icon-close'>
                        <i class="bi bi-x" />
                    </div>
                </div>
            </div>
        }
    </>
    );
}

export default ViewAllFeedBack;