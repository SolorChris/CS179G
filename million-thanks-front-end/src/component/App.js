import React from 'react'
import SearchPage from './component/searchpage.js'
import UploadPage from './component/uploadpage.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UploadPage}/>
        <Route exact path="/search" component={SearchPage}/>
      </Switch>
    </Router>
  );
}

export default App;
