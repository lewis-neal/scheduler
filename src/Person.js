import React, { Component } from 'react';

class Person extends Component {
  remove = () => {
    this.props.dbRef.child(this.props.id).remove();
  }

  render() {
    return (
      <tr>
        <td>
          <p className="inline">{this.props.name}</p>
        </td>
        <td>
          <div className="inline">
            <button onClick={this.remove}>Remove</button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Person;
