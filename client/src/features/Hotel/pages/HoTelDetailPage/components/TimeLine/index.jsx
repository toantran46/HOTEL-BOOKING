import React from 'react';
import PropTypes from 'prop-types';
import "./TimeLine.scss";
TimeLine.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number
};

TimeLine.defaultProps = {
    from: 14,
    to: 22
};

function TimeLine(props) {
    const { from, to } = props;

    return (
        <div className='timeline'>
            <div className='timeline__time' style={{ width: `calc(320/24*${to - from}px)`, marginLeft: `calc(320/24*${from}px)` }}>
                <span className='from'>{from}:00</span>
                <span className='to'>{to}:00</span>
                <div className='time-bottom'>
                    {`${from}:00  - ${to}:00`}
                </div>
            </div>
        </div>
    );
}

export default TimeLine;