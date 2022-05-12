import React from 'react';
import PropTypes from 'prop-types';
import "./ViewOnGoogleMap.scss";
import { GOOGLEMAP } from 'constants';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { MARKER } from 'constants';
import ShowStar from '../ShowStar';
import { getMessageByScore } from 'assets/globaJS';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
ShowGoogleMap.propTypes = {
    location: PropTypes.object,
};

ShowGoogleMap.defaultProps = {
    location: { lat: 10.337189658366952, lng: 107.08280682625144 },
};

function ShowGoogleMap(props) {
    const { location, place } = props;
    console.log({ location })
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: +parseFloat(location.lat).toFixed(3), lng: +parseFloat(location.lng).toFixed(3) }}>

            <Marker icon={{
                url: MARKER,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
                position={{ lat: location?.lat, lng: location?.lng }}>
                <InfoBox
                    options={{ closeBoxURL: '', enableEventPropagation: true }}>
                    <h6 style={{ color: "#333", fontWeight: "bold", fontSize: 14 }}>{place.name}</h6>
                </InfoBox>
            </Marker>
        </GoogleMap>
    );
}

const WrapperGoogleMap = withScriptjs(withGoogleMap(ShowGoogleMap));


function ViewOnGoogleMap(props) {
    const { location, place } = props;
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
                            place={place}
                            location={location}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API}`}
                            loadingElement={<div style={{ height: "100%" }} >đang tải</div>}
                            containerElement={<div style={{ height: "100%" }} />}
                            mapElement={<div style={{ height: "100%" }} />}
                        />

                        <div className='small-screen'>
                            <div className='small-screen-main-content'>
                                <img width={100} height={80} src={place.banner} alt='banner' />
                                <div style={{ marginLeft: "1rem" }}>
                                    <div className='title'>{place?.name}</div>
                                    <ShowStar num={place.rank} />
                                    <div style={{ display: "flex", marginTop: 3, textAlign: 'center', alignItems: "center" }} >
                                        <div className='score' style={{ marginRight: 5 }} >{parseFloat(place.mediumScore || 0).toFixed(1)}</div>
                                        <div>
                                            <div>{getMessageByScore(place.mediumScore)}</div>
                                            <div className='total-feedback'>{place.totalFeedBack || "Chưa có "} đánh giá</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ textAlign: "center" }}>
                                <div className='small-screen-footer-btn'>
                                    <button className='btn-primary' onClick={() => setIsViewAll(false)}>Chọn ngày để biết giá </button>
                                </div>
                                <div className='address'>{place.address}</div>
                            </div>
                        </div>
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