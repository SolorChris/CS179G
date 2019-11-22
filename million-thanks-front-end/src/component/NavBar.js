import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import logo from './images/assets/banner_logo.png'
import {  blue, red, blueGrey } from '@material-ui/core/colors';
import '../index.css'



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
                    <div>
                        <AppBar position="static" style={{ background: theme.tertiary.main }}>
                            <ToolBar>
                                <div>
                                    <img src={logo} alt={"million thanks"} height="40" width="120" style={{marginTop:5, marginRight:10}}/>
                                    <button name= "uploadButton" type="button" className="clickButton" onClick={onClick}>upload</button>
                                    <button name= "searchButton" type="button" className="notClickButton" onClick={onClick}>search</button>
                                    <button name= "mapButton" type="button" className="notClickButton" onClick={onClick}>analytic map</button>
                                </div>
                            </ToolBar>
                        </AppBar>
                    </div>
                )
        case "search":
                return (
                    <div>
                        <AppBar position="static" style={{ background: theme.tertiary.main }}>
                            <ToolBar>
                                <div>
                                    <img src={logo} alt={"million thanks"} height="40" width="120" style={{marginTop:5, marginRight:10}}/>
                                    <button name= "uploadButton" type="button" className="notClickButton" onClick={onClick}>upload</button>
                                    <button name= "searchButton" type="button" className="clickButton" onClick={onClick}>search</button>
                                    <button name= "mapButton" type="button" className="notClickButton" onClick={onClick}>analytic map</button>
                                </div>
                            </ToolBar>
                        </AppBar>
                    </div>
                )
        case "analytic":
                return (
                    <div>
                        <AppBar position="static" style={{ background: theme.tertiary.main }}>
                            <ToolBar>
                                <div>
                                <   img src={logo} alt={"million thanks"} height="40" width="120" style={{marginTop:5, marginRight:10}}/>
                                    <button name= "uploadButton" type="button" className="notClickButton" onClick={onClick}>upload</button>
                                    <button name= "searchButton" type="button" className="notClickButton" onClick={onClick}>search</button>
                                    <button name= "mapButton" type="button" className="clickButton" onClick={onClick}>analytic map</button>
                                </div>
                            </ToolBar>
                        </AppBar>
                    </div>
                )
    }
    
}


export default NavBar;