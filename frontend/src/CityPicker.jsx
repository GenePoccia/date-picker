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
  handleLocationChange = evt => {
    evt.preventDefault();
    let city = evt.target.value;
    this.props.dispatch({
      type: "city-selection",
      body: city
    });
  };

  render = () => {
    return (
      <div>
        Choose your city:{" "}
        <select onChange={this.handleLocationChange}>
          <option value="Montreal">Montreal</option>
          <option value="Toronto">Toronto</option>
          <option value="Vancouver">Vancouver</option>
        </select>
      </div>
    );
  };
}

let CityPicker = connect()(UnconnectedCityPicker);

export default CityPicker;
