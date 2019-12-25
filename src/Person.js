import React from 'react';

function Person(props) {
  function remove() {
    props.dbRef.child(props.id).remove();
  }

  return (
    <tr>
      <td>
        <p className="inline">{props.name}</p>
      </td>
      <td>
        <div className="inline">
          <button onClick={remove}>Remove</button>
        </div>
      </td>
    </tr>
  );
}

export default Person;
