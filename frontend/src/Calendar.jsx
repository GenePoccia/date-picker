import React, { Component } from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class UnconnectedCalendar extends Component {
  constructor(props) {
    super(props);

    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      date: null,
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

  //Blocked dates
  isDayBlocked(date) {
    if (this.props.datesTaken[date] === true) {
      return true;
    }
  }

  render = () => {
    return (
      <SingleDatePicker
        date={this.state.date}
        onDateChange={date =>
          this.props.dispatch({ type: "date-updated", body: date })
        }
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
        isDayBlocked={this.isDayBlocked}
        id="your_unique_id"
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
