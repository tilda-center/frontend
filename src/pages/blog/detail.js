import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Paper,
} from '@material-ui/core'

import {
  Talk,
} from 'components'

import Template from 'templates/default/detail'
import moment from 'moment'
// import styles from './styles'

class BlogDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {blog: {}}
    this.fetch()
  }
// https://github.com/tilda-center
// this.props.store.auth.detail.ok
// designer.meka.rs
  fetch = async () => {

    const { blog, history, notification } = this.props.store

    const { year, month, day, slug} = this.props.match.params

    var d = moment(`${year}/${month}/${day}`);

    if (d.isValid()) {
      const response = await blog.get(year, month, day, slug)
      if (!response.ok) {
        const error = errors(response)
        notification.show(error.message)
        history.push(`/blogs`)
        return
        }
      this.setState({blog: response})
      }
    }

  createMarkup(blog) {
    return {__html: blog}
  }

  render() {
    const { blog } = this.state
    const content = blog.content
    return (
      <Template style={{}} secure>
        <Paper>
        <div dangerouslySetInnerHTML={this.createMarkup(content)} />
        </Paper>
      </Template>
    )
  }
}


// BlogDetail.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// }


export default withStore(BlogDetail)
