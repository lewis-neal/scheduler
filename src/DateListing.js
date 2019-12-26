import React from 'react';

function DateListing(props) {
  function removeDate() {
    props.handleClick(props.index);
  }
  return (
    <tr>
      <td>
        <p className="inline">{props.date.toDateString()}</p>
      </td>
      <td>
        <div className="inline">
          <button onClick={removeDate}>Remove</button>
        </div>
      </td>
    </tr>
  );
}

export default DateListing;
