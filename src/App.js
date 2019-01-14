import React, { Component } from 'react'
import { CENTER_COORDS } from "./constants";
import YandexMap from './components/yandex-map'
import ListPoints from './components/list-points'
import TextField from './components/text-field'
import './App.css';

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
      setOfPoints: [
        {id: "000",title:"Здесь будет город-сад", coords: CENTER_COORDS},
        {id: "111",title:"Зоологический музей", coords: [59.9428936, 30.3056952]},
        {id: "222",title:"Медный всадник", coords: [59.9364444, 30.3032490]}
      ]
    }
    this._onIconClicked = this._onIconClicked.bind(this)
    this.setCoordsAfterDrag = this.setCoordsAfterDrag.bind(this)
    this.deletePoint = this.deletePoint.bind(this)
  }

  render() {

    return (
      <div className="App">
        <section className="App-handles">
          <TextField/>
          <ListPoints setOfPoints={this.state.setOfPoints} deletePoint={this.deletePoint}/>
        </section>

        <section className="App-map">
          <YandexMap
            handleClick={handleClick}
            onIconClicked={this._onIconClicked}
            setCoordsAfterDrag={this.setCoordsAfterDrag}
            {...this.state}
          />
        </section>
      </div>
    );
  }

  _onIconClicked(e) {
    const { clientX, clientY} = e.originalEvent.domEvent.originalEvent;
    //e.get('domEvent').get('pageX')
    this.setState({clickCoords: {x: clientX, y: clientY}});
      console.log(e.get('target'), clientX, clientY)
  }

  setCoordsAfterDrag(draggableIndex, coords){
    this.setState({setOfPoints: this.state.setOfPoints.map((point, index) => {
      if (index === draggableIndex) {
        point.coords = coords
      }
      return point
    })})
  }

  deletePoint(delIndex){
    this.setState({setOfPoints: this.state.setOfPoints.filter((point, index) => {return delIndex !== index})})
  }
}