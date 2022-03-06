import React from 'react';
import PropTypes from 'prop-types';

import "./ShowStar.scss";

ShowStar.propTypes = {
    num: PropTypes.number
};

ShowStar.defaultProps = {
    num: 0
};

function ShowStar(props) {
    const { num } = props;

    const [stars, setStars] = React.useState([]);

    React.useEffect(() => {
        const newStars = new Array(num).fill();
        setStars(newStars);
    }, [num])

    return (
        <div className='show-star'>
            {
                stars?.map(() => <span className='show-star__color'> <svg viewBox="0 0 24 24"><path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path></svg> </span>)
            }
        </div>
    );
}

export default ShowStar;