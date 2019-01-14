import React, { Component } from 'react'
import { CENTER_COORDS } from "./constants";
import YandexMap from './components/yandex-map'
import TextField from './components/text-field'
import './App.css';
import Balloon from "./components/balloon";


const handleClick = (event) => {
  console.log(event, event.get('coords'))
  console.log(event.originalEvent.map.balloon.open())
};


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapState: {
        center: CENTER_COORDS,
        zoom: 12,
      },
      clickCoords: {
        x: 0,
        y: 0
      },
      setOfCoords: [CENTER_COORDS]
    }
    this._onIconClicked = this._onIconClicked.bind(this)
  }

  render() {

    return (
      <div className="App">
        <section className="App-handles">
          <TextField/>
        </section>

        <YandexMap handleClick={handleClick} onIconClicked={this._onIconClicked} {...this.state}/>
        <Balloon coords={ this.state.clickCoords }/>
      </div>
    );
  }

  _onIconClicked(e) {
    const { clientX, clientY} = e.originalEvent.domEvent.originalEvent;
    this.setState({clickCoords: {x: clientX, y: clientY}});
      console.log(e.originalEvent.target);
      console.log(clientX, clientY)
  }
}