import React, { useState } from 'react';
import Calendar from 'react-calendar';
import firebase from './Firebase';
import { Redirect } from 'react-router-dom';
import DateHolder from './DateHolder';

function AddAvailability(props) {
  const [name, setName] = useState('');
  const [dates, setDates] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [hasValidName, setHasValidName] = useState(false);

  const dbRef = firebase.database().ref().child('sessions/' + props.match.params.id);

  function backToSession() {
    setRedirect(true);
  }

  function changeDate(date) {
    let index = -1;
    dates.forEach((el, ind) => {
      if (el.getTime() === date.getTime()) {
        index = ind;
        return;
      }
    });
    if (index === -1) {
      setDates([...dates, date]);
      return;
    }
    let datesArr = dates;
    datesArr.splice(index, 1);
    setDates(datesArr);
  }

  function changeName(event) {
    const validNameRegex = new RegExp('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$');
    setName(event.target.value.trim());
    setHasValidName(validNameRegex.test(event.target.value));
  }

  function displayRemoveAll() {
    if (typeof dates !== 'undefined' && Object.entries(dates).length > 0) {
      return (
        <td>
          <button onClick={removeAllDates}>Remove All</button>
        </td>
      );
    }
  }

  function handleDates() {
    if (typeof dates !== 'undefined' && Object.entries(dates).length > 0) {
      return (
        <DateHolder dates={dates} removeDate={removeDate} />
      );
    }

    return (<tr><td><p>No dates currently selected</p></td></tr>);
  }

  function removeAllDates() {
    setDates([]);
  }

  function removeDate(index) {
    let datesArr = [...dates];
    datesArr.splice(index, 1);
    setDates(datesArr);
  }

  function saveAvailability() {
    const person = {
      name: name,
      dates: dates.map((date) => {
        return date.toJSON();
      }),
    };

    dbRef.child('people').push(person);
    setRedirect(true);
  }

  const path = '/session/' + props.match.params.id;
  if (redirect) {
    return (
      <Redirect push to={path} />
    );
  }
  return (
    <div>
      <h3>{name || "Insert Name"}</h3>
      <div className="availability-top">
        <label className="availability-label">Name</label>
        <input className="availability-text" onChange={changeName} type="text"></input>
        <button className="availability-save" disabled={!hasValidName} onClick={saveAvailability}>Save</button>
        <button onClick={backToSession}>Cancel</button>
      </div>
      <div className="row">
        <div className="availability-col">
          <h3>Dates</h3>
          <Calendar
            className="availability-calendar"
            minDate={new Date()}
            onChange={changeDate} />
        </div>
        <div className="availability-col">
          <table className="availability-table">
            <tbody>
              <tr>
                <td>
                  <h3>Selected Dates</h3>
                </td>
                {displayRemoveAll()}
              </tr>
              {handleDates()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddAvailability;
