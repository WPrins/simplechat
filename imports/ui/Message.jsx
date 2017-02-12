import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Message extends Component {
  render() {
    return (
      <li className="collection-item avatar">
         <i className="material-icons circle red">{this.props.message.username.substring(0,1)}</i> 
         <span className="text">
          : {this.props.message.text}
        </span>
      </li> 
    ); 
  }
}
 // <strong>{this.props.message.username}</strong>
Message.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  message: PropTypes.object.isRequired,
};