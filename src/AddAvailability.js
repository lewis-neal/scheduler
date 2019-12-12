import React, { Component } from 'react';
import Calendar from 'react-calendar';
import firebase from './Firebase';
import { Redirect } from 'react-router-dom';
import DateHolder from './DateHolder';

class AddAvailability extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      dates: [],
      redirect: false,
      hasValidName: false,
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
    const validNameRegex = new RegExp('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$');
    this.setState({
      name: event.target.value.trim(),
      hasValidName: validNameRegex.test(event.target.value),
    });
  };

  displayRemoveAll() {
    if (typeof this.state.dates !== 'undefined' && Object.entries(this.state.dates).length > 0) {
      return (
        <td>
          <button onClick={this.removeAllDates}>Remove All</button>
        </td>
      );
    }
  }

  handleDates = () => {
    if (typeof this.state.dates !== 'undefined' && Object.entries(this.state.dates).length > 0) {
      return (
        <DateHolder dates={this.state.dates} removeDate={this.removeDate} />
      );
    }

    return (<tr><td><p>No dates currently selected</p></td></tr>);
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
        <h1>Add Availability</h1>
        <h2>{this.state.name || "Insert Name"}</h2>
        <div className="availability-top">
          <label className="availability-label">Name</label>
          <input className="availability-text" onChange={this.changeName} type="text"></input>
          <button className="availability-save" disabled={!this.state.hasValidName} onClick={this.saveAvailability}>Save</button>
          <button onClick={this.backToSession}>Cancel</button>
        </div>
        <div>
          <div className="session-div">
            <h3>Dates</h3>
            <Calendar onChange={this.changeDate} value={this.state.date} />
          </div>
          <div className="session-div">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h3>Selected Dates</h3>
                  </td>
                  {this.displayRemoveAll()}
                </tr>
                {this.handleDates()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAvailability;
