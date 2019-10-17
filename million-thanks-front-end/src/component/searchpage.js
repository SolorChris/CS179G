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
            </div>
        )
    }
}

export default SearchPage