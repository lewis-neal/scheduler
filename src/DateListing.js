import React, { Component } from 'react';

class DateListing extends Component {
  render() {
    return (
      <tr>
        <td>
          <p className="inline">{this.props.date.toDateString()}</p>
        </td>
        <td>
          <div className="inline">
            <button onClick={this.props.handleClick} value={this.props.id}>Remove</button>
          </div>
        </td>
      </tr>
    );
  }
}

export default DateListing;
