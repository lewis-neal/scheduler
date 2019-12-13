import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Session from './Session';
import AddAvailability from './AddAvailability';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL} >
          <div className="App-header">
            <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
            <h1>Scheduler</h1>
          </div>
          <Route path="/session/:id" exact component={Session}/>
          <Route path="/" exact component={Homepage}/>
          <Route path="/session/:id/availability" exact component={AddAvailability}/>
        </Router>
      </div>
    );
  }
}

export default App;
