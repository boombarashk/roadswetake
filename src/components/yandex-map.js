import React, { Component } from 'react'
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';

export default class YandexMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      draggableIndex: null,
    }
  }

    render() {
    const { mapState, setOfPoints } = this.props

    return (
        <YMaps query={{
          apikey: '1576e534-4f10-4132-87f9-1288b93ed78b',
        }}>
          <Map width height="100%"
            defaultState={mapState} >

              {setOfPoints.map((point, index) => {
                const { draggableIndex } = this.state;


                let polyline = null;
                if (index < setOfPoints.length - 1 && index !== draggableIndex && index !== draggableIndex - 1) {

                  polyline = <GeoObject
                    key={[point.id, "-path"].join("")}
                    geometry={{
                      type: "LineString",
                      coordinates: [point.coords, setOfPoints[index + 1].coords ],
                      strokeWidth: 2
                    }} />
                }

                return (<React.Fragment key={index}>
                  <Placemark key={point.id}
                    properties = {{ balloonContent: point.title }}
                    onClick = {this._onBalloonClick}
                    onDragstart = {() => {this._onDragstart(index)}}
                    onDragend = {(e) => {this._onDragend(e, index)}}
                    geometry={{type: "Point", coordinates: point.coords}}
                    options={{draggable: true}}
                  />
                  {polyline}
              </React.Fragment>
              )})}



          </Map>

        </YMaps>
    )}

    _onDragstart(index) {
       this.setState({draggableIndex: index})

    }
    _onDragend(event, index){
      this.props.setCoordsAfterDrag(index, event.get('target').geometry._coordinates);

      this.setState({draggableIndex: null})
    }


    _onBalloonClick = (event) => {
        event.get('map').balloon.open(event.get('target').geometry._coordinates, event.get('target').properties.get('balloonContent'))
    };

}