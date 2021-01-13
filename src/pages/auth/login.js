import React from 'react'
import {
  withStore,
  Auth,
}
from 'freenit'


class TildaAuth extends React.Component {
  onSuccess = (email, password) => {
    this.props.store.jabber.connect(email, password)
  }

  render() {
    return <Auth.Login onSuccess={this.onSuccess} />
  }
}


TildaAuth.propTypes = {
}


export default withStore(TildaAuth)
