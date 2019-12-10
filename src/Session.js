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
      let datesArr = [];
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        people[key] = data[key].name;
        datesArr.push(data[key].dates);
      });
      if (this._isMounted) {
        this.setState({
          people: people,
          dates: this.intersection(...datesArr),
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
        Object.keys(this.state.people).map(
          (id, key) => <Person key={key} id={id} dbRef={this.dbRef} name={this.state.people[id]} />
        )
      );
    }
    return (null);
  }

  handleClick = () => {
    this.setState({
      redirect: true,
    });
  };

  intersection() {
    let result = [];
    let lists;

    if(arguments.length === 1) {
      lists = arguments[0];
    } else {
      lists = arguments;
    }

    for(let i = 0; i < lists.length; i++) {
      let currentList = lists[i];
      for(let y = 0; y < currentList.length; y++) {
        let currentValue = currentList[y];
        if(result.indexOf(currentValue) === -1) {
          let existsInAll = true;
          for(let x = 0; x < lists.length; x++) {
            if(lists[x].indexOf(currentValue) === -1) {
              existsInAll = false;
              break;
            }
          }
          if(existsInAll) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
  }

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
