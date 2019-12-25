import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

function CreateSession() {
  const dbRef = firebase.database().ref().child('sessions');
  const [redirect, setRedirect] = useState(false);

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
      <button className="create-session-button" onClick={handleClick}>Create</button>
    </div>
  );
}

export default CreateSession;
