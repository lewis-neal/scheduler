import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import Person from './Person';
import copy from 'copy-to-clipboard';

function Session(props) {
  const [redirect, setRedirect] = useState(false);
  const [people, setPeople] = useState({});
  const [dates, setDates] = useState([]);
  const dbRef = firebase.database().ref().child(
    'sessions/' + props.match.params.id + '/people'
  );

  function intersection() {
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

  function getPeopleElement() {
    if (typeof people !== 'undefined' && Object.entries(people).length > 0) {
      return (
        Object.keys(people).map(
          (id, key) => <Person key={key} id={id} dbRef={dbRef} name={people[id]} />
        )
      );
    }
    return (
       <tr>
        <td>
            {getNoPeopleElement()}
        </td>
      </tr>
    );
  }

  function getNoPeopleElement() {
    return (
      <p>No people listed</p>
    );
  }

  function getAvailableDates() {
    if (typeof dates !== 'undefined' && Object.entries(dates).length > 0) {
      return (
        Object.keys(dates).map(
          (id, key) => <span key={key}><p>{new Date(dates[id]).toDateString()}</p></span>
        )
      );
    }
    return getNoPeopleElement();
  }

  function getUrl() {
    copy(window.location.href);
  }

  function handleClick() {
    setRedirect(true);
  };

  useEffect(() => {
    dbRef.on('value', (snapshot) => {
      let people = {};
      let datesArr = [];
      let dates = [];
      const data = snapshot.val();
      if (data !== null) {
        Object.keys(data).forEach((key) => {
          people[key] = data[key].name;
          datesArr.push(data[key].dates);
        });
        dates = datesArr;
        if (dates.length > 1) {
          dates = intersection(...datesArr);
        } else {
          dates = dates[0];
        }
      }
      setPeople(people);
      setDates(dates);
    });
    return function cleanup() {
      dbRef.off('value');
    };
  }, []);

  const id = typeof props.match.params.id !== 'undefined' ? props.match.params.id : '';
  if (redirect) {
    const path = '/session/' + id + '/availability';
    return (
      <Redirect push to={path} />
    );
  }

  return (
    <div>
      <div className="row">
        <div className="session-top">
          <h3>Share the link with people you're trying to organise with!</h3>
          <div className="session-link-holder">
            <input className="availability-text" readOnly value={window.location.href} />
            <button onClick={getUrl}>Share</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="session-div">
          <table>
            <tbody>
            <tr>
              <td>
                <h3 className="inline">People</h3>
              </td>
              <td>
                <div className="inline">
                  <button onClick={handleClick}>Add</button>
                </div>
              </td>
            </tr>
            {getPeopleElement()}
            </tbody>
          </table>
        </div>
        <div className="session-div">
          <h3>Dates that work:</h3>
          {getAvailableDates()}
        </div>
      </div>
    </div>
  );
}

export default Session;
