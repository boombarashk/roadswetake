import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TextField extends Component {
  static propTypes = {
    refField: PropTypes.object,
  }

  render(){
    return(
      <input className="App-input" type="text"
             ref={this.props.refField}
             placeholder="Новая точка маршрута"
             defaultValue="" />
    )
  }
}