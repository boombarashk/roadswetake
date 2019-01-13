import React, { Component } from 'react'
import GoogleMap from './components/google-map'
import TextField from './components/text-field'
import './App.css';


const AVRORA_POINT = {lat: 59.95427625347425, lng: 30.333519058227466}
const CHIZSHIK_POINT = {lat: 59.94224116699061, lng: 30.3381539154052 }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { api: {
      map: null,
      maps: null,
      defineRoute: () => {},
      renderRoute: () => {},
    } };
  }

  render() {
      //const mapState = { center: [55.76, 37.64], zoom: 4 };
    return (
      <div className="App">
        <section id="pointsList">
          <TextField/>
        </section>
        
        <GoogleMap api={{ onGoogleApiLoaded: this._onGoogleApiLoaded, ...this.state.api }} />
      </div>
    );
  }


  _onGoogleApiLoaded = ({map, maps}) => {
    this.setState({ api: {
      map,
      maps,
      defineRoute: (new maps.DirectionsService).route,
      renderRoute: new maps.DirectionsRenderer,
    } });
    
    this.onRenderRoute();
  }
  
  onRenderRoute() {
    this.state.api.defineRoute({
      origin: AVRORA_POINT,
      destination: CHIZSHIK_POINT,
      travelMode: this.state.api.maps.TravelMode.WALKING
    }, (response, status) => {
      if (status === "OK") {
            console.log(response.routes[0].legs[0].steps);
        /*  OUT OF QUOTA
        this.state.api.renderRoute.setDirections(response)
        this.state.api.renderRoute.setMap(this.state.api.map)*/
      } else {
        console.log(status)
      }
    })
  }
}

export default App;
