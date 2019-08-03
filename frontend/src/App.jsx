import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'



class UnconnectedApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: null,
      focused: null
    }
  }

  

//send data to backend
  handleReserve = () => {
    let data = new FormData();
    data.append('date', this.state.date)    
  
    fetch('http://localhost:4000/post-dates',
    {
      method: "POST",
      body: data,
      credentials: 'include'
    })
    .then(x => {return x.text()})
    .then(responseBody => { 
      let body = JSON.parse(responseBody)
     if (body.success) {
       alert('date added to backend')
      console.log(body.dummyTest)
      }

    })

 console.log('in button')
      console.log(this.state.date)
      console.log(this.state.date._d)

      let timeNow = this.state.date._d
      console.log('reserved, ' , moment(timeNow).format('Do MMM YYYY'))

  }
  render = () => {
     return (
    <div >
    <SingleDatePicker
  date={this.state.date} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  id="your_unique_id" // PropTypes.string.isRequired,
/>
<div>
  <button onClick={this.handleReserve}>Reserve</button>
  </div>
    </div>);
    }
}

let App = connect()(UnconnectedApp)
export default App;
