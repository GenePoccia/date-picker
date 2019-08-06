import React, { Component } from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class UnconnectedCalendar extends Component {
  constructor(props) {
    super(props);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      startDate: null,
      endDate: null,
      focused: null,
      datesTaken: {}
    };
  }

  //GET taken dates
  componentDidMount = () => {
    fetch("http://localhost:4000/get-dates")
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          this.props.dispatch({
            type: "dates-taken",
            body: body.datesTaken
          });
        }
      });
  };

  componentDidUpdate(prevProps) {
    if (this.props.datesTaken !== prevProps.datesTaken) {
      fetch("http://localhost:4000/get-dates")
        .then(x => {
          return x.text();
        })
        .then(responseBody => {
          let body = JSON.parse(responseBody);
          if (body.success) {
            this.props.dispatch({
              type: "dates-taken",
              body: body.datesTaken
            });
          }
        });
    }
  }

  //Blocked dates
  isDayBlocked(date) {
    if (this.props.datesTaken[date] === true) {
      return true;
    }
  }

  render = () => {
    return (
      <DateRangePicker
        startDate={this.state.startDate}
        startDateId="your_unique_start_date_id"
        endDate={this.state.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={({ startDate, endDate }) => {
          this.setState({ startDate, endDate });
          this.props.dispatch({
            type: "date-updated",
            startDate: startDate,
            endDate: endDate
          });
        }}
        isDayBlocked={this.isDayBlocked}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
      />
    );
  };
}
let mapStateToProps = st => {
  return {
    datesTaken: st.datesTaken
  };
};
let Calendar = connect(mapStateToProps)(UnconnectedCalendar);
export default Calendar;
