import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSubmitInformationButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      city: ""
    };
  }

  //send data to backend
  handleReserve = () => {
   
    //check to see if date is selected
    if (this.props.startDate === null || this.props.endDate === null) {
      return alert("Select a date");
    }
   
    //check to see if postal code is valid
    let postalCode = this.props.city.split("");
    if (postalCode.length > 6) {
      return alert("This is not a valid postal code, try again");
    }
   
    //turn postal code into a city
    let city = "";
    if (postalCode[0].toUpperCase() === "H") city = "Montreal";
    if (postalCode[0].toUpperCase() === "M") city = "Toronto";
    if (postalCode[0].toUpperCase() === "V") city = "Vancouver";
    
    //check to see if city changed
    if (city === "")
      return alert(`
    Your city was not found, make sure: \n
    If you're in Montreal, your postal code begins with H \n
    If you're in Toronto, your postal code begins with M \n
    If you're in Vancouver, your postal code begins with V.
    `);
    
    //create form to send
    let data = new FormData();
    data.append("startDate", this.props.startDate);
    data.append("endDate", this.props.endDate);
    data.append("city", city);

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
            "Reserved from " +
              body.startDate +
              " until " +
              body.endDate +
              " with a " +
              body.buffer +
              " day buffer before and after \nLocation: " +
              body.city
          );
        } else {
          alert(
            `A reservation not possible for this day
             \n Please allow for a 1 day buffer before and after your selected date if you're in Montreal
             \n A 2 day buffer if you're in Toronto 
             \n Or a 3 day buffer if you're in Vancouver`
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
    startDate: st.startDate,
    endDate: st.endDate,
    city: st.city
  };
};

let SubmitInformationButton = connect(mapStateToProps)(
  UnconnectedSubmitInformationButton
);
export default SubmitInformationButton;
