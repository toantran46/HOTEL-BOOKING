import React from 'react';
import PropTypes from 'prop-types';
import "./ViewAllFeedBack.scss";
ViewAllFeedBack.propTypes = {

};

function ViewAllFeedBack(props) {
    return (
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
                        <div className='viewall-feedback__wrapper__main__list-feedback__feedback'>
                            <div style={{ flexBasis: "35%" }}>
                                <div >
                                    <div className='viewall-feedback__wrapper__main__list-feedback__personal-info'>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__avatar'>
                                            A
                                        </div>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info'>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__name'>Anh</div>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__location'>
                                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                                <span>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewall-feedback__wrapper__main__list-feedback__items'>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-bed_double" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 11.25V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 2.25 9v2.25a.75.75 0 0 0 1.5 0zm9 0V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 11.25 9v2.25a.75.75 0 0 0 1.5 0zm-10 .75h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>Phòng Có Giường Cỡ Queen</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-calendar" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>1 đêm ·  Tháng 3-2019</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-couple" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M8.25 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM12 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H3l-.746-.675.75 7.5A.75.75 0 0 0 3.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L9 16.5h2.25a.75.75 0 0 0 .75-.75V13.5zm-1.5 0v2.25l.75-.75H9a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 3 15H.75l.75.75V13.5a4.5 4.5 0 1 1 9 0zm9.75-9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM13.5 16.5H15l-.746-.675.75 7.5a.75.75 0 0 0 .746.675h4.5a.75.75 0 0 0 .746-.675l.75-7.5L21 16.5h2.25a.75.75 0 0 0 .75-.75V13.5a6 6 0 0 0-11.143-3.086.75.75 0 0 0 1.286.772 4.5 4.5 0 0 1 8.357 2.315v2.249l.75-.75H21a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 15 15h-1.5a.75.75 0 0 0 0 1.5z"></path></svg>
                                        <div>Cặp đôi</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex' }}>

                                <div className='viewall-feedback__wrapper__main__list-feedback__content'>
                                    <div>
                                        <div className="date">
                                            ngày 2 Tháng 5 năm 2019
                                        </div>
                                        <div className="title">Tuyệt vời</div>
                                        <div className="message">
                                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                                            Nơi lý tưởng cho một kỳ nghỉ
                                        </div>
                                        <div className='response-message'>
                                            <h6>
                                                <svg class="bk-icon -iconset-chat_bubbles c-review-block__response__icon" height="128" width="128" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56 88a62.5 62.5 0 0 1-14.8-1.8l-19.5 9.4a4 4 0 0 1-5.5-4.9l4.7-14.2A31.9 31.9 0 0 1 8 52c0-19.9 21.5-36 48-36s48 16.1 48 36-21.5 36-48 36zm58.1 1.7A24.6 24.6 0 0 0 120 74a24.2 24.2 0 0 0-4.8-14.2 46 46 0 0 1-18 27.3 68 68 0 0 1-37.4 12.8A50.2 50.2 0 0 0 80 104a51.7 51.7 0 0 0 14.3-2l20 9.6a4 4 0 0 0 5.5-4.9z"></path></svg>
                                                Phản hồi của khách sạn:</h6>
                                            <div>Thank you so much!</div>
                                        </div>
                                    </div>
                                </div>


                                <div className='score'>9,6</div>
                            </div>
                        </div>
                        <div className='viewall-feedback__wrapper__main__list-feedback__feedback'>
                            <div style={{ flexBasis: "35%" }}>
                                <div >
                                    <div className='viewall-feedback__wrapper__main__list-feedback__personal-info'>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__avatar'>
                                            A
                                        </div>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info'>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__name'>Anh</div>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__location'>
                                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                                <span>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewall-feedback__wrapper__main__list-feedback__items'>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-bed_double" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 11.25V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 2.25 9v2.25a.75.75 0 0 0 1.5 0zm9 0V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 11.25 9v2.25a.75.75 0 0 0 1.5 0zm-10 .75h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>Phòng Có Giường Cỡ Queen</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-calendar" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>1 đêm ·  Tháng 3-2019</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-couple" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M8.25 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM12 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H3l-.746-.675.75 7.5A.75.75 0 0 0 3.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L9 16.5h2.25a.75.75 0 0 0 .75-.75V13.5zm-1.5 0v2.25l.75-.75H9a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 3 15H.75l.75.75V13.5a4.5 4.5 0 1 1 9 0zm9.75-9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM13.5 16.5H15l-.746-.675.75 7.5a.75.75 0 0 0 .746.675h4.5a.75.75 0 0 0 .746-.675l.75-7.5L21 16.5h2.25a.75.75 0 0 0 .75-.75V13.5a6 6 0 0 0-11.143-3.086.75.75 0 0 0 1.286.772 4.5 4.5 0 0 1 8.357 2.315v2.249l.75-.75H21a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 15 15h-1.5a.75.75 0 0 0 0 1.5z"></path></svg>
                                        <div>Cặp đôi</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex' }}>

                                <div className='viewall-feedback__wrapper__main__list-feedback__content'>
                                    <div>
                                        <div className="date">
                                            ngày 2 Tháng 5 năm 2019
                                        </div>
                                        <div className="title">Tuyệt vời</div>
                                        <div className="message">
                                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                                            Nơi lý tưởng cho một kỳ nghỉ
                                        </div>
                                        <div className='response-message'>
                                            <h6>
                                                <svg class="bk-icon -iconset-chat_bubbles c-review-block__response__icon" height="128" width="128" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56 88a62.5 62.5 0 0 1-14.8-1.8l-19.5 9.4a4 4 0 0 1-5.5-4.9l4.7-14.2A31.9 31.9 0 0 1 8 52c0-19.9 21.5-36 48-36s48 16.1 48 36-21.5 36-48 36zm58.1 1.7A24.6 24.6 0 0 0 120 74a24.2 24.2 0 0 0-4.8-14.2 46 46 0 0 1-18 27.3 68 68 0 0 1-37.4 12.8A50.2 50.2 0 0 0 80 104a51.7 51.7 0 0 0 14.3-2l20 9.6a4 4 0 0 0 5.5-4.9z"></path></svg>
                                                Phản hồi của khách sạn:</h6>
                                            <div>Thank you so much!</div>
                                        </div>
                                    </div>
                                </div>


                                <div className='score'>9,6</div>
                            </div>
                        </div>
                        <div className='viewall-feedback__wrapper__main__list-feedback__feedback'>
                            <div style={{ flexBasis: "35%" }}>
                                <div >
                                    <div className='viewall-feedback__wrapper__main__list-feedback__personal-info'>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__avatar'>
                                            A
                                        </div>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info'>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__name'>Anh</div>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__location'>
                                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                                <span>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewall-feedback__wrapper__main__list-feedback__items'>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-bed_double" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 11.25V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 2.25 9v2.25a.75.75 0 0 0 1.5 0zm9 0V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 11.25 9v2.25a.75.75 0 0 0 1.5 0zm-10 .75h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>Phòng Có Giường Cỡ Queen</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-calendar" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>1 đêm ·  Tháng 3-2019</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-couple" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M8.25 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM12 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H3l-.746-.675.75 7.5A.75.75 0 0 0 3.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L9 16.5h2.25a.75.75 0 0 0 .75-.75V13.5zm-1.5 0v2.25l.75-.75H9a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 3 15H.75l.75.75V13.5a4.5 4.5 0 1 1 9 0zm9.75-9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM13.5 16.5H15l-.746-.675.75 7.5a.75.75 0 0 0 .746.675h4.5a.75.75 0 0 0 .746-.675l.75-7.5L21 16.5h2.25a.75.75 0 0 0 .75-.75V13.5a6 6 0 0 0-11.143-3.086.75.75 0 0 0 1.286.772 4.5 4.5 0 0 1 8.357 2.315v2.249l.75-.75H21a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 15 15h-1.5a.75.75 0 0 0 0 1.5z"></path></svg>
                                        <div>Cặp đôi</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex' }}>

                                <div className='viewall-feedback__wrapper__main__list-feedback__content'>
                                    <div>
                                        <div className="date">
                                            ngày 2 Tháng 5 năm 2019
                                        </div>
                                        <div className="title">Tuyệt vời</div>
                                        <div className="message">
                                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                                            Nơi lý tưởng cho một kỳ nghỉ
                                        </div>
                                        <div className='response-message'>
                                            <h6>
                                                <svg class="bk-icon -iconset-chat_bubbles c-review-block__response__icon" height="128" width="128" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56 88a62.5 62.5 0 0 1-14.8-1.8l-19.5 9.4a4 4 0 0 1-5.5-4.9l4.7-14.2A31.9 31.9 0 0 1 8 52c0-19.9 21.5-36 48-36s48 16.1 48 36-21.5 36-48 36zm58.1 1.7A24.6 24.6 0 0 0 120 74a24.2 24.2 0 0 0-4.8-14.2 46 46 0 0 1-18 27.3 68 68 0 0 1-37.4 12.8A50.2 50.2 0 0 0 80 104a51.7 51.7 0 0 0 14.3-2l20 9.6a4 4 0 0 0 5.5-4.9z"></path></svg>
                                                Phản hồi của khách sạn:</h6>
                                            <div>Thank you so much!</div>
                                        </div>
                                    </div>
                                </div>


                                <div className='score'>9,6</div>
                            </div>
                        </div>
                        <div className='viewall-feedback__wrapper__main__list-feedback__feedback'>
                            <div style={{ flexBasis: "35%" }}>
                                <div >
                                    <div className='viewall-feedback__wrapper__main__list-feedback__personal-info'>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__avatar'>
                                            A
                                        </div>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info'>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__name'>Anh</div>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__location'>
                                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                                <span>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewall-feedback__wrapper__main__list-feedback__items'>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-bed_double" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 11.25V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 2.25 9v2.25a.75.75 0 0 0 1.5 0zm9 0V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 11.25 9v2.25a.75.75 0 0 0 1.5 0zm-10 .75h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>Phòng Có Giường Cỡ Queen</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-calendar" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>1 đêm ·  Tháng 3-2019</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-couple" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M8.25 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM12 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H3l-.746-.675.75 7.5A.75.75 0 0 0 3.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L9 16.5h2.25a.75.75 0 0 0 .75-.75V13.5zm-1.5 0v2.25l.75-.75H9a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 3 15H.75l.75.75V13.5a4.5 4.5 0 1 1 9 0zm9.75-9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM13.5 16.5H15l-.746-.675.75 7.5a.75.75 0 0 0 .746.675h4.5a.75.75 0 0 0 .746-.675l.75-7.5L21 16.5h2.25a.75.75 0 0 0 .75-.75V13.5a6 6 0 0 0-11.143-3.086.75.75 0 0 0 1.286.772 4.5 4.5 0 0 1 8.357 2.315v2.249l.75-.75H21a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 15 15h-1.5a.75.75 0 0 0 0 1.5z"></path></svg>
                                        <div>Cặp đôi</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex' }}>

                                <div className='viewall-feedback__wrapper__main__list-feedback__content'>
                                    <div>
                                        <div className="date">
                                            ngày 2 Tháng 5 năm 2019
                                        </div>
                                        <div className="title">Tuyệt vời</div>
                                        <div className="message">
                                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                                            Nơi lý tưởng cho một kỳ nghỉ
                                        </div>
                                        <div className='response-message'>
                                            <h6>
                                                <svg class="bk-icon -iconset-chat_bubbles c-review-block__response__icon" height="128" width="128" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56 88a62.5 62.5 0 0 1-14.8-1.8l-19.5 9.4a4 4 0 0 1-5.5-4.9l4.7-14.2A31.9 31.9 0 0 1 8 52c0-19.9 21.5-36 48-36s48 16.1 48 36-21.5 36-48 36zm58.1 1.7A24.6 24.6 0 0 0 120 74a24.2 24.2 0 0 0-4.8-14.2 46 46 0 0 1-18 27.3 68 68 0 0 1-37.4 12.8A50.2 50.2 0 0 0 80 104a51.7 51.7 0 0 0 14.3-2l20 9.6a4 4 0 0 0 5.5-4.9z"></path></svg>
                                                Phản hồi của khách sạn:</h6>
                                            <div>Thank you so much!</div>
                                        </div>
                                    </div>
                                </div>


                                <div className='score'>9,6</div>
                            </div>
                        </div>
                        <div className='viewall-feedback__wrapper__main__list-feedback__feedback'>
                            <div style={{ flexBasis: "35%" }}>
                                <div >
                                    <div className='viewall-feedback__wrapper__main__list-feedback__personal-info'>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__avatar'>
                                            A
                                        </div>
                                        <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info'>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__name'>Anh</div>
                                            <div className='viewall-feedback__wrapper__main__list-feedback__personal-info__info__location'>
                                                <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                                                <span>Việt Nam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewall-feedback__wrapper__main__list-feedback__items'>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-bed_double" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 11.25V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 2.25 9v2.25a.75.75 0 0 0 1.5 0zm9 0V9a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V9a2.25 2.25 0 0 0-2.25-2.25h-6A2.25 2.25 0 0 0 11.25 9v2.25a.75.75 0 0 0 1.5 0zm-10 .75h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>Phòng Có Giường Cỡ Queen</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-calendar" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                                        <div>1 đêm ·  Tháng 3-2019</div>
                                    </div>
                                    <div className='item'>
                                        <svg class="bk-icon -streamline-couple" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M8.25 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM12 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H3l-.746-.675.75 7.5A.75.75 0 0 0 3.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L9 16.5h2.25a.75.75 0 0 0 .75-.75V13.5zm-1.5 0v2.25l.75-.75H9a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 3 15H.75l.75.75V13.5a4.5 4.5 0 1 1 9 0zm9.75-9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0zM13.5 16.5H15l-.746-.675.75 7.5a.75.75 0 0 0 .746.675h4.5a.75.75 0 0 0 .746-.675l.75-7.5L21 16.5h2.25a.75.75 0 0 0 .75-.75V13.5a6 6 0 0 0-11.143-3.086.75.75 0 0 0 1.286.772 4.5 4.5 0 0 1 8.357 2.315v2.249l.75-.75H21a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 15 15h-1.5a.75.75 0 0 0 0 1.5z"></path></svg>
                                        <div>Cặp đôi</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex' }}>

                                <div className='viewall-feedback__wrapper__main__list-feedback__content'>
                                    <div>
                                        <div className="date">
                                            ngày 2 Tháng 5 năm 2019
                                        </div>
                                        <div className="title">Tuyệt vời</div>
                                        <div className="message">
                                            · Vị trí đẹp, yên tĩnh, cực kỳ sạch sẽ
                                            Chủ nhà và nhân viên nhiệt tình, thân thiện
                                            Nơi lý tưởng cho một kỳ nghỉ
                                        </div>
                                        <div className='response-message'>
                                            <h6>
                                                <svg class="bk-icon -iconset-chat_bubbles c-review-block__response__icon" height="128" width="128" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56 88a62.5 62.5 0 0 1-14.8-1.8l-19.5 9.4a4 4 0 0 1-5.5-4.9l4.7-14.2A31.9 31.9 0 0 1 8 52c0-19.9 21.5-36 48-36s48 16.1 48 36-21.5 36-48 36zm58.1 1.7A24.6 24.6 0 0 0 120 74a24.2 24.2 0 0 0-4.8-14.2 46 46 0 0 1-18 27.3 68 68 0 0 1-37.4 12.8A50.2 50.2 0 0 0 80 104a51.7 51.7 0 0 0 14.3-2l20 9.6a4 4 0 0 0 5.5-4.9z"></path></svg>
                                                Phản hồi của khách sạn:</h6>
                                            <div>Thank you so much!</div>
                                        </div>
                                    </div>
                                </div>


                                <div className='score'>9,6</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='viewall-feedback__wrapper__icon-close'>
                    <i class="bi bi-x" />
                </div>
            </div>
        </div>
    );
}

export default ViewAllFeedBack;