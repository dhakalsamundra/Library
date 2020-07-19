import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import LandingPage from './pages/landing'
import Author from './components/Author'
const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/author" component={Author} />
  </Switch>
)

export default Routes
