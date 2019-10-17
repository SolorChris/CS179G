import React from 'react'

class SearchPage extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.name === "uploadButton")
            this.props.history.goBack()
    }

    render() {
        return(
            <div>
                <p>Search Page</p>
                <button type="button" name="uploadButton" onClick={this.handleClick}>upload</button>
                <button type="button" name="searchButton" onClick={this.handleClick}>search</button>
            </div>
        )
    }
}

export default SearchPage