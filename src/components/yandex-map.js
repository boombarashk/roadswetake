import React, { Component } from 'react'
import { CENTER_COORDS } from "./../constants";
import { YMaps, Map, GeoObject } from 'react-yandex-maps';

export default class YandexMap extends Component {
  render() {
    const { handleClick, mapState } = this.props

    return (
      <section className="App-map">
        <YMaps query={{
          apikey: '1576e534-4f10-4132-87f9-1288b93ed78b',
        }}>
          <Map onClick = {handleClick}
            width
            height="100%"
            defaultState={mapState} >

              <GeoObject
                properties = {{
                                hintContent: "bzzz",
                                balloonContentHeader: "-__-",
                                balloonContentBody: "omnomnom",
                                population: 11848762
                            }}
                  onClick = {this.props.onIconClicked}
                  onDragstart = {{/* opacity old path ? */}}
                  geometry={{type: "Point", coordinates: CENTER_COORDS}}
                  options={{draggable: true}}
              />

          </Map>
        </YMaps>
      </section>
    )}
}