import React from 'react'
import ReactMapGL from 'react-map-gl'
import '../index.css'
import logo from './images/assets/banner_logo.png'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGhhbnBoYW4iLCJhIjoiY2syenR4eTRxMGxpdDNvczFkdXpwdzdoOCJ9.KrNalqwF-I2hxXP9ikMzVA'

class AnalyticMap extends React.Component {
    constructor() {
        super()
        this.state = {
            data : null,
            viewport: {
                latitude: 40,
                longitude: -100,
                width: '100vw',
                height: '100vh',
                zoom: 3,
                bearing: 0,
                pitch: 0
              }
        }
        this.viewChange = this.viewChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        // initialize data
    }

    handleClick(event) {
        if (event.target.name === 'uploadButton') {
            this.props.history.push('/')
        }
        else if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }
    }

    viewChange(view) {
        this.setState({viewport:view})
    }

    render() {
        return(
            <div>
                <div className="header">
                    <img src={logo} alt={"million thanks"} height="70" width="150"/>
                    <button name= "uploadButton" type="button" className="notClickButton" onClick={this.handleClick}>upload</button>
                    <button name= "searchButton" type="button" className="notClickButton" onClick={this.handleClick}>search</button>
                    <button name= "mapButton" type="button" className="clickButton" onClick={this.handleClick}>analytic map</button>
                </div>
                <div>
                    <ReactMapGL 
                        {...this.state.viewport} 
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onViewportChange = {viewport => {this.viewChange(viewport)}}
                    >
                    </ReactMapGL>
                </div>
            </div>
        )
    }

}

export default AnalyticMap