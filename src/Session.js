import React, { Component } from 'react';
import AddAvailability from './AddAvailability';

class Session extends Component {
  render() {
    let id = typeof this.props.match.params.id !== 'undefined' ? this.props.match.params.id : '';
    return (
      <AddAvailability id={id} /> 
    );
  }
}

export default Session;
