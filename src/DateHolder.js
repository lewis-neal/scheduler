import React, { Component } from 'react';
import DateListing from './DateListing';

class DateHolder extends Component {
  render() {
    return (
       this.props.dates.map(
         (date, id) =>
         <DateListing key={id} date={date} index={id} handleClick={this.props.removeDate} />
       )
    );
  }
}

export default DateHolder;
