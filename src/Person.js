import React, { Component } from 'react';

class Person extends Component {
  remove = () => {
    this.props.dbRef.child(this.props.id).remove();
  }

  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <button onClick={this.remove}>Remove</button>
      </div>
    );
  }
}

export default Person;
