import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'


class UnconnectedApp extends Component {
  constructor(props){
    super(props)
    this.isDayBlocked = this.isDayBlocked.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

    this.state = {
      date: null,
      focused: null,
      datesTaken: {},
      city: ''
    }
  }


  //GET taken dates
componentDidMount = () => {
  fetch('http://localhost:4000/get-dates')
  .then(x => {return x.text()})
  .then(responseBody => {
    let body = JSON.parse(responseBody)
    if (body.success) {
      console.log('body, ' ,body)
      this.setState({datesTaken: body.datesTaken})
    }
  })
}


//Blocked dates
isDayBlocked(date) {
if (this.state.datesTaken[date] === true) {
  
  return true
}
}

//city selection
handleLocationChange = evt => {
  evt.preventDefault();
  let city = evt.target.value 

  this.setState({city: city})
}


//send data to backend
  handleReserve = () => {
    let data = new FormData();
    data.append('date', this.state.date) 
    data.append('city', this.state.city)   

    fetch('http://localhost:4000/post-dates',
    {
      method: "POST",
      body: data,
      credentials: 'include'
    })
    .then(x => {return x.text()})
    .then(responseBody => { 
      console.log(responseBody)
      let body = JSON.parse(responseBody)
     if (body.success) {
       alert('date added to backend')
      console.log(body.testing)
      }
    })
      let timeNow = this.state.date._d
      let city = this.state.city
      console.log('reserved, ' , moment(timeNow).format('Do MMM YYYY'), 'city ', city)
      
       }


  render = () => {
     return (
    <div >

      {/*v--calendar--v*/}
    <SingleDatePicker
     date={this.state.date} 
     onDateChange={date => this.setState({ date })} 
     focused={this.state.focused} 
     onFocusChange={({ focused }) => this.setState({ focused })} 
     isDayBlocked={this.isDayBlocked}
     id="your_unique_id" />
 
    {/* v--City Selection --v   */}
    <div>
      Choose your city: {' '}
      <select name='Choose-your-city' onChange={this.handleLocationChange}>
        <option value='Montreal'>Montreal</option>
        <option value='Toronto'>Toronto</option>
        <option value='Vancouver'>Vancouver</option>
      </select>
    </div>
 
 
    <div>
    <button onClick={this.handleReserve}>Reserve</button>
    </div>
 
    </div>);
    }
}

let App = connect()(UnconnectedApp)
export default App;
