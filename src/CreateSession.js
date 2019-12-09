import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class CreateSession extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handleClick = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect push to="/availability" />
      );
    }

    return (
      <div>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

export default CreateSession;
