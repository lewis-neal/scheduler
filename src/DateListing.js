import React from 'react';

function DateListing(props) {
  return (
    <tr>
      <td>
        <p className="inline">{props.date.toDateString()}</p>
      </td>
      <td>
        <div className="inline">
          <button onClick={props.handleClick} value={props.id}>Remove</button>
        </div>
      </td>
    </tr>
  );
}

export default DateListing;
