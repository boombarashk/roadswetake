import React, { Component } from 'react';
import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {POINTS_CLASSNAME} from "../constants";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 0 4px 0`,
    border: isDragging ? '1px dotted' : 'transparent',
    ...draggableStyle,
});

export default class ListPoints extends Component {
    constructor(props){
        super(props);

        this._onDragEnd = this._onDragEnd.bind(this);
    }

    render(){
        const { setOfPoints, deletePoint } = this.props;

        return <DragDropContext onDragEnd={this._onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        {setOfPoints.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} className="App-item">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <span className={POINTS_CLASSNAME}>{item.title}</span>

                                        <IconButton title={"Удалить"} onClick={deletePoint} data-index={index}>
                                            <MaterialIcon icon='delete' />
                                        </IconButton>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    }

    _onDragEnd(result){
        if (!(result.destination && result.source)) {
            return;
        }

        this.props.replacePoints(result.destination.index, result.source.index)
    }
}