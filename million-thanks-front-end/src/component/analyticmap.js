import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import '../index.css'
import mapMarker from './marker.png'
import NavBar from './NavBar'
import UtilBar from './UtilBar'



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
        fetch("http://localhost:3200/analyticmap?run=yes")
        .then(response => response.json())
                .then(result => {
                    for (let i = 0; i < result.length; ++i) {
                        result[i]['customer_latitude'] = parseFloat(result[i]['customer_latitude'])
                        result[i]['customer_longitude'] = parseFloat(result[i]['customer_longitude'])
                    }
                    this.setState({data:result})//, () => console.log("map: ", this.state.data))
                })
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
        if (this.state.data != null) {
            return(
                <div>
                    <NavBar onClick={this.handleClick} page="analytic" ></NavBar>
                    <UtilBar page="analytic" ></UtilBar>
                    
                    <div>
                        <ReactMapGL 
                            {...this.state.viewport} 
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            onViewportChange = {viewport => {this.viewChange(viewport)}}
                        >
                            {this.state.data.map((coords, i) => (
                                <Marker
                                    key={i}
                                    latitude={coords['customer_latitude']}
                                    longitude={coords['customer_longitude']}
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
        else {
            return (<p></p>)
        }
    }
}

export default AnalyticMap