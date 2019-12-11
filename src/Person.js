import React, { Component } from 'react';

class Person extends Component {
  remove = () => {
    this.props.dbRef.child(this.props.id).remove();
  }

  render() {
    return (
      <div>
        <p className="inline">{this.props.name}</p>
        <div className="inline">
          <button onClick={this.remove}>Remove</button>
        </div>
      </div>
    );
  }
}

export default Person;
