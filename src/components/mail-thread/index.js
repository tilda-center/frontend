import React from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { withStore } from 'freenit'


class MailThread extends React.Component {
  readEmail = () => {
    const { mail } = this.props.store
    mail.setEmail(mail.selected.mails[this.props.identity])
  }

  render() {
    return (
      <ListItem onClick={this.readEmail}>
        <Checkbox color="primary" />
        <ListItemText
          primary={this.props.from}
          secondary={this.props.subject}
        />
      </ListItem>
    )
  }
}


MailThread.propTypes = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  identity: PropTypes.number.isRequired,
}


export default withStore(MailThread)
