import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };
  }

  //city selection
  handleChange = evt => {
    evt.preventDefault();
    let city = evt.target.value;
    this.props.dispatch({ type: "city-selection", body: city });
  };

  render = () => {
    return (
      <div>
        Enter your postal code (without spaces):{" "}
        <form>
          <input type="text" name="postalCode" onChange={this.handleChange} />
        </form>
      </div>
    );
  };
}

let CityPicker = connect()(UnconnectedCityPicker);

export default CityPicker;
