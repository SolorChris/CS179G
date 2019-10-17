import React from 'react'

class UploadPage extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.name === 'searchButton')
            this.props.history.push('/search')
    }

    render() {
        return(
            <div>
                <p>upload page</p>
                <button name= "uploadButton" type="button" onClick={this.handleClick}>upload</button>
                <button name= "searchButton" type="button" onClick={this.handleClick}>search</button>
                <button name= "browseButton" type="button" onClick={this.handleClick}>browse your file</button>
                <button name= "confirmButton" type="button" onClick={this.handleClick}>confirm</button>
                <form>
                    <input type="text" name="streetNumber" placeholder="street number"></input>
                    <input type="text" name="streetName" placeholder="street name"></input>
                    <input type="text" name="city" placeholder="city"></input>
                    <input type="text" name="state" placeholder="state"></input>
                    <input type="text" name="zipcode" placeholder="zipcode"></input>
                </form>
            </div>
        )
    }
}

export default UploadPage