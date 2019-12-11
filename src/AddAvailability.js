import React, { Component } from 'react';
import Calendar from 'react-calendar';
import firebase from './Firebase';
import { Redirect } from 'react-router-dom';

class AddAvailability extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      dates: [],
      redirect: false,
    };

    this.dbRef = firebase.database().ref().child('sessions/' + props.match.params.id);
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

  handleDates() {
    if (typeof this.state.dates !== 'undefined' && Object.entries(this.state.dates).length > 0) {
    return (
        <ul>
          {this.state.dates.map(
            (date, id) =>
            <li onClick={this.removeDate} key={id} value={id}>{date.toDateString()}</li>
          )}
        </ul>
      );
    }

    return (<p>No dates currently selected</p>);
  }

  removeDate = (event) => {
    let index = event.currentTarget.getAttribute('value');
    let dates = this.state.dates;
    dates.splice(index, 1);
    this.setState({
      dates: dates,
    });
  }

  saveAvailability = () => {
    let person = {
      name: this.state.name,
      dates: this.state.dates.map((date) => {
        return date.toJSON();
      }),
    };

    this.dbRef.child('people').push(person);
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      let path = '/session/' + this.props.match.params.id;
      return (
        <Redirect push to={path} />
      );
    }
    return (
      <div>
        <h2>{this.state.name || "Insert Name"}</h2>
        <div className="row">
          <label>Name</label>
          <input onChange={this.changeName} type="text"></input>
        </div>
        <div className="row">
          <div className="session-div">
            <Calendar onChange={this.changeDate} value={this.state.date} />
          </div>
          <div className="session-div">
            <h3>Selected Dates</h3>
            {this.handleDates()}
          </div>
        </div>
        <button onClick={this.saveAvailability}>Save</button>
      </div>
    );
  }
}

export default AddAvailability;
