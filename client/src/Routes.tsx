import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import LandingPage from './pages/landing'
import Author from './components/Author'
import Register from './components/SignUpForm'
import userHome from './pages/userHome'
import resetLink from './pages/resetPassword/resetPasswordLink'
import ResetPassword from './pages/newPassword'
import UpdatePassword from './pages/updatePassword'
const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/author" component={Author} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={userHome} />
    <Route exact path="/forgetPassword" component={resetLink} />
    <Route exact path="/updatePassword/:token" component={ResetPassword} />
    <Route exact path="/updatePassword" component={UpdatePassword} />



  </Switch>
)

export default Routes
