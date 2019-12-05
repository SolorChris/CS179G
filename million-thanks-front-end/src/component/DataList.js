import React from 'react'
import { Checkbox} from '@material-ui/core'
import {makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField}from '@material-ui/core'
import '../index.css'




export const DataList = ({click, handle, data, display, page}) => {
    const classes = makeStyles(theme => ({
        root: {
        width: '100%',
        displayimg: false,
        getimg: null,
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        },
        table: {
        minWidth: 650,
        },
    }))
    
    switch(page) {
        case "upload":
            if (display === true) {
                console.log(data)
                return(
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
                                <TableCell align="right">File Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data[1].map((row,i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    <TextField value={row.customer_name} onChange={e => handle(e, i, "customer_name")}/>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField value={row.customer_street} onChange={e => handle(e, i, "customer_street")}/>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField value={row.customer_city} onChange={e => handle(e, i, "customer_city")}/>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField value={row.customer_state} onChange={e => handle(e, i, "customer_state")}/>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField value={row.customer_zip} onChange={e => handle(e, i, "customer_zip")}/>
                                </TableCell>
                                <TableCell align="right">{row.file_name}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </Paper>
                        <button name= "confirmButton" className="clickButton" type="button" onClick={click} >confirm</button>
                        handleCellClick(data.i.row.file_name , event)
                      {
                            <img src={'.storage/'+data.i.row.file_name } height="920" width="920"/>
                        } 
                    {/*  handleCellClick(row.file_name ,i,event)
                      {
                            <img src={'.storage/'+row.file_name } height="920" width="920"/>
                        }*/ }
                        
                    </div>
                )
            }
            //getimg = {row.file_name}
            else {
                return(
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
                                <TableCell align="right">File Name</TableCell>
                            </TableRow>
                        </TableHead>
                        </Table>
                        </Paper>
                    </div>
                )
            }
            
        case "search":
            if (display === true) {
                console.log(data)
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
                        {data.map(row => (
                        <TableRow key={row.customer_name}>
                            <TableCell component="th" scope="row">{row.customer_name}</TableCell>
                            <TableCell align="right">{row.customer_street_1}</TableCell>
                            <TableCell align="right">{row.customer_city}</TableCell>
                            <TableCell align="right">{row.customer_state}</TableCell>
                            <TableCell align="right">{row.customer_zip}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    </Paper>
                </div>
                )
            }
            else {
                return(
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
                        </Table>
                        </Paper>
                    </div>
                    )
            }
        default: return(<div></div>)
            
    }
    
}




export default DataList;

