import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import AddAvailability from './AddAvailability';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React sir</h2>
        </div>
        <Router>
          <Homepage />
          <Route path="/availability/:id" exact component={AddAvailability}/>
        </Router>
      </div>
    );
  }
}

export default App;
