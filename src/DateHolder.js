import React from 'react';
import DateListing from './DateListing';

function DateHolder(props) {
  return (
     props.dates.map(
       (date, id) =>
       <DateListing key={id} date={date} index={id} handleClick={props.removeDate} />
     )
  );
}

export default DateHolder;
