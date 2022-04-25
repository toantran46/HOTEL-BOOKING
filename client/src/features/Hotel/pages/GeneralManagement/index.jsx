import React from 'react';
import PropTypes from 'prop-types';
import "./GeneralManagement.scss";
import { Navigate, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SideBarManagement from './Components/SideBarManagement';
import Profile from './Components/Profile';
import PlaceBooked from './Components/PlaceBooked';
import PlaceSaved from './Components/PlaceSaved';
GeneralManagement.propTypes = {

};

function GeneralManagement(props) {
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
                            <Route path='/booked' element={<PlaceBooked />} />
                            <Route path='/saved' element={<PlaceSaved />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default GeneralManagement;