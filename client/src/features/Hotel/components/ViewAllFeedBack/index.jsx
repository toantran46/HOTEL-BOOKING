import React from 'react';
import PropTypes from 'prop-types';
import "./ViewAllFeedBack.scss";
import FeedBackItem from '../FeedBackItem';
import PaginationStyled from '../PaginationStyled';
import { Select } from 'antd';
ViewAllFeedBack.propTypes = {
    setIsVisibleAllFeedBack: PropTypes.func
};

ViewAllFeedBack.defaultProps = {
    setIsVisibleAllFeedBack: null
};

function ViewAllFeedBack(props) {

    const { setIsVisibleAllFeedBack } = props;

    return (
        <div className='viewall-feedback'>
            <div className='viewall-feedback__wrapper slide-animate'>
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
                            <span>Sắp xếp đánh giá theo:</span>
                            <Select defaultValue="latest" style={{ minWidth: "150px" }} onChange={(value) => alert(value)}>
                                <Select.Option value="latest">Mới nhất</Select.Option>
                                <Select.Option value="oldest">Cũ nhất</Select.Option>
                                <Select.Option value="highest-score">Điểm cao nhất</Select.Option>
                                <Select.Option value="lowest-score">Điểm thấp nhất</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className='viewall-feedback__wrapper__main__list-feedback'>
                        <FeedBackItem />
                        <FeedBackItem />
                        <FeedBackItem />
                        <PaginationStyled />
                    </div>
                </div>
                <div onClick={() => setIsVisibleAllFeedBack(false)} className='viewall-feedback__wrapper__icon-close'>
                    <i class="bi bi-x" />
                </div>
            </div>
        </div >
    );
}

export default ViewAllFeedBack;