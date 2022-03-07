import React from 'react';
import PropTypes from 'prop-types';

import "./ViewDetailComments.scss";
ViewDetailComments.propTypes = {

};

function ViewDetailComments(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    return (<>
        {
            isVisible &&
            <div className='view-detail-comments'>
                <div className='view-detail-comments__wrapper'>
                    <div className='view-detail-comments__wrapper__icon-close'>
                        <i class="bi bi-x-octagon-fill" />
                    </div>
                    <div className="main">
                        <div className="view-detail-comments__wrapper__left">
                            <div className='view-detail-comments__wrapper__left__avatar'>
                                A
                            </div>
                            <div className='view-detail-comments__wrapper__left__info'>
                                <div className='view-detail-comments__wrapper__left__info__name'>Anh</div>
                                <div className='view-detail-comments__wrapper__left__info__location'>
                                    <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                    <span>Việt Nam</span>
                                </div>
                            </div>
                        </div>
                        <div className='view-detail-comments__wrapper__middle'>
                            <div className="date">
                                ngày 2 Tháng 5 năm 2019
                            </div>
                            <div className="title">Tuyệt vời</div>
                            <div className="message">
                                · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                Chủ nhà và nhân viên nhiệt tình, thân thiện
                                Nơi lý tưởng cho một kỳ nghỉ
                            </div>
                        </div>
                        <div className='view-detail-comments__wrapper__score'>8,0</div>
                    </div>
                </div>
            </div>
        }

    </>
    );
}

export default ViewDetailComments;