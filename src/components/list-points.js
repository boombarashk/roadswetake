import React, { Component } from 'react';
import { Throttle } from 'react-throttle';
import { THROTTLE_TIME } from "../constants";

export default class ListPoints extends Component {
  constructor(props){
    super(props);

    this._onDragend = this._onDragend.bind(this);
    this._onDragover = this._onDragover.bind(this);
  }
/*
  shouldComponentUpdate(nextProps, nextState, nextContext) {
  }*/

  render(){
    const { setOfPoints, deletePoint } = this.props;

    const listPoints = setOfPoints.map((point, index)=>{
      {/*<Throttle key={["wrap-hoc-", index].join("")}  time={ THROTTLE_TIME } handler="onDragOver">*/}
        return <li key={["item-", index].join("")} draggable="true"  onDragOver={this._onDragover}>
          {point.title}
          <button data-index={index} onClick={function(e){ deletePoint(+e.target.dataset.index);} }>Удалить</button>
        </li>
      /*</Throttle>*/});

    return  <ul>{listPoints}</ul>
  }

  _onDragend(e){
  }
  _onDragover(event){
      console.log(event.target, event.pageX, event.pageY)
  }
}