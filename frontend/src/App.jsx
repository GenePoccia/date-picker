import React, { Component } from 'react'
import { connect } from 'react-redux'
import Calendar from './Calendar.jsx'
import CityPicker from './CityPicker.jsx'
import SubmitInformationButton from './SubmitInformationButton.jsx'

class UnconnectedApp extends Component {
    render = () => {
    
        return (
            <div>
                <Calendar />
                <CityPicker />
                <SubmitInformationButton />
            </div>
        )
    }
}

let App = connect()(UnconnectedApp)

export default App
