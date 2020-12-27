import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Auth,
  Profile,
  NoPage,
  rest,
} from 'freenit'
import {
  Dashboard,
  Landing,
  Mail,
  Blog,
} from 'pages'


const API_ROOT = '/api/v0'
window.rest = rest(API_ROOT)
window.rest.API_ROOT = API_ROOT


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing.detail} />
      <Route exact path="/confirm/:token" component={Auth.confirm} />
      <Route exact path="/dashboard" component={Dashboard.detail} />
      <Route exact path="/login" component={Auth.login} />
      <Route exact path="/blogs" component={Blog.list} />
      <Route exact path="/blogs/:year/:month/:day/:slug" component={Blog.detail} />
      <Route exact path="/mail" component={Mail.detail} />
      <Route exact path="/profile" component={Profile.detail} />
      <Route exact path="/register" component={Auth.register} />
      <Route exact path="/reset" component={Auth.reset} />
      <Route exact path="/reset/:token" component={Auth.changePassword} />
      <Route path="*" component={NoPage.detail} />
    </Switch>
  )
}


export default Routing
