import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import { MdCheckCircleOutline } from "react-icons/md";

PageBody.propTypes = {

};

function
    PageBody(props) {
    return (
        <div className='wrapper'>
            <div className="wrapper__title">
                <div className="wrapper__title__bold">
                    Sự an tâm của Quý vị là ưu tiên hàng đầu của chúng tôi
                </div>
                <p>Đây là cách chúng tôi giúp Quý vị cảm thấy tự tin chào đón khách:</p>
            </div>
            <div className="wrapper__container">
                <div className="row">
                    <div className="col-sm">
                        <ul>
                            <li>
                                <div className="content">
                                    <span><MdCheckCircleOutline /></span> Thiết lập <strong>quy tắc chung</strong> mà khách phải chấp thuận trước khi đến lưu trú
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <span><MdCheckCircleOutline /></span> Yêu cầu <strong>đặt cọc đề phòng hư hại</strong> để an tâm hơn
                                </div>

                            </li>
                            <li>
                                <div className="content">
                                    <span><MdCheckCircleOutline /></span> <strong>Báo cáo hành vi sai phạm của khách</strong> nếu có vấn đề xảy ra
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <span><MdCheckCircleOutline /></span> Được <strong>hỗ trợ 24/7</strong>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <img src="https://cf.bstatic.com/psb/capla/static/media/peace-of-mind.73a348df.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default
    PageBody;