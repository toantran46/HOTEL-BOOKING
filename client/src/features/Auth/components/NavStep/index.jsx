import React from 'react';
import PropTypes from 'prop-types';

import './NavStep.scss';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
NavStep.propTypes = {
    currentTab: PropTypes.number,
    setCurrentTab: PropTypes.func,
};

NavStep.defaultProps = {
    currentTab: 1,
    setCurrentTab: null,
};

function NavStep(props) {

    const { currentTab, setCurrentTab } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const [nextTab, setNextTab] = React.useState(null);


    const handleChangeTab = (tabNumber) => {
        setNextTab(tabNumber);
        setIsLoading(true);
        setTimeout(() => {
            setCurrentTab(tabNumber);
            setIsLoading(false);
        }, 500)

    }

    return (
        <div className='nav-step'>
            <ul>
                <li className='active' onClick={() => handleChangeTab(1)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 1 ? <Spinner size="sm" /> :
                                'Thông tin cơ bản'
                        }
                    </Link>
                </li>
                <li onClick={() => handleChangeTab(2)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 2 ? <Spinner size="sm" /> :
                                'Bố cục và giá'
                        }
                    </Link>
                </li>
                <li onClick={() => handleChangeTab(3)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 3 ? <Spinner size="sm" /> :
                                'Tiện nghi và dịch vụ'
                        }
                    </Link>
                </li>
                <li onClick={() => handleChangeTab(4)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 4 ? <Spinner size="sm" /> :
                                'Hình ảnh'
                        }
                    </Link>
                </li>
                <li onClick={() => handleChangeTab(5)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 5 ? <Spinner size="sm" /> :
                                'Chính sách'
                        }
                    </Link>
                </li>
                <li onClick={() => handleChangeTab(6)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 6 ? <Spinner size="sm" /> :
                                'Thanh toán'
                        }
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavStep;