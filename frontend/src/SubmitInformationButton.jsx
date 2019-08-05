import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSubmitInformationButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      city: ""
    };
  }

  //send data to backend
  handleReserve = () => {
    let data = new FormData();
    data.append("date", this.props.date);
    data.append("city", this.props.city);

    fetch("http://localhost:4000/post-dates", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          alert(
            "Reserved for " +
              body.date +
              " with a " +
              body.buffer +
              " day buffer before and after"
          );
        }
      });
  };

  render = () => {
    return (
      <div>
        <button onClick={this.handleReserve}>Reserve</button>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    date: st.date,
    city: st.city
  };
};

let SubmitInformationButton = connect(mapStateToProps)(
  UnconnectedSubmitInformationButton
);
export default SubmitInformationButton;
