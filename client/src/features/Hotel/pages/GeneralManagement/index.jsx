import React from 'react';
import PropTypes from 'prop-types';
import "./GeneralManagement.scss";
import { Navigate, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SideBarManagement from './Components/SideBarManagement';
import Profile from './Components/Profile';
import PlaceBooked from './Components/PlaceBooked';
import PlaceSaved from './Components/PlaceSaved';
import { datPhongApi } from 'api/DatPhongApi';
GeneralManagement.propTypes = {

};

function GeneralManagement(props) {
    const [placeBooked, setPlaceBooked] = React.useState();
    const [totalPlaceBooked, setTotalPlaceBooked] = React.useState(0);
    const [pagination, setPagination] = React.useState({ page: 1, totalPage: 5, limit: 3 });

    React.useEffect(() => {
        const fetchPlaceSaved = async () => {
            try {
                const { DatPhongs, totalPage, total } = await datPhongApi.getAll({ _page: pagination.page, _limit: pagination.limit });
                setPlaceBooked(DatPhongs);
                setTotalPlaceBooked(total);
                setPagination(prev => ({ ...prev, totalPage }));
            } catch (error) {
                console.log(error);
            }
        }
        fetchPlaceSaved();
    }, [pagination.page])


    //handle change page

    const handleChangePage = page => {
        setPagination(prev => ({ ...prev, page }));
    }

    return (
        <div className='management'>
            <Row>
                <Col xs="3">
                    <SideBarManagement />
                </Col>
                <Col xs="9">
                    <div style={{ padding: '10px' }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/management/profile" replace />} />
                            <Route index path='/profile' element={<Profile />} />
                            <Route path='/booked' element={<PlaceBooked total={totalPlaceBooked} pagination={pagination} placeBooked={placeBooked} onChangePage={handleChangePage} />} />
                            <Route path='/saved' element={<PlaceSaved />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default GeneralManagement;