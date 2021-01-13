import React from 'react'
import moment from 'moment'
import {
  TextField,
  Switch,
  Button,
} from '@material-ui/core'
import {
  errors,
  withStore,
} from 'freenit'
import ContentEditable from 'react-contenteditable'

import Template from 'templates/default/detail'
import styles from './styles'


class BlogDetail extends React.Component {
  state = {
    blog: {},
    fetched: false,
  }

  constructor(props) {
    super(props)
    this.contentEditable = React.createRef()
    this.fetch()
  }

  fetch = async () => {
    const { blog, history, notification } = this.props.store
    const { year, month, day, slug } = this.props.match.params
    const d = moment(`${year}/${month}/${day}`)
    if (d.isValid()) {
      const response = await blog.get(year, month, day, slug)
      if (!response.ok) {
        const error = errors(response)
        notification.show(error.message)
        history.push(`/blogs`)
        return
      }
      this.setState({
        blog: response,
        author: response.author,
        content: response.content,
        title: response.title,
        published: response.published,
        fetched: true,
      })
    }
  }

  handleEventDelete = async () => {
    const { blog, history, notification } = this.props.store
    const { year, month, day, slug } = this.props.match.params
    const response = await blog.delete(year, month, day, slug)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
      return
    } else {
      history.push(`/blogs`)
      return
    }
  }

  handleEventSave = async () => {
    const { blog, notification } = this.props.store
    const { year, month, day, slug } = this.props.match.params
    const data = {
      content: this.state.content,
      title: this.state.title,
      published: this.state.published,
    }
    const response = await blog.patch(year, month, day, slug, data)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
      return
    }
  }

  handlePublished = (published) => {
    this.setState({ published: published.target.checked })
  }

  handleTitle = (title) => {
    this.setState({ title: title.target.value })
  }

  handleContent = (content) => {
    this.setState({ content: content.target.value })
  }

  createMarkup(blog) {
    return { __html: blog }
  }

  render() {
    const { fetched } = this.state
    if (!fetched) { return null }
    const { year, month, day } = this.props.match.params
    const { author } = this.state
    return (
      <Template>
        <div style={styles.div_title}>
          <ContentEditable
            style={styles.editable_title}
            innerRef={this.contentEditable}
            html={this.state.title}
            disabled={!this.props.store.auth.detail.ok}
            onChange={this.handleTitle}
            tagName="h2"
          />
          <h4 style={styles.subtitle}>
            wrote on {day}.{month}.{year} by {author.email}
          </h4>
        </div>
        {this.props.store.auth.detail.ok ? (
        <div>
          <TextField
            onChange={this.handleContent}
            value={this.state.content}
            style={styles.content_edit}
          />
          <div style={styles.hanging_element}>
            <Switch
              checked={this.state.published}
              value={this.state.published}
              onChange={this.handlePublished}
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={this.handleEventDelete}
            >
              Delete
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleEventSave}
            >
              Save
            </Button>
          </div>
        </div>
        ) : null}
        <div dangerouslySetInnerHTML={this.createMarkup(this.state.content)} />
      </Template>
    )
  }
}


export default withStore(BlogDetail)
