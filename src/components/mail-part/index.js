import React from 'react'
import PropTypes from 'prop-types'


class MailPart extends React.Component {
  render() {
    const { message, type } = this.props.part
    let body
    if (type === 'text/html') {
      body = <div dangerouslySetInnerHTML={{ __html: message }} />
    } else {
      body = (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {message}
        </pre>
      )
    }
    return body
  }
}


MailPart.propTypes = {
  part: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
}


export default MailPart
