import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import '../index.css'
import mapMarker from './marker.png'
import NavBar from './NavBar'


const MAPBOX_TOKEN = 'pk.eyJ1IjoidGhhbnBoYW4iLCJhIjoiY2syenR4eTRxMGxpdDNvczFkdXpwdzdoOCJ9.KrNalqwF-I2hxXP9ikMzVA'

class AnalyticMap extends React.Component {
    constructor() {
        super()
        this.state = {
            data : null,
            selected : [],
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
        this.handleButton = this.handleButton.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount() {
        // initialize data
        let d = [{'key':1, 'address': '123 somewhere', 'latitude':43.142, 'longitude':-85.049}, 
                 {'key':2, 'address': '234 I dont know', 'latitude':45.255, 'longitude':-93.287},
                 {'key':3, 'address': '345 no idea', 'latitude':33.718, 'longitude':-83.801},]

        this.setState({data:d})//, () => console.log(this.state.data))
    }

    handleClick(event) {
        if (event.target.name === 'uploadButton') {
            this.props.history.push('/')
        }
        else if (event.target.name === 'searchButton') {
            this.props.history.push('/search')
        }
    }

    handleButton(event, elems) {
        //this.setState({selected : [...this.state.selected, elems]})
        event.preventDefault()
    }

    viewChange(view) {
        this.setState({viewport:view})
    }

    render() {
        return(
            <div>
                <NavBar onClick={this.handleClick} page="analytic" ></NavBar>
                <div>
                    <ReactMapGL 
                        {...this.state.viewport} 
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onViewportChange = {viewport => {this.viewChange(viewport)}}
                    >
                        {this.state.data.map(coords => (
                            <Marker
                                key={coords['key']}
                                latitude={coords['latitude']}
                                longitude={coords['longitude']}
                            >
                                <div>
                                    <form name="locationButton" onClick={e => this.handleButton(e, coords)}>
                                        <input type="image" src={mapMarker} height="25" width="25" alt="user address"/>
                                    </form>
                                </div>
                            </Marker>
                        ))}

                    </ReactMapGL>
                </div>
            </div>
        )
    }

}

export default AnalyticMap