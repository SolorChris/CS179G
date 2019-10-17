import React from 'react'
import '../index.css'
import logo from './logo.png' 

class SearchPage extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.name === "uploadButton")
            this.props.history.goBack()
    }

    render() {
        return(
            <div>
                <div className="header">
                    <img src={logo} alt={"million thanks"} height="70" width="150"/>
                    <button name= "uploadButton" type="button" className="notClickButton" onClick={this.handleClick}>upload</button>
                    <button name= "searchButton" type="button" className="clickButton" onClick={this.handleClick}>search</button>
                </div>
                <input type="text" name="searchField" className="textField" placeholder="enter address"></input>
                <select>
                    <option value="fullAddress">search by full address</option>
                    <option value="addressNumber">search by address number</option>
                    <option value="streetName">search by street name</option>
                    <option value="state">search by state</option>
                    <option value="zipcode">search by zipcode</option>
                </select>
                <button name= "submitButton" type="button" className="normalButton" onClick={this.handleClick}>submit</button>
            </div>
        )
    }
}

export default SearchPage