import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import PersonHolder from './PersonHolder';
import Dates from './Dates';
import Share from './Share';
import { intersection  } from './Utilities';

function Session(props) {
  const [redirect, setRedirect] = useState(false);
  const [people, setPeople] = useState({});
  const [dates, setDates] = useState([]);
  let dbRef = firebase.database().ref().child(
    'sessions/' + props.match.params.id
  );
  const [sessionName, setSessionName] = useState('');
  dbRef.child('/name').once('value').then((result) => {
    const data = result.val();
    setSessionName(data);
  });
  dbRef = dbRef.child('/people');

  function getNoPeopleElement() {
    return (
      <p>No people listed</p>
    );
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
      <Share />
      <h2>{sessionName}</h2>
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
            <PersonHolder dbRef={dbRef} getNoPeopleElement={getNoPeopleElement} people={people} />
            </tbody>
          </table>
        </div>
        <div className="session-div">
          <h3>Dates that work:</h3>
          <Dates dates={dates} getNoPeopleElement={getNoPeopleElement} />
        </div>
      </div>
    </div>
  );
}

export default Session;
