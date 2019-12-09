import React, { Component } from 'react';
import Calendar from 'react-calendar';

class AddAvailability extends Component {
state = {
    name: '',
    dates: [],
  }

  changeDate = (date) => {
    let dates = this.state.dates;
    let index = -1;
    dates.forEach((el, ind) => {
      if (el.getTime() === date.getTime()) {
        index = ind;
        return;
      }
    });
    if (index === -1) {
      this.setState({dates: [...dates, date]});
      return;
    }

    dates.splice(index, 1);
    this.setState({dates: dates});
  }

  changeName = (event) => {
    this.setState({name: event.target.value});
  };

  render() {
    return (
      <div>
        <h2>{this.state.name || "Insert Name"}</h2>
        <label>Name</label>
        <input onChange={this.changeName} type="text"></input>
        <Calendar onChange={this.changeDate} value={this.state.date} />
        <ul>
          {this.state.dates.map((date, id) => <li key={id}>{date.toDateString()}</li>)}
        </ul>
      </div>
    );
  }
}

export default AddAvailability;
