import React, { Component } from 'react';


export default class ListPoints extends Component {
    constructor(props){
        super(props);
        this.state = {
            draggableIndex: null,
        }
        this._onDrop = this._onDrop.bind(this);
        this._onDragstart = this._onDragstart.bind(this);
        this._onDragend = this._onDragend.bind(this);
        this._onDragover = this._onDragover.bind(this);
    }

    render(){
        const { setOfPoints, deletePoint } = this.props;

        const listPoints = setOfPoints.map((point, index)=>{
            return <li key={["item-", index].join("")} data-index={index} draggable
                       onDragStart={this._onDragstart}
                       onDragOver={this._onDragover}
                       onDragEnd={this._onDragend}>
                {point.title}
                <button data-index={index} onClick={function(e){ deletePoint(+e.target.dataset.index);} }>Удалить</button>
            </li>
        });

        return  <ul onDrop={this._onDrop}>{listPoints}</ul>
    }

    _onDrop(event){
        this.props.replacePoints(event.target.dataset.index, this.state.draggableIndex)
    }

    _onDragstart(event){
        //event.target.classList.add(FLYING_CLASSNAME);
        this.setState({draggableIndex: event.target.dataset.index})

    }
    _onDragend(event){
        //event.target.classList.remove(FLYING_CLASSNAME)
    }

    _onDragover = (event) => {
        event.preventDefault();
    }
}