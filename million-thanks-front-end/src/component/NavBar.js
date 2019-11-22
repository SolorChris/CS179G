import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import logo from './images/assets/banner_logo.png'
import { blue, red, blueGrey } from '@material-ui/core/colors';
import '../index.css'
import Grid from '@material-ui/core/Grid'




const theme = {
    primary: {
        light: blue[300],
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

export const NavBar = ({onClick, page}) => {
    switch(page) {
        case "upload":
                return (
                        <AppBar position="static" style={{ background: theme.tertiary.main, height:60}}>
                            <ToolBar style={{margin:0, padding:0}}>
                                <Grid container direction="row" alignItems="flex-end" spacing={1}>
                                    <Grid item >
                                        <img src={logo} height="40" width="120" style={{marginLeft: 5}}/>
                                    </Grid>
                                    <Grid item >
                                        <button name= "uploadButton" type="button" className="clickButton" style={{background: theme.primary.dark, borderColor: theme.primary.dark, marginLeft: 5}} onClick={onClick}>upload</button>
                                        <button name= "searchButton" type="button" className="notClickButton" onClick={onClick}>search</button>
                                        <button name= "mapButton" type="button" className="notClickButton" onClick={onClick}>analytic map</button>
                                    </Grid>
                                        
                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
        case "search":
                return (
                        <AppBar position="static" style={{ background: theme.tertiary.main, height:60 }}>
                            <ToolBar style={{margin:0, padding:0}}>
                            <Grid container direction="row" alignItems="flex-end" spacing={1} >
                                    <Grid item >
                                        <img src={logo} height="40" width="120" style={{marginLeft: 5}}/>
                                    </Grid>
                                    <Grid item >
                                        <button name= "uploadButton" type="button" className="notClickButton" style={{marginLeft: 5}} onClick={onClick}>upload</button>
                                        <button name= "searchButton" type="button" className="clickButton" style={{background: theme.primary.dark, borderColor: theme.primary.dark}} onClick={onClick}>search</button>
                                        <button name= "mapButton" type="button" className="notClickButton" onClick={onClick}>analytic map</button>
                                    </Grid>
                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
        case "analytic":
                return (
                        <AppBar position="static" style={{ background: theme.tertiary.main, height:60 }}>
                            <ToolBar style={{margin:0, padding:0}}>
                            <Grid container direction="row" alignItems="flex-end" spacing={1}>
                                    <Grid item >
                                        <img src={logo} height="40" width="120" style={{marginLeft: 5}}/>
                                    </Grid>
                                    <Grid item >
                                        <button name= "uploadButton" type="button" className="notClickButton" style={{marginLeft: 5}} onClick={onClick}>upload</button>
                                        <button name= "searchButton" type="button" className="notClickButton" onClick={onClick}>search</button>
                                        <button name= "mapButton" type="button" className="clickButton" style={{background: theme.primary.dark, borderColor: theme.primary.dark}} onClick={onClick}>analytic map</button>
                                    </Grid>
                                </Grid>
                            </ToolBar>
                        </AppBar>
                )
    }
    
}


export default NavBar;