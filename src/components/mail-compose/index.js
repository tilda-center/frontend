import React from 'react'
import Resumable from 'resumablejs'
import {
  Button,
  Dialog,
  Fab,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from '@material-ui/core'
import {
  Add,
  Message,
  AttachFile,
} from '@material-ui/icons'
import {
  getCookie,
  withStore,
} from 'freenit'
import { errors } from 'utils'


const initialState = {
  bcc: '',
  bccError: '',
  cc: '',
  ccError: '',
  files: [],
  message: '',
  pane: 'compose',
  progress: 0,
  subject: '',
  subjectError: '',
  to: '',
  toError: '',
  uploading: false,
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const k = 1024
const M = 1024 * k
const G = 1024 * M


class MailCompose extends React.Component {
  state = initialState

  fileInput = React.createRef()

  setPane = (pane) => () => {
    this.setState({ pane })
  }

  setValue = (value) => (event) => {
    const error = `${value}Error`
    this.setState({
      [value]: event.target.value,
      [error]: '',
    })
  }

  close = () => {
    this.setState(initialState)
    this.props.onClose()
  }

  send = async () => {
    let ok = true
    const { mail, notification } = this.props.store
    if (this.state.to === '') {
      ok = false
      this.setState({ toError: 'Can not be empty' })
    } else if (!emailRegex.test(this.state.to)) {
      ok = false
      this.setState({ toError: 'Invalid email address' })
    }
    if (this.state.cc !== '' && !emailRegex.test(this.state.cc)) {
      ok = false
      this.setState({ ccError: 'Invalid email address' })
    }
    if (this.state.bcc !== '' && !emailRegex.test(this.state.bcc)) {
      ok = false
      this.setState({ bccError: 'Invalid email address' })
    }
    if (this.state.message === '') {
      ok = false
      notification.show('Message can not be empty')
    }
    if (!ok) { return }
    const { to, cc, bcc, subject, message } = this.state
    const response = await mail.send(to, subject, message, cc, bcc)
    if (!response.ok) {
      const error = errors(response)
      notification.show(`Error sending email: ${error.message}`)
    } else {
      this.close()
    }
  }

  openAttach = () => {
    this.fileInput.current.click()
  }

  attachFiles = (event) => {
    this.setState({ progress: 0 })
    for (let i = 0; i < event.target.files.length; ++i) {
      const reader = new FileReader()
      const file = event.target.files[i]
      reader.onload = (e) => this.setState(
        prevState => ({
          files: [
            ...prevState.files,
            {
              file,
              data: e.target.result,
            },
          ],
        }),
      )
      reader.readAsDataURL(event.target.files[i])
    }
  }

  handleUploadStart = () => {
    const cookie = getCookie('csrf_access_token')
    const uploader = new Resumable({
      simultaneousUploads: 1,
      target: this.props.target,
      testChunks: false,
      headers: { 'X-CSRF-TOKEN': cookie },
    })
    this.setState({ uploading: true })
    uploader.on('filesAdded', () => uploader.upload())
    uploader.on(
      'error',
      (message, file) => {
        const { notification } = this.props.store
        this.setState({ progress: 0, uploading: false })
        const err = `Upload failed on file ${file}! Error message: ${message}`
        notification.show(err)
      },
    )
    uploader.on(
      'progress',
      () => {
        const { notification } = this.props.store
        const progress = uploader.progress() * 100
        const uploading = progress < 100
        this.setState({ progress, uploading })
        if (!uploading) {
          notification.show('Files uploaded')
          this.setState({ files: [] })
        }
      },
    )
    uploader.addFiles(this.state.files.map(file => file.file))
  }

  removeFile = (file) => () => {
    const files = this.state.files.filter(f => f.file.name !== file.file.name)
    this.setState({ files })
  }


  render() {
    const view = this.state.pane === 'compose'
      ? (
        <div style={{ padding: 10, flex: 1 }}>
          <textarea
            style={{ resize: "none", width: "100%", height: "100%", border: "none" }}
            value={this.state.message}
            onChange={this.setValue('message')}
          />
        </div>
      ) : (
        <div style={{ flex: 1, position: "relative", padding: 10, display: "grid", gridTemplateColumns: "repeat(3, 130px)", alignItems: "start", gridGap: 10 }}>
          <Fab
            style={{ position: "absolute", bottom: 10, right: 10 }}
            color="primary"
            onClick={this.openAttach}
          >
            <Add />
          </Fab>
          {
            this.state.files.map(file => {
              const name = file.file.name.length > 20
                ? `${file.file.name.substring(1, 20)}...`
                : file.file.name
              let size
              let suffix
              if (file.file.size > G) {
                size = file.file.size / G
                suffix = 'GB'
              } else if (file.file.size > M) {
                size = file.file.size / M
                suffix = 'MB'
              } else if (file.file.size > k) {
                size = file.file.size / k
                suffix = 'kB'
              } else {
                size = file.file.size
                suffix = 'B'
              }
              size = size.toFixed(2)
              return (
                <Paper
                  style={{ height: '100%', width: '100%', position: "relative" }}
                  key={`${file.file.name}`}
                >
                  <div
                    onClick={this.removeFile(file)}
                    style={{ cursor: 'pointer', position: "absolute", top: 0, right: 5, color: "#888", zIndex: 100 }}
                  >
                    x
                  </div>
                  <ListItem>
                    <ListItemText primary={name} secondary={`${size}${suffix}`} />
                  </ListItem>
                </Paper>
              )
            })
          }
        </div>
      )
    return (
      <Dialog open={this.props.open}>
        <div style={{ height: "80vh", maxHeight: 700, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 20, backgroundColor: "#eee", borderBottom: "1px solid #aaa" }}>
            <TextField
              fullWidth
              autoFocus
              label={this.state.toError === '' ? 'To' : this.state.toError}
              error={this.state.toError !== ''}
              value={this.state.to}
              onChange={this.setValue('to')}
            />
            <div>
              <TextField
                style={{ width: "49%", marginRight: "2%" }}
                value={this.state.cc}
                label={this.state.ccError === '' ? 'Cc' : this.state.ccError}
                error={this.state.ccError !== ''}
                onChange={this.setValue('cc')}
              />
              <TextField
                style={{ width: "49%" }}
                value={this.state.bcc}
                label={this.state.bccError === '' ? 'Bcc' : this.state.bccError}
                error={this.state.bccError !== ''}
                onChange={this.setValue('bcc')}
              />
            </div>
            <TextField
              fullWidth
              label="Subject"
              value={this.state.subject}
              onChange={this.setValue('subject')}
            />
            <IconButton
              disabled={this.state.pane === 'compose'}
              onClick={this.setPane('compose')}
            >
              <Message />
            </IconButton>
            <IconButton
              disabled={this.state.pane === 'attachment'}
              onClick={this.setPane('attachment')}
            >
              <AttachFile />
            </IconButton>
          </div>
          {view}
          <div style={{ borderTop: "1px solid #aaa", display: "flex", alignItems: "center", justifyContent: "space-around", padding: 10, backgroundColor: "#eee" }}>
            <Button
              variant="outlined"
              style={{ backgroundColor: "white" }}
              color="primary"
              onClick={this.send}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              style={{ backgroundColor: "white" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              style={{ backgroundColor: "white" }}
              onClick={this.close}
              color="secondary"
            >
              Close
            </Button>
          </div>
        </div>
        <input
          ref={this.fileInput}
          type="file"
          style={{ display: 'none' }}
          multiple
          onChange={this.attachFiles}
        />
      </Dialog>
    )
  }
}


export default withStore(MailCompose)
