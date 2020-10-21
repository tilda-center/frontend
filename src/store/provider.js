import React, { useState } from 'react'

// Pages
import {
  Auth,
  Profile,
  Resolution,
  Role,
  Store,
  User,
} from 'freenit'
import {
  Mail,
} from 'pages'
import { withRouter } from 'react-router-dom'

// Templates
import { EmptyTemplate } from 'freenit'

import Blog from 'pages/blog'


export const data = {}


const StoreProvider = (props) => {
  const store = {
    auth: new Auth.store(useState(Auth.initial.detail)),
    history: props.history,
    mail: new Mail.store(
      useState(Mail.initial.folders),
      useState(Mail.initial.selected),
      useState(Mail.initial.email),
    ),
    notification: new EmptyTemplate.store(
      useState(EmptyTemplate.initial.detail),
    ),
    profile: new Profile.store(
      useState(Profile.initial.detail),
    ),
    resolution: new Resolution.store(useState(Resolution.initial.detail)),
    role: new Role.store(
      useState(Role.initial.detail),
      useState(Role.initial.list),
    ),
    user: new User.store(
      useState(User.initial.detail),
      useState(User.initial.list),
    ),
    blog: new Blog.store(
      useState(Blog.initial.detail),
      useState(Blog.initial.list),
    ),
  }
  data.store = store
  return (
    <Store.Provider value={store}>
      {props.children}
    </Store.Provider>
  )
}


export default withRouter(StoreProvider)
