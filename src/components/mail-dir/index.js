import React from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { withStore } from 'freenit'
import { errors } from 'utils'


class MailDir extends React.Component {
  select = async () => {
    const { mail, notification } = this.props.store
    const identity = this.props.parent
      ? `${this.props.parent}.${this.props.name}`
      : this.props.name
    const response = await mail.select(identity)
    if (!response.ok) {
      const error = errors(response)
      notification.show(`Error selecting dir: ${error.message}`)
    }
  }

  render() {
    const { children } = this.props.data
    const childrenArray = Object.keys(children)
    const parent = this.props.parent
      ? `${this.props.parent}.${this.props.name}`
      : this.props.name
    let childrenView
    if (childrenArray.length > 0) {
      childrenView = (
        <Collapse in timeout="auto" unmountOnExit style={{ marginLeft: 10 }}>
          <List disablePadding>
            {childrenArray.map(childName => (
              <MailDir
                key={childName}
                name={childName}
                parent={parent}
                data={children[childName]}
                store={this.props.store}
              />
            ))}
          </List>
        </Collapse>
      )
    }
    return (
      <div>
        <ListItem>
          <ListItemText
            primary={this.props.name}
            onClick={this.select}
            style={{ cursor: 'pointer' }}
          />
        </ListItem>
        {childrenView}
      </div>
    )
  }
}


MailDir.propTypes = {
  data: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string,
}


export default withStore(MailDir)
