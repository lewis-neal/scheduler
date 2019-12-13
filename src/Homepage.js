import React, { Component } from 'react';
import CreateSession from './CreateSession';

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1>Create a session to get started!</h1>
        <CreateSession/>
      </div>
    );
  }
}

export default Homepage;
