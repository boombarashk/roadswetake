import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { THROTTLE_TIME } from "../constants";

export default class ListPoints extends Component {
  constructor(props){
    super(props);

    this._onDragend = this._onDragend.bind(this);
    this._onDragover = this._onDragover.bind(this);
    this._onDragoverThrottle = throttle(this._onDragoverThrottle, THROTTLE_TIME);
  }

  render(){
    const { setOfPoints, deletePoint } = this.props;

    const listPoints = setOfPoints.map((point, index)=>{
        return <li key={["item-", index].join("")} draggable="true"
                   onDragOver={this._onDragover}
                   onDragEnd={this._onDragend}>
          {point.title}
          <button data-index={index} onClick={function(e){ deletePoint(+e.target.dataset.index);} }>Удалить</button>
        </li>
    });

    return  <ul>{listPoints}</ul>
  }

  _onDragend(event){
    console.log(event.target, event.pageX, event.pageY)
  }

  _onDragover = (event) => {
      this._onDragoverThrottle({
          target: event.target,
          pageX: event.pageX,
          pageY: event.pageY,
      })
  }

  _onDragoverThrottle(pageCoords){
    console.log(pageCoords)
  }
}