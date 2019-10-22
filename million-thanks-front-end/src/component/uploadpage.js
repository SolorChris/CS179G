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
    }

    handleClick(event) {
        if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }
        else if (event.target.name === 'browseButton') {
            // TODO: handle upload image
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
                    <input type="text" name="streetNumber" className="textField" placeholder="street number" value={this.state.streetNumber}></input>
                    <input type="text" name="streetName" className="textField" placeholder="street name" value={this.state.streetName}></input>
                    <input type="text" name="city" className="textField" placeholder="city" value={this.state.city}></input>
                    <input type="text" name="state" className="textField" placeholder="state" value={this.state.state}></input>
                    <input type="text" name="zipcode" className="textField" placeholder="zipcode" value={this.state.zipcode}></input>
                </form>
            </div>
        )
    }
}

export default UploadPage