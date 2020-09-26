import React from 'react'
import {
  List,
} from '@material-ui/core'
import { withStore } from 'freenit'
import { MailThread } from 'components'


class MailList extends React.Component {
  render() {
    const { mail } = this.props.store
    const mailThreads = mail.selected.ok
      ? mail.selected.mails.map((message, index) => (
        <MailThread
          from={message.fromAddr}
          subject={message.subject}
          identity={index}
          key={index}
        />
      ))
      : null
    return (
      <List disablePadding>
        {mailThreads}
      </List>
    )
  }
}


export default withStore(MailList)
