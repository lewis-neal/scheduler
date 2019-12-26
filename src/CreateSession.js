import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

function CreateSession() {
  const dbRef = firebase.database().ref().child('sessions');
  const [redirect, setRedirect] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [hasValidSessionName, setHasValidSessionName] = useState(false);

  function changeSessionName(event) {
    const validSessionNameRegex = new RegExp('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$');
    setSessionName(event.target.value);
    setHasValidSessionName(validSessionNameRegex.test(event.target.value));
  }

  function handleClick() {
    setRedirect(true);
    dbRef.once('value').then((result) => {
      const data = result.val();
      const cutOff = new Date();
      cutOff.setDate(cutOff.getDate() - 1);
      Object.keys(data).forEach((id) => {
        if (new Date(data[id].timestamp) < cutOff) {
          dbRef.child(id).remove();
        }
      });
    });
  }

  if (redirect) {
    const session = {
      'name': sessionName,
      'people': '',
      'timestamp': new Date().toJSON(),
    };
    const sessionId = dbRef.push(session).key;
    const path = '/session/' + sessionId;
    return (
      <Redirect push to={path} />
    );
  }

  return (
    <div>
      <div>
        <h3>Session Name</h3>
        <input className="create-session-name" type="text" onChange={changeSessionName} />
      </div>
      <div>
        <button className="create-session-button" disabled={!hasValidSessionName} onClick={handleClick}>Create</button>
      </div>
    </div>
  );
}

export default CreateSession;
