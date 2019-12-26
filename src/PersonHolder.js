import React from 'react';
import Person from './Person';

function PersonHolder(props) {
  if (typeof props.people !== 'undefined' && Object.entries(props.people).length > 0) {
    return (
      Object.keys(props.people).map(
        (id, key) => <Person key={key} id={id} dbRef={props.dbRef} name={props.people[id]} />
      )
    );
  }
  return (
     <tr>
      <td>
          {props.getNoPeopleElement()}
      </td>
    </tr>
  );
}

export default PersonHolder;
