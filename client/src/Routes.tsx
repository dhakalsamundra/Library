import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import LandingPage from './pages/landing'
const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/home" component={Home} />
  </Switch>
)

export default Routes
