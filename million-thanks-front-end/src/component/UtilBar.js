import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { blueGrey } from '@material-ui/core/colors';



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
        light: blueGrey[300],
        main: blueGrey[500],
        dark: blueGrey[700],
    },
      
  };


export const UtilBar = ({onChange, onClick, page}) => {
    switch(page) {
        case "upload":
                return (
                    <div>
                        <AppBar position="static" style={{ background: theme.primary.light }}>
                            <ToolBar>
                            <div>
                                <input name= "selectFile" type="file" id="doupload" onChange={onChange}/>
                                <button name= "uploadFile" className="normalButton" type="button" onClick={onChange}>upload selected file</button>
                                <button name="runocr" className="normalButton" type="button" onClick={onClick}>Get Address</button>
                            </div>
                            </ToolBar>
                        </AppBar>
                    </div>
                )
        case "search":
                return (
                    <div>
                        <AppBar position="static" style={{ background: theme.primary.light }}>
                            <ToolBar>
                                <div>
                                    <input type="text" name="searchText" className="textField2" placeholder="search..." onChange={onChange} ></input>
                                    <select name="filter" onChange={onChange} >
                                        <option value="name">name</option>
                                        <option value="street">street</option>
                                        <option value="city">city</option>
                                        <option value="state">state</option>
                                        <option value="zip">zip</option>
                                    </select>
                                    <button name= "submitButton" type="button" className="normalButton3" onClick={onClick}>submit</button>
                                </div>
                            </ToolBar>
                        </AppBar>
                    </div>
                )
    }
    
}




export default UtilBar;

