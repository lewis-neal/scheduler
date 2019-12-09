import React, { Component } from 'react';
import CreateSession from './CreateSession';

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1>Scheduler</h1>
        <CreateSession/>
      </div>
    );
  }
}

export default Homepage;
