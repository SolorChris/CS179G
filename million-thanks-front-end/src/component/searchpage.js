import React from 'react'
import '../index.css'
import logo from './logo.png' 
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Checkbox, Tab } from '@material-ui/core'
import {addCustomer, search} from './db_connect'
import { unwatchFile } from 'fs'

class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: "name",
            displayTable: false,
            addresses: null,
            searchText: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick(event) {
        if (event.target.name === "uploadButton") {
            this.props.history.goBack()
        }
        else if (event.target.name === "submitButton") {
            // TODO:: write query and send it to backend to run it on database
            // if (this.state.filter === "name") {
            //     console.log(this.state.filter)
            //     let addr = [{'sender':'me','street':'123 hello','city':'riverside','state':'CA','zipcode':'11111'},
            //             {'sender':'me','street':'321 world','city':'anaheim','state':'CA','zipcode':'22222'}]
            //     this.setState({address:addr})
            // }
            this.setState({displayTable : false})
            const data = search(this.state.filter, this.state.searchText)
            ///Promise.resolve(data);
              
            this.setState({addresses:data})
            console.log("LOG: " + data)
            //this.setState({displayTable : true})
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    
    renderElement() {
        // TODO:: get the data from database and implement the table
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
        console.log(this.state.addresses)
        if (this.state.displayTable === true) {
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
                        <TableCell align="right">Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.addresses.map(row => (
                    <TableRow key={row.customer_name}>
                        <TableCell component="th" scope="row">
                        {row.customer_name}
                        </TableCell>
                        <TableCell align="right">{row.customer_street_1}</TableCell>
                        <TableCell align="right">{row.customer_city}</TableCell>
                        <TableCell align="right">{row.customer_state}</TableCell>
                        <TableCell align="right">{row.customer_zip}</TableCell>
                        <TableCell align="right">
                            <Checkbox/>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                </Paper>
                <button name= "submitAddress" type="button" className="normalButton3" onClick={this.handleClick}>Generate Letter</button>
            </div>
            )
        }
        return(<p></p>)
    }

    render() {
        return(
            <div>
                <div className="header">
                    <img src={logo} alt={"million thanks"} height="70" width="150"/>
                    <button name= "uploadButton" type="button" className="notClickButton" onClick={this.handleClick}>upload</button>
                    <button name= "searchButton" type="button" className="clickButton" onClick={this.handleClick}>search</button>
                </div>
                <input type="text" name="searchText" className="textField2" placeholder="enter address" onChange={this.handleChange} value={this.state.searchText}></input>
                <select name="filter" onChange={this.handleChange} >
                    <option value="name">name</option>
                    <option value="street">street</option>
                    <option value="city">city</option>
                    <option value="state">state</option>
                    <option value="zip">zip</option>
                </select>
                <button name= "submitButton" type="button" className="normalButton3" onClick={this.handleClick}>submit</button>
                <div>
                    {this.renderElement()}
                </div>

            </div>
        )
    }
}

export default SearchPage