import React from 'react';
import PropTypes from 'prop-types';
import './FilterLoading.scss'

FilterLoading.propTypes = {
    isFiltering: PropTypes.bool,
};

FilterLoading.defaultProps = {
    isFiltering: false,
};

function FilterLoading(props) {

    const { isFiltering } = props;

    return (
        <div>
            {
                isFiltering &&
                <div className='filter-loading'>
                    <div className='filter-loading__main'>
                        <div className='filter-loading__main__loader'></div>
                        <div className='filter-loading__main__notif-main'>Đặt phòng trước, thanh toán khi đến nghỉ!</div>
                        <div className='filter-loading__main__notif-normal'>MIỄN PHÍ hủy đặt phòng áp dụng với hầu hết các chổ ở</div>
                    </div>
                </div>
            }
        </div>
    );
}

export default FilterLoading;