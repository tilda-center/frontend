import React from "react";
import PropTypes from "prop-types";
import { errors, withStore } from "freenit";

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
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";

import Template from "templates/default/detail";
import styles from "./styles";

class BlogList extends React.Component {
  state = {
    createOpen: false,
    editOpen: false,
    list: [],
    selectedFile: null,
    year: new Date().getFullYear(),
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { blog, notification } = this.props.store;
    const response = await blog.fetch();
    if (!response.ok) {
      const error = errors(response);
      notification.show(error.message);
    } else {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].date = new Date(response.data[i].date);
      }
      this.setState({ list: response.data });
    }
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async () => {
    const formData = new FormData();
    const { blog, notification } = this.props.store;

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const response = await blog.upload(formData);
    if (!response.ok) {
      const error = errors(response);
      notification.show(error.message);
    } else {
      this.setState({ link: response.link });
    }
  };

  handleOpenCreate = () => {
    this.setState({ createOpen: true });
  };

  handleCloseCreateCancel = () => {
    this.setState({ createOpen: false });
  };

  handleCloseCreateSuccess = (response) => {
    this.setState({ createOpen: false, list: response.data });
  };

  handleEventCreate = async () => {
    const formData = new FormData();
    const { blog, notification } = this.props.store;

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const response = await blog.upload(formData);
    if (!response.ok) {
      const error = errors(response);
      notification.show(error.message);
    } else {
      const list_response = await this.props.store.blog.post({
        content: this.state.content,
        title: this.state.title,
        image: response.link,
      });
      if (!list_response.ok) {
        const error = errors(list_response);
        notification.show(error.message);
      } else {
        for (var i = 0; i < list_response.data.length; i++) {
          list_response.data[i].date = new Date(list_response.data[i].date);
        }
        this.handleCloseCreateSuccess(list_response);
      }
    }
  };
  handleContent = (content) => {
    this.setState({ content: content.target.value });
  };
  handleSlug = (slug) => {
    this.setState({ slug: slug.target.value });
  };
  handleTitle = (title) => {
    this.setState({ title: title.target.value });
  };
  handlePub = (published) => {
    this.setState({ published: published.target.checked });
  };

  handleEvent = (year, month, day, slug) => async () => {
    const { blog, history, notification } = this.props.store;
    const response = await blog.get(year, month, day, slug);
    if (!response.ok) {
      const error = errors(response);
      notification.show(error.message);
    } else {
      history.push(`blogs/${year}/${month}/${day}/${slug}`);
    }
  };
  createMarkup(blog) {
    return { __html: blog };
  }
  render() {
    const blogsView = this.state.list.map((blog) => (
      <Paper
        style={styles.card_container}
        onClick={this.handleEvent(
          blog.date.getFullYear(),
          blog.date.getMonth() + 1,
          blog.date.getUTCDate(),
          blog.slug
        )}
      >
        <div
          style={{
            height: 120,
            width: 120,
            backgroundImage: `url(${blog.image})`,
            backgroundSize: "100% 100%",
            marginRight: 20,
          }}
        />

        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content.slice(0,35) + "..."}</p>
        </div>
      </Paper>
    ));

    return (
      <Template>
        <div
          style={styles.grid}
        >
          {blogsView}
        </div>
        {this.props.store.auth.detail.ok ? (
          <Fab
            style={styles.button}
            color="primary"
            onClick={this.handleOpenCreate}
            data-id="add"
          >
            <AddIcon />
          </Fab>
        ) : null}

        <Dialog maxWidth='xl' fullWidth='true'open={this.state.createOpen}>
          <DialogTitle style={styles.editable_title} >Add new blog</DialogTitle>
          <DialogContent>
            <TextField
              label="content"
              onChange={this.handleContent}
              value={this.state.content}
            />

            <TextField
              label="title"
              style={styles.editable_title}
              onChange={this.handleTitle}
              value={this.state.title}
            />

            <div>
              <input type="file" onChange={this.onFileChange} />
            </div>

            <Paper style={{}}>
              <div
                dangerouslySetInnerHTML={this.createMarkup(this.state.content)}
              />
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreateCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEventCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Template>
    );
  }
}

export default withStore(BlogList);
