import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

class CreateSession extends Component {
  constructor() {
    super();
    this.dbRef = firebase.database().ref().child('sessions');
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
      const session = {
        'people': '',
        'timestamp': new Date().toJSON(),
      };
      let sessionId = this.dbRef.push(session).key;
      let path = '/session/' + sessionId;
      return (
        <Redirect push to={path} />
      );
    }

    return (
      <div>
        <button className="create-session-button" onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

export default CreateSession;
