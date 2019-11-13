import React from 'react'
import '../index.css'
import logo from './images/assets/banner_logo.png'
import upbox from './images/assets/page_upload_button_drag_and_drop.png'
import axios from 'axios'
import {add} from './db_connect'

class UploadPage extends React.Component {
    constructor() {
        super()
        this.state = {
            customer_name : "",
            customer_street : "",
            customer_city : "",
            customer_state : "",
            customer_zip : "",
            uploadFile: null,
            getimage: null,
            display: null
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
                console.log(this.state.getimage)
                this.setState({uploadFile : null})
                this.setState({display : this.state.getimage})
            })
            // give signal to run python script
            fetch('http:/localhost:3200/readytorun?run=yes')
            // get address
            fetch('http://localhost:3200/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ 
                    customer_name: data['name'],
                    customer_street: data['streetnumber'],
                    customer_street: data['address'],
                    customer_city: data['city'],
                    customer_state: data['state'],
                    customer_zip: data['zip']
                })
            })
        }
        else if (event.target.name === "confirmButton") {
            // TODO:: send the correct address to back-end to insert into database
            add(customer_name, customer_street, customer_city, customer_state, customer_zip);
        }
    }

    handleChange(event) {
        
        if (event.target.name === 'selectFile') {
            this.setState({uploadFile : event.target.files[0]})
            this.setState({getimage : URL.createObjectURL(event.target.files[0])})
            // TODO:: Display image better and add a component so the user can say if they good
        }
        else {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
                [name]: value
            });
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
                <input name= "selectFile" type="file" className="hide" id="doupload" onChange={this.handleChange}/>
                <label for="doupload"><img src={upbox} alt={"upload icon"} height="157" width="259"/></label>
                
                <button name= "uploadFile" className="normalButton1" type="button" onClick={this.handleClick}>upload selected file</button>
                <button name= "confirmButton" className="normalButton2" type="button" onClick={this.handleClick} >confirm address</button>
                <form>
                    <input type="text" name="customer_name" className="textField" placeholder="recipient" value={this.state.customer_name} onChange={this.handleChange}></input>
                    <input type="text" name="customer_street" className="textField" placeholder="street number" value={this.state.customer_street} onChange={this.handleChange}></input>
                    <input type="text" name="customer_city" className="textField" placeholder="city" value={this.state.customer_city} onChange={this.handleChange}></input>
                    <input type="text" name="customer_state" className="textField" placeholder="state" value={this.state.customer_state} onChange={this.handleChange}></input>
                    <input type="text" name="customer_zip" className="textField" placeholder="zipcode" value={this.state.customer_zip} onChange={this.handleChange}></input>
                </form>
                <div>
                    <img src={this.state.display} alt="display of image upload"/>
                </div>
            </div>
        )
    }
}

export default UploadPage