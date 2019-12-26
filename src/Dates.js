import React from 'react';

function Dates(props) {
  if (typeof props.dates !== 'undefined' && Object.entries(props.dates).length > 0) {
    return (
      Object.keys(props.dates).map(
        (id, key) => <span key={key}><p>{new Date(props.dates[id]).toDateString()}</p></span>
      )
    );
  }
  return props.getNoPeopleElement();
}

export default Dates;
