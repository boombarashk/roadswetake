import React, { Component } from 'react';
import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import { FLYING_CLASSNAME } from "../constants";

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
                       className="App-item"
                       onDragStart={this._onDragstart}
                       onDragOver={this._onDragover}
                       onDragEnd={this._onDragend}>
                {point.title}

                <IconButton title={"Удалить"} onClick={deletePoint}>
                    <MaterialIcon icon='delete' />
                </IconButton>
            </li>
        });

        return  <ul onDrop={this._onDrop} className="App-listPoints">{listPoints}</ul>
    }

    _onDrop(event){
        this.props.replacePoints(event.target.dataset.index, this.state.draggableIndex)
    }

    _onDragstart(event){
        event.target.classList.add(FLYING_CLASSNAME);
        this.setState({draggableIndex: event.target.dataset.index})

    }
    _onDragend(event){
        event.target.classList.remove(FLYING_CLASSNAME)
    }

    _onDragover = (event) => {
        event.preventDefault();
    }
}