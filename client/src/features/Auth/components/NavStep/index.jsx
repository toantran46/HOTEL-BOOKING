import React from 'react';
import PropTypes from 'prop-types';

import './NavStep.scss';
import { Link } from 'react-router-dom';
NavStep.propTypes = {

};

function NavStep(props) {
    return (
        <div className='nav-step'>
            <ul>
                <li>
                    <Link to={''}>
                        Thông tin cơ bản
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        Bố cục và giá
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        Tiện nghi và dịch vụ
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        Hình ảnh
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        Chính sách
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        Thanh toán
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavStep;