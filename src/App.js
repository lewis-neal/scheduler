import React, { Component } from 'react';
import Calendar from 'react-calendar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    dates: [],
  }

  onChange = (date) => {
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
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React sir</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
      </div>
    );
  }
}

export default App;
