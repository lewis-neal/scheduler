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

    this.dbRef = firebase.database().ref().child('sessions/' + props.id);
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
      let path = '/session/' + this.props.id;
      return (
        <Redirect push to={path} />
      );
    }
    return (
      <div>
        <h2>{this.state.name || "Insert Name"}</h2>
        <label>Name</label>
        <input onChange={this.changeName} type="text"></input>
        <Calendar onChange={this.changeDate} value={this.state.date} />
        <ul>
          {this.state.dates.map((date, id) => <li key={id}>{date.toDateString()}</li>)}
        </ul>
        <button onClick={this.saveAvailability}>Save</button>
      </div>
    );
  }
}

export default AddAvailability;
