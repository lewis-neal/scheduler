import React, { Component } from 'react';

class Person extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <button>Remove</button>
      </div>
    );
  }
}

export default Person;
