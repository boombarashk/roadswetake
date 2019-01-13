import React, {Component} from 'react'

class TextField extends Component {
    render(){
        return(
            <input name="pointname" className="App-input" type="text" 
                   placeholder="Новая точка маршрута"
                   value="" />
        )
    }
}

export default TextField