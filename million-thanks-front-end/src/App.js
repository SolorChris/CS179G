import React from 'react'
import SearchPage from './component/searchpage.js'
import UploadPage from './component/uploadpage.js'
import AnalyticMap from './component/analyticmap.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UploadPage}/>
        <Route exact path="/search" component={SearchPage}/>
        <Route exact path="/analyticmap" component={AnalyticMap}/>
      </Switch>
    </Router>
  );
}

export default App
