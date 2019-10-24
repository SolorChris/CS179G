import React from 'react'
import '../index.css'
import logo from './logo.png'

class UploadPage extends React.Component {
    constructor() {
        super()
        this.state = {
            streetNumber : "",
            streetName : "",
            city : "",
            state : "",
            zipcode : ""
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick(event) {
        if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }
        else if (event.target.name === 'browseButton') {
            // TODO: handle upload image
        }
    }

    handleChange(event) {
        if (event.target.name === 'streetName') {
            this.setState({streetName : event.target.value})
        }
        else if (event.target.name === 'streetNumber') {
            this.setState({streetNumber : event.target.value})
        }
        else if (event.target.name === 'city') {
            this.setState({city : event.target.value})
        }
        else if (event.target.name === 'state') {
            this.setState({state : event.target.value})
        }
        else if (event.target.name === 'zipcode') {
            this.setState({zipcode : event.target.value})
        }
    }

    render() {
        return(
            <div>
                <div className="header">
                    <img src={logo} alt={"million thanks"} height="70" width="150"/>
                    <button name= "uploadButton" type="button" className="clickButton" onClick={this.handleClick}>upload</button>
                    <button name= "searchButton" type="button" className="notClickButton" onClick={this.handleClick}>search</button>
                </div>
                <button name= "browseButton"  className="normalButton" type="button" onClick={this.handleClick}>browse your file</button>
                <button name= "confirmButton" className="normalButton" type="button" onClick={this.handleClick}>confirm</button>
                <form>
                    <input type="text" name="streetNumber" className="textField" placeholder="street number" value={this.state.streetNumber} onChange={this.handleChange}></input>
                    <input type="text" name="streetName" className="textField" placeholder="street name" value={this.state.streetName} onChange={this.handleChange}></input>
                    <input type="text" name="city" className="textField" placeholder="city" value={this.state.city} onChange={this.handleChange}></input>
                    <input type="text" name="state" className="textField" placeholder="state" value={this.state.state} onChange={this.handleChange}></input>
                    <input type="text" name="zipcode" className="textField" placeholder="zipcode" value={this.state.zipcode} onChange={this.handleChange}></input>
                </form>
            </div>
        )
    }
}

export default UploadPage