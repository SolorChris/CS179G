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
            display: null,
            count: 0,
            data: null
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
            fetch('http:/localhost:3300/readytorun?run=yes')
            fetch('http://localhost:3300/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ 
                    customer_name: data['customer_name'],
                    customer_street: data['customer_street'],
                    customer_city: data['customer_city'],
                    customer_state: data['customer_state'],
                    customer_zip: data['customer_zip'],
                    data: data,
                    counter :0
                })
            })
        }
        else if (event.target.name === 'nextPerson') {
            let currCount = this.state.counter
            if (this.state.data === null || currCount >= this.state.data.length) 
                return
            this.setState({ 
                customer_name: this.state.data[currCount]['customer_name'],
                customer_street: this.state.data[currCount]['customer_street'],
                customer_city: this.state.data[currCount]['customer_city'],
                customer_state: this.state.data[currCount]['customer_state'],
                customer_zip: this.state.data[currCount]['customer_zip'],
            })
            this.setState(prevState => ({counter : prevState.counter + 1}))
            
        }
        else if (event.target.name === "confirmButton") {
            // TODO:: send the correct address to back-end to insert into database
            add(this.state.customer_name, this.state.customer_street, this.state.customer_city, this.state.customer_state, this.state.customer_zip);
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
                <label for="doupload"><img src={upbox} alt={"upload icon"} className="upstyle" height="157" width="259" /></label>
                
                <button name= "uploadFile" className="uploadbutton" type="button" onClick={this.handleClick}>upload selected file</button>
                <button name= "confirmButton" className="confirmbutton" type="button" onClick={this.handleClick} >confirm address</button>
                <button name= "nextPerson" className="personbutton" type="button" onClick={this.handleClick} >Next Person</button>
                <div className="dataget">
                <form>
                    <input type="text" name="customer_name" className="textField" placeholder="name" value={this.state.customer_name} onChange={this.handleChange}></input>
                    <input type="text" name="customer_street" className="textField" placeholder="street" value={this.state.customer_street} onChange={this.handleChange}></input>
                    <input type="text" name="customer_city" className="textField" placeholder="city" value={this.state.customer_city} onChange={this.handleChange}></input>
                    <input type="text" name="customer_state" className="textField" placeholder="state" value={this.state.customer_state} onChange={this.handleChange}></input>
                    <input type="text" name="customer_zip" className="textField" placeholder="zip" value={this.state.customer_zip} onChange={this.handleChange}></input>
                    <img src={this.state.display} height="920" width="920" alt="display of image upload"/>
                </form>
                </div>
            </div>
        )
    }
}

export default UploadPage