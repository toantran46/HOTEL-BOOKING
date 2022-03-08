import React from 'react';
import PropTypes from 'prop-types';
import "./ViewOnGoogleMap.scss";
import { GOOGLEMAP } from 'constants';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { MARKER } from 'constants';
ViewOnGoogleMap.propTypes = {

};


ShowGoogleMap.propTypes = {

};


function ShowGoogleMap(props) {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 10.337, lng: 107.082 }}>

            <Marker icon={{
                url: MARKER,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
                position={{ lat: 10.337189658366952, lng: 107.08280682625144 }}>

                <InfoBox
                    options={{ closeBoxURL: '', enableEventPropagation: true }}>
                    <div style={{ backgroundColor: '#FFF', color: '#000', borderRadius: '1em', padding: '0.2em 1rem', textAlign: 'center' }}>
                        Pullman Vung Tau
                    </div>
                </InfoBox>
            </Marker>
        </GoogleMap>
    );
}

const WrapperGoogleMap = withScriptjs(withGoogleMap(ShowGoogleMap));


function ViewOnGoogleMap(props) {

    const [isViewAll, setIsViewAll] = React.useState(false);

    return (
        <>
            <div className='view-on-google-map'>
                <img src={GOOGLEMAP} alt="ggmap" />
                <a onClick={() => setIsViewAll(true)} className="btn-primary">Hiển thị trên bản đồ</a>
            </div>
            {
                isViewAll &&
                <div className='viewall-on-google-map'>

                    <div className='viewall-on-google-map__content'>
                        <WrapperGoogleMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API}`}
                            loadingElement={<div style={{ height: "100%" }} >đang tải</div>}
                            containerElement={<div style={{ height: "100%" }} />}
                            mapElement={<div style={{ height: "100%" }} />}
                        />
                    </div>
                    <div onClick={() => setIsViewAll(false)} className='viewall-on-google-map__icon-close'>
                        <i class="bi bi-x" />
                    </div>
                </div>
            }
        </>
    );
}

export default ViewOnGoogleMap;