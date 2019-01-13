import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
// http://mycode.in.ua/js/google-maps/get-route.html


const GoogleMapReactComponent = ({ text }) => <div>{text}</div>;
const CENTER_POINT = {lat: 59.95, lng: 30.33}

export default class SimpleMap extends Component {
    /*    static propTypes = {
            center: PropTypes.array,
            zoom: PropTypes.number,
            clickKey: PropTypes.string
        }*/

    static defaultProps = {
        center: CENTER_POINT,
        zoom: 14
    };

    _onChildMouseEnter = (some) => {
        console.log("bzz", some)
    }
/*
    _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
    }*/

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: ['AIzaSyD596bu4yreQM4qh5KK_EQ3i3jVpsviwHA']}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
//                onChildClick={this._onChildClick}
                onClick={this._onChildMouseEnter}
                onGoogleApiLoaded={this.props.api.onGoogleApiLoaded}
                yesIWantToUseGoogleMapApiInternals
            >
                <GoogleMapReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text={'Kreyser Avrora'}
                />
            </GoogleMapReact>
        );
    }
}