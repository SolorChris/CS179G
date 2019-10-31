import React from 'react'
import '../index.css'
import logo from './logo.png'
import axios from 'axios'

class UploadPage extends React.Component {
    constructor() {
        super()
        this.state = {
            streetNumber : "",
            streetName : "",
            city : "",
            state : "",
            zipcode : "",
            uploadFile: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick(event) {
        if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }
        else if (event.target.name === 'uploadFile') {
            console.log(this.state.uploadFile)
            const image = new FormData()
            image.append('file', this.state.uploadFile)
            console.log(image)
            axios.post('http://localhost:3100/upload', image, {
            })
            .then(res => {
                console.log(res.statusText)
            })
            // TODO:: Take the address from back-end and assign it to state
            fetch('http://localhost:3200/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    streetName: data['address'],
                    city: data['city'],
                    state: data['state'],
                    zipcode: data['zip']
                })
            })
        }
        else if (event.target.name === "confirmButton") {
            // TODO:: send the correct address to back-end to insert into database
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
        else if (event.target.name === 'selectFile') {
            this.setState({uploadFile : event.target.files[0]})
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
                <input name= "selectFile" type="file" onChange={this.handleChange}/>
                <button name= "uploadFile" className="normalButton1" type="button" onClick={this.handleClick}>upload selected file</button>
                <button name= "confirmButton" className="normalButton2" type="button" onClick={this.handleClick} >confirm address</button>
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