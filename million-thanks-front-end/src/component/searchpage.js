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

class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedValue: "fullAddress",
            displayTable: false,
            address: null
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
            if (this.state.selectedValue === "fullAddress") {
                console.log(this.state.selectedValue)
                let addr = [{'street':'123 hello','city':'river','state':'CA','zipcode':'11111'},
                        {'street':'321 world','city':'side','state':'CA','zipcode':'22222'}]
                this.setState({address:addr})
            }
            else if (this.state.selectedValue === "addressNumber") {
                console.log(this.state.selectedValue)
            }
            else if (this.state.selectedValue === "streetName") {
                console.log(this.state.selectedValue)
            }
            else if (this.state.selectedValue=== "state") {
                console.log(this.state.selectedValue)
            }
            else if (this.state.selectedValue === "zipcode") {
                console.log(this.state.selectedValue)
            }
            this.setState({displayTable : true})
        }
    }

    handleChange(event) {
        if (event.target.value === "fullAddress") {
            this.setState({selectedValue : event.target.value})
        }
        else if (event.target.value === "addressNumber") {
            this.setState({selectedValue : event.target.value})
        }
        else if (event.target.value === "streetName") {
            this.setState({selectedValue : event.target.value})
        }
        else if (event.target.value === "state") {
            this.setState({selectedValue : event.target.value})
        }
        else if (event.target.value === "zipcode") {
            this.setState({selectedValue : event.target.value})
        }
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
        console.log(this.state.address)
        if (this.state.displayTable === true) {
            return (
                <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    <TableCell>street</TableCell>
                    <TableCell align="right">city</TableCell>
                    <TableCell align="right">state</TableCell>
                    <TableCell align="right">zipcode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.address.map(row => (
                    <TableRow key={row.street}>
                        <TableCell component="th" scope="row">
                        {row.street}
                        </TableCell>
                        <TableCell align="right">{row.city}</TableCell>
                        <TableCell align="right">{row.state}</TableCell>
                        <TableCell align="right">{row.zipcode}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
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
                <input type="text" name="searchField" className="textField2" placeholder="enter address"></input>
                <select onChange={this.handleChange}>
                    <option value="fullAddress">search by full address</option>
                    <option value="addressNumber">search by address number</option>
                    <option value="streetName">search by street name</option>
                    <option value="state">search by state</option>
                    <option value="zipcode">search by zipcode</option>
                </select>
                <button name= "submitButton" type="button" className="normalButton3" onClick={this.handleClick}>submit</button>
                <div>{this.renderElement()}</div>
            </div>
        )
    }
}

export default SearchPage