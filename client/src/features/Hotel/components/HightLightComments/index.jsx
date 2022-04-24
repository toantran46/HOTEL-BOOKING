import React from 'react';
import PropTypes from 'prop-types';
import "./HightLightComments.scss";

HightLightComments.propTypes = {
    feedBack: PropTypes.object,
};

HightLightComments.defaultProps = {
    feedBack: {},
};

function HightLightComments(props) {
    const { feedBack } = props;

    return (
        <div className='hight-light-comments'>
            <div className='hight-light-comments__header'>
                <div className='hight-light-comments__header__avatar'>
                    {
                        feedBack?.MaKH.Avatar ? <img src={feedBack?.MaKH.Avatar} alt='avatar' width="100%" height="100%" /> : feedBack?.MaKH.HoTen?.charAt(0)?.toUpperCase()
                    }

                </div>
                <div className='hight-light-comments__header__info'>
                    <div className='hight-light-comments__header__info__name'>{feedBack.MaKH.HoTen}</div>
                    <div className='hight-light-comments__header__info__location'>
                        <img src='https://t-cf.bstatic.com/static/img/flags/16/vn/c01cbbd134a2d26589cd1c29a0572a067ec2cd07.png' alt='location' />
                        <span>Việt Nam</span>
                    </div>
                </div>
            </div>
            <div className='hight-light-comments__comment'>“{feedBack?.BinhLuan}”</div>
            {/* <div className='hight-light-comments__readmore'>Đọc thêm</div> */}
        </div>
    );
}

export default HightLightComments;