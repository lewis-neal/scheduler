import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Session from './Session';
import AddAvailability from './AddAvailability';

function App() {
  return (
    <div className="App">
      <Router>
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

export default App;
