import React from 'react'
import '../index.css'
import logo from './images/assets/banner_logo.png'
import {makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField}from '@material-ui/core'
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
        this.updateTable = this.updateTable.bind(this)
    }

    handleClick(event) {
        if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }  
        else if (event.target.name === 'mapButton') {
            this.props.history.push('/analyticmap')
        }
        else if (event.target.name === 'uploadFile') {
            console.log(this.state.uploadFile)
            console.log("heelo")
            const image = new FormData()
            image.append('file', this.state.uploadFile)
            
            console.log(image)
            axios.post('http://localhost:3100/upload', image, {
            })
            .then(res => {
                console.log(res.statusText)
                console.log(this.state.getimage)
                //this.setState({uploadFile : null})
                this.setState({display : this.state.getimage})
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
        else if (event.target.name === "runocr") {
            console.log('hello')
            if (this.state.uploadFile === null) {
                console.log('ocr1')
                return
            }
            console.log('ocr2 ' + this.state.uploadFile['name'])
            fetch('http://localhost:8000/?filename=' + this.state.uploadFile['name'])
            
            fetch('http://localhost:8000/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ 
                    customer_name: data[0]['customer_name'],
                    customer_street: data[0]['customer_street'],
                    customer_city: data[0]['customer_city'],
                    customer_state: data[0]['customer_state'],
                    customer_zip: data[0]['customer_zip'],
                    data: data,
                    counter : 1
                })
            })
            
            this.setState({uploadFile:null})
        }
    }

    handleChange(event) {
        
        if (event.target.name === 'selectFile') {
            this.setState({uploadFile : event.target.files[0]})
            this.setState({getimage : URL.createObjectURL(event.target.files[0])})
        }                             
    }

    updateTable(event, index, change) {
        let temp = this.state.data
        console.log(index, event.target.value, event.target.name)
        if (change === "customer_name") {
            temp[index]['customer_name'] = event.target.value
        }
        else if (change === "customer_street") {
            temp[index]['customer_street'] = event.target.value
        }
        else if (change === "customer_city") {
            temp[index]['customer_city'] = event.target.value
        }
        else if (change === "customer_state") {
            temp[index]['customer_state'] = event.target.value
        }
        else if (change === "customer_zip") {
            temp[index]['customer_zip'] = event.target.value
        }  
        this.setState({data:temp}, () => console.log(this.state.data))
    }

    renderElement() {
        if (this.state.data === null) {
            return(<p></p>)
        }
        const classes = makeStyles(theme => ({
            root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            },
            table: {
            minWidth: 650,
            },
        }))
        console.log(this.state.data)
        return (
        <div>
            <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Street</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Zip</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.data.map((row,i) => (
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        <TextField value={row.customer_name} onChange={e => this.updateTable(e, i, "customer_name")}/>
                    </TableCell>
                    <TableCell align="right">
                        <TextField value={row.customer_street} onChange={e => this.updateTable(e, i, "customer_street")}/>
                    </TableCell>
                    <TableCell align="right">
                        <TextField value={row.customer_city} onChange={e => this.updateTable(e, i, "customer_city")}/>
                    </TableCell>
                    <TableCell align="right">
                        <TextField value={row.customer_state} onChange={e => this.updateTable(e, i, "customer_state")}/>
                    </TableCell>
                    <TableCell align="right">
                        <TextField value={row.customer_zip} onChange={e => this.updateTable(e, i, "customer_zip")}/>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </Paper>
            <button name= "confirmButton" className="normalButton" type="button" onClick={this.handleClick} >confirm</button>
        </div>
        )
    }

    render() {
        return(
            <div>
                <div className="header">
                    <img src={logo} alt={"million thanks"} height="70" width="150"/>
                    <button name= "uploadButton" type="button" className="clickButton" onClick={this.handleClick}>upload</button>
                    <button name= "searchButton" type="button" className="notClickButton" onClick={this.handleClick}>search</button>
                    <button name= "mapButton" type="button" className="notClickButton" onClick={this.handleClick}>analytic map</button>
                </div>
                <div>
                    <input name= "selectFile" type="file" id="doupload" onChange={this.handleChange}/>
                    <button name= "uploadFile" className="normalButton" type="button" onClick={this.handleClick}>upload selected file</button>
                    <button name="runocr" className="normalButton" type="button" onClick={this.handleClick}>Get Address</button>
                    {this.renderElement()}
                </div>
            </div>
        )
    }
}

export default UploadPage