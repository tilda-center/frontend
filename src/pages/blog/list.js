import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  TextField,
  Checkbox,
  CardMedia,
  FormControlLabel,
  Card,
} from '@material-ui/core'

// Icons
import AddIcon from '@material-ui/icons/Add'

import Template from 'templates/default/detail'
import styles from './style'


class BlogList extends React.Component {
  state = {
    createOpen: false,
    list: [],
    selectedFile: null,
    year: new Date().getFullYear(),
  }

  componentDidMount(){
      this.fetch()
  }

  fetch = async () => {
    const { blog, notification } = this.props.store
    const response = await blog.fetch()
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    } else {
      for (var i = 0; i< response.data.length; i++){
        response.data[i].date = new Date(response.data[i].date)
      }
      this.setState({ list: response.data })
    }
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async () => {
    const formData = new FormData();
    const { blog, notification } = this.props.store

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const response = await blog.upload(formData)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    } else {
      this.setState({ link: response.link })
    }
  }

  handleOpenCreate = () => {
    this.setState({ createOpen: true })
  }

  handleCloseCreate = (response) => {

    this.setState({ createOpen: false,
                    list: response.data,
                  })
  }

  handleEventCreate = async () => {
    const formData = new FormData();
    const { blog, notification } = this.props.store

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const response = await blog.upload(formData)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    } else {
      const list_response = await this.props.store.blog.post(
        {
          "content": this.state.content,
          "published": this.state.published,
          "title": this.state.title,
          "slug": this.state.slug,
          "image": response.link,
      })
      if (!list_response.ok) {
        const error = errors(list_response)
        notification.show(error.message)
      } else {
        for (var i = 0; i< list_response.data.length; i++){
          list_response.data[i].date = new Date(list_response.data[i].date)
        }
        this.handleCloseCreate(list_response)
      }
    }
  }
  handleContent = (content) => {
    this.setState({ content: content.target.value })
  }
  handleSlug = (slug) => {
    this.setState({ slug: slug.target.value })
  }
  handleTitle = (title) => {
    this.setState({ title: title.target.value })
  }
  handlePub = (published) => {
    this.setState({ published: published.target.checked })
  }

  handleEvent = (year, month, day, slug) => async () => {
    const { blog, history, notification } = this.props.store
    const response = await blog.get(year, month, day, slug)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    } else {
      history.push(`blogs/${year}/${month}/${day}/${slug}`)
    }
  }
  createMarkup(blog) {
    return {__html: blog}
  }
  render() {
    const blogsView = this.state.list.map(blog => (
        <Card style={styles.card}>
          <h2 key={blog.id} style={styles.title}>
            <span
              onClick={this.handleEvent(blog.date.getFullYear(),
                                        blog.date.getMonth()+1,
                                        blog.date.getUTCDate(),
                                        blog.slug
                                      )}
            >
              {blog.slug}
                    </span>
          </h2>
          <img style={styles.card_img} src={blog.image}/>

        </Card>

      ))

    return (
      <Template style={{}}>
        <Paper style={styles.card_container}>
          {blogsView}
        </Paper>

        {this.props.store.auth.detail.ok?
          <Fab style={styles.button}color="primary" onClick={this.handleOpenCreate} data-id="add">
          <AddIcon />
          </Fab>
          : null}

          <Dialog open={this.state.createOpen}>
          <DialogTitle>Add new Blog</DialogTitle>
          <DialogContent>
            <TextField
              label="content"
              onChange={this.handleContent}
              value={this.state.content}
            />

            <TextField
              label="slug"
              onChange={this.handleSlug}
              value={this.state.slug}
            />
            <TextField
              label="title"
              onChange={this.handleTitle}
              value={this.state.title}
            />
            <FormControlLabel
              control={
                <Checkbox
                  label="published"
                  onChange={this.handlePub}
                  checked={this.state.published}
                />
              }
              label="published"
            />

            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>

            <Paper style={{}}>
            <div dangerouslySetInnerHTML={this.createMarkup(this.state.content)} />
            </Paper>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreate} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEventCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Template>
    )
  }
}


export default withStore(BlogList)
