import React from 'react';
import PropTypes from 'prop-types';

import './NavStep.scss';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from 'features/Auth/authSlice';
NavStep.propTypes = {
    currentTab: PropTypes.number,
    setCurrentTab: PropTypes.func,
};

NavStep.defaultProps = {
    currentTab: 1,
    setCurrentTab: null,
};

function NavStep(props) {

    const { tab } = useSelector(state => state.aboutInfo);

    const [isLoading, setIsLoading] = React.useState(false);
    const [nextTab, setNextTab] = React.useState(null);

    const dispatch = useDispatch();

    const handleChangeTab = (tabNumber) => {
        setNextTab(tabNumber);
        setIsLoading(true);
        setTimeout(() => {
            dispatch(setTab({
                key: 'random',
                tab: tabNumber,
            }))
            setIsLoading(false);
        }, 500)
    }

    return (
        <div className='nav-step'>
            <ul>
                <li className={tab === 1 ? 'active' : ''} onClick={() => handleChangeTab(1)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 1 ? <Spinner size="sm" /> :
                                'Thông tin cơ bản'
                        }
                    </Link>
                </li>
                <li className={tab === 2 ? 'active' : ''} onClick={() => handleChangeTab(2)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 2 ? <Spinner size="sm" /> :
                                'Bố cục và giá'
                        }
                    </Link>
                </li>
                <li className={tab === 3 ? 'active' : ''} onClick={() => handleChangeTab(3)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 3 ? <Spinner size="sm" /> :
                                'Tiện nghi và dịch vụ'
                        }
                    </Link>
                </li>
                <li className={tab === 4 ? 'active' : ''} onClick={() => handleChangeTab(4)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 4 ? <Spinner size="sm" /> :
                                'Hình ảnh'
                        }
                    </Link>
                </li>
                <li className={tab === 5 ? 'active' : ''} onClick={() => handleChangeTab(5)}>
                    <Link to={''}>
                        {
                            isLoading && nextTab === 5 ? <Spinner size="sm" /> :
                                'Chính sách'
                        }
                    </Link>
                </li>
                <li className={tab === 6 ? 'active' : ''} onClick={() => handleChangeTab(6)}>
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