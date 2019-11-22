import React, { useState } from 'react'
import '../index.css'
import {makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper }from '@material-ui/core'
import { Checkbox, Tab } from '@material-ui/core'
import { unwatchFile } from 'fs'
import { inspect } from 'util'
import NavBar from './NavBar'
import UtilBar from './UtilBar'
import DataList from './DataList'


class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: "name",
            displayTable: false,
            addresses: null,
            selectedAddress: null,
            searchText: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(event, row) {
        /*
        this.setState( prevState => ({selectedAddress : [...prevState.selectedAddress, row]}))
        console.log(this.state.selectedAddress)
        console.log(row)
        console.log("hello world")*/
    }

    handleClick(event) {
        if (event.target.name === "uploadButton") {
            this.props.history.push('/')
        }
        else if (event.target.name === "mapButton") {
            this.props.history.push('/analyticmap')
        }
        else if (event.target.name === "submitButton") {
            this.setState({displayTable : false})
            if(this.state.searchText) {
                return fetch("http://localhost:3200/search?text=" + this.state.searchText + "&filter=" + this.state.filter)
                .then(response => response.json())
                .then(data => {
                    this.setState({ addresses: data,
                                    displayTable: true})
                })
            }
        }
        else if (event.target.name === "submitAddress") {
            console.log(this.state.selectedAddress)
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
    

    render() {
        return(
            <div>
                <NavBar onClick={this.handleClick} page="search" ></NavBar>
                <UtilBar onChange={this.handleChange} onClick={this.handleClick} page="search" ></UtilBar>
                <DataList handle={this.handleSelect} data={this.state.addresses} display={this.state.displayTable} page="search" ></DataList>
            </div>
        )
    }
}

export default SearchPage