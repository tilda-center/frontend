import React from 'react'
import {
  List,
} from '@material-ui/core'
import { withStore } from 'freenit'
import { MailDir } from 'components'
import { errors } from 'utils'


class Mailboxes extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { mail, notification } = this.props.store
    const response = await mail.fetchFolders()
    if (!response.ok) {
      const error = errors(response)
      notification.show(`Failed fetching folder list: ${error.message}`)
    }
  }

  render() {
    const { mail } = this.props.store
    const folders = Object.keys(mail.folders.folders)
    const folderView = folders.map(folder => (
      <MailDir
        name={folder}
        key={folder}
        data={mail.folders.folders[folder]}
      />
    ))
    return (
      <List disablePadding>
        {folderView}
      </List>
    )
  }
}


export default withStore(Mailboxes)
