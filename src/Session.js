import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Session extends Component {
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
  };

  render() {
    let id = typeof this.props.match.params.id !== 'undefined' ? this.props.match.params.id : '';
    if (this.state.redirect) {
      let path = '/session/' + id + '/availability';
      return (
        <Redirect push to={path} />
      );
    }

    return (
      <button onClick={this.handleClick}>Add Availability</button>
    );
  }
}

export default Session;
