import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Profile,
  NoPage,
  rest,
} from 'freenit'
import {
  Auth,
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
      <Route exact path="/" component={Landing.Detail} />
      <Route exact path="/blogs" component={Blog.list} />
      <Route exact path="/blogs/:year/:month/:day/:slug" component={Blog.detail} />
      <Route exact path="/confirm/:token" component={Auth.Confirm} />
      <Route exact path="/dashboard" component={Dashboard.Detail} />
      <Route exact path="/login" component={Auth.TildaLogin} />
      <Route exact path="/mail" component={Mail.Detail} />
      <Route exact path="/profile" component={Profile.Detail} />
      <Route exact path="/register" component={Auth.Register} />
      <Route exact path="/reset" component={Auth.Reset} />
      <Route exact path="/reset/:token" component={Auth.ChangePassword} />
      <Route path="*" component={NoPage.Detail} />
    </Switch>
  )
}


export default Routing
