import React from 'react'
import '../index.css'
import logo from './logo.png'

class UploadPage extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.name === 'searchButton')
            this.props.history.push('/search')
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
                    <input type="text" name="streetNumber" placeholder="street number"></input>
                    <input type="text" name="streetName" placeholder="street name"></input>
                    <input type="text" name="city" placeholder="city"></input>
                    <input type="text" name="state" placeholder="state"></input>
                    <input type="text" name="zipcode" placeholder="zipcode"></input>
                </form>
            </div>
        )
    }
}

export default UploadPage