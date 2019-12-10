import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import Person from './Person';

class Session extends Component {
  constructor(props) {
    super();
    this.dbRef = firebase.database().ref().child(
      'sessions/' + props.match.params.id + '/people'
    );

    this.state = {
      redirect: false,
      people: {},
      dates: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.dbRef.on('value', (snapshot) => {
      let people = {};
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        people[key] = data[key].name;
      });
      if (this._isMounted) {
        this.setState({
          people: people,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getPeopleElement() {
    if (Object.entries(this.state.people).length > 0) {
      return (
        Object.values(this.state.people).map((name, id) => <Person id={id} name={name} />)
      );
    }
    return (null);
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
      <div>
        {this.getPeopleElement()}
        <button onClick={this.handleClick}>Add Availability</button>
      </div>
    );
  }
}

export default Session;
