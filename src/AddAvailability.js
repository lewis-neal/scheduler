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

  backToSession = () => {
    this.setState({
      redirect: true,
    });
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
        <div>
          <button onClick={this.removeAllDates}>Remove All</button>
          <ul>
            {this.state.dates.map(
              (date, id) =>
              <li key={id}>{date.toDateString()} <button onClick={this.removeDate} value={id}>Remove</button></li>
            )}
          </ul>
        </div>
      );
    }

    return (<p>No dates currently selected</p>);
  }

  removeAllDates = () => {
    this.setState({
      dates: []
    });
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
    let path = '/session/' + this.props.match.params.id;
    if (this.state.redirect) {
      return (
        <Redirect push to={path} />
      );
    }
    return (
      <div>
        <h2>{this.state.name || "Insert Name"}</h2>
        <div className="availability-top">
          <label className="availability-label">Name</label>
          <input className="availability-text" onChange={this.changeName} type="text"></input>
          <button className="availability-save" onClick={this.saveAvailability}>Save</button>
          <button onClick={this.backToSession}>Cancel</button>
        </div>
        <div>
          <div className="session-div">
            <h3>Dates</h3>
            <Calendar onChange={this.changeDate} value={this.state.date} />
          </div>
          <div className="session-div">
            <h3>Selected Dates</h3>
            {this.handleDates()}
          </div>
        </div>
      </div>
    );
  }
}

export default AddAvailability;
