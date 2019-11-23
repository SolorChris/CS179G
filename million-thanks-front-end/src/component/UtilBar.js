import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import {  blue, red, blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid'


const theme = {
    primary: {
        light: blue[100],
        main: blue[500],
        dark: blue[700],
        lightA: blue.A200,
        mainA: blue.A400,
        darkA: blue.A700,
    },
    secondary: {
        light: red[300],
        main: red[500],
        dark: red[700],
        lightA: red.A200,
        mainA: red.A400,
        darkA: red.A700,
    },
    tertiary: {
        light: blueGrey[100],
        main: blueGrey[300],
        dark: blueGrey[500],
    },
      
  };



export const UtilBar = ({onChange, onClick, page}) => {
    switch(page) {
        case "upload":
                return (
                        <AppBar position="static" style={{ background: theme.primary.dark, height: 30, }} >
                            <ToolBar style={{margin:0, padding:0}}>
                                <Grid container direction="row" alignItems="center" spacing={1} style={{marginLeft: 5, marginBottom:30}}>
                                    <Grid item >
                                        <input name= "selectFile" type="file" id="doupload" onChange={onChange}  />
                                    </Grid>
                                    <Grid item >
                                        <button name= "uploadFile" className="utilButton" type="button" onClick={onChange} style={{backgroundColor: theme.tertiary.main, borderColor: theme.tertiary.main}}>upload selected file</button>
                                    </Grid>
                                    <Grid item >
                                        <button name="runocr" className="utilButton" type="button" onClick={onClick} style={{backgroundColor: theme.tertiary.main, borderColor: theme.tertiary.main}}>Get Address</button>
                                    </Grid>
                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
        case "search":
                return (
                        <AppBar position="static" style={{ background: theme.primary.dark, height: 30 }}>
                            <ToolBar style={{margin:0, padding:0}}>
                                <Grid container direction="row" alignItems="center" spacing={1} style={{marginLeft: 5, marginBottom:30}}>
                                    <Grid item >
                                        <input type="text" name="searchText" className="textField2" placeholder="search..." onChange={onChange} style={{backgroundColor: theme.primary.light, borderColor: theme.tertiary.main}}></input>
                                    </Grid>
                                    <Grid item >
                                        <select name="filter" onChange={onChange} >
                                            <option value="name">name</option>
                                            <option value="street">street</option>
                                            <option value="city">city</option>
                                            <option value="state">state</option>
                                            <option value="zip">zip</option>
                                        </select>
                                    </Grid>
                                    <Grid item >
                                        <button name= "submitButton" type="button" className="utilButton" onClick={onClick} style={{backgroundColor: theme.tertiary.main, borderColor: theme.tertiary.main}}>submit</button>
                                    </Grid>
                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
        case "analytic":
                return (
                        <AppBar position="static" style={{ background: theme.primary.dark, height: 30 }}>
                            <ToolBar style={{margin:0, padding:0}}>
                                <Grid container direction="row" alignItems="center" spacing={1} style={{marginLeft: 5, marginBottom:30}}>

                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
        default: return(<div></div>)
    }
    
}




export default UtilBar;

