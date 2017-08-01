import React , {Component} from 'react'
import {connect} from 'react-redux'

import './search.css'

import {getRepos} from '../../actions'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.getRepos(this.state.username)
  }

  render () {
    return (
      <div className='search'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Github Username' name='username' onChange={this.handleChange} required />
          <button onClick={this.handleChange}>Load Repos</button>
        </form>
        <p className='error'>{this.props.error}</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    error: state.errorMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRepos: username => dispatch(getRepos(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
