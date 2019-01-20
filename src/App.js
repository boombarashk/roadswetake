import React, { Component } from 'react'
import { CENTER_COORDS, MAPCONTAINER_CLASSNAME } from "./constants";
import uniqueid from 'lodash.uniqueid'
import YandexMap from './components/yandex-map'
import ListPoints from './components/list-points'
import TextField from './components/text-field'
import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-material-icon/dist/material-icon.css';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapState: {
        center: CENTER_COORDS,
        zoom: 12,
      },
      setOfPoints: [
        {id: "000",title:"Здесь будет город-сад", coords: CENTER_COORDS},
        {id: "111",title:"Зоологический музей", coords: [59.9428936, 30.3056952]},
        {id: "222",title:"Медный всадник", coords: [59.9364444, 30.3032490]}
      ]
    }

    this.setCoordsAfterDrag = this.setCoordsAfterDrag.bind(this)
    this.addPoint = this.addPoint.bind(this)
    this.deletePoint = this.deletePoint.bind(this)
    this.replacePoints = this.replacePoints.bind(this)

    this.refField = React.createRef()
  }

  render() {

    return (
      <div className="App">
        <section className="App-handles"
          onKeyPress={(event) => {if (event.key === 'Enter'){ this.addPoint()}}} >
          <TextField refField={this.refField} />

          <IconButton  onClick={this.addPoint} title={"Добавить точку маршрута"} className="App-addBtn">
            <MaterialIcon icon='queue' />
          </IconButton>

          <ListPoints
            setOfPoints={this.state.setOfPoints}
            replacePoints = {this.replacePoints}
            deletePoint={this.deletePoint}/>
        </section>

        <section className={MAPCONTAINER_CLASSNAME}>
          <YandexMap
            setCoordsAfterDrag={this.setCoordsAfterDrag}
            {...this.state}
          />
        </section>
      </div>
    );
  }

  setCoordsAfterDrag(draggableIndex, coords){
    this.setState({setOfPoints: this.state.setOfPoints.map((point, index) => {
      if (index === draggableIndex) {
        point.coords = coords
      }
      return point
    })})
  }

  addPoint(){
    const title = this.refField.current.value.trim();
    if (title.length) {
      let copyPoints = this.state.setOfPoints.slice(0);
      copyPoints.push({
        id: uniqueid(),
        title: title,
        coords: CENTER_COORDS,
      });

      this.refField.current.value = "";

      this.setState({setOfPoints: copyPoints })
    }
  }

  deletePoint(event) {
    const delIndex = +event.target.closest("li").dataset.index
    this.setState({setOfPoints: this.state.setOfPoints.filter((point, index) => {return delIndex !== index})})
  }

  replacePoints(targetIndex, currentIndex) {
      let copyPoints = this.state.setOfPoints.slice(0);
      copyPoints.splice(targetIndex, 0, copyPoints.splice(currentIndex, 1)[0])
      this.setState({setOfPoints: copyPoints})
  }
}