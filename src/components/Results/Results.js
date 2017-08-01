import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import Waiting from '../Waiting/Waiting'

import './results.css'

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sorted: null,
      repos: null
    }
    this.sortReposById = this.sortReposById.bind(this)
    this.setToDefault = this.setToDefault.bind(this)
    this.sortReposByName = this.sortReposByName.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({repos: nextProps.repos})
  }

  sortReposById () {
    const sorted = this.state.repos.slice().sort((a, b) => {
      return a.id - b.id
    })
    this.setState({sorted})
  }

  sortReposByName () {
    const sorted = this.state.repos.slice().sort((a, b) => {
      const repoA = a.name.toLowerCase()
      const repoB = b.name.toLowerCase()
      return repoA === repoB ? 0 : +(repoA > repoB) || -1
    })
    this.setState({sorted})
  }

  setToDefault () {
    this.setState({sorted: null})
  }

  handleHide (id) {
    this.setState({
      repos: this.state.repos.filter(repo => repo.id !== id)
    })
    if (this.state.sorted) {
      this.setState({
        sorted: this.state.sorted.filter(repo => repo.id !== id)
      })
    }
  }

  render () {
    if (Boolean(!this.props.repos)) {
      return (
        <div>
          
          <h4>Search for a user to begin!</h4>
        </div>
      )
    } else {
      const repos = this.state.sorted || this.state.repos
      return (
        <div className='results'>
          {this.props.waiting && <Waiting />}
          <button onClick={this.sortReposById}>Sort By Id</button>
          <button onClick={this.sortReposByName}>Sort By Name</button>
          <button onClick={this.setToDefault}>Default Order</button>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
              </tr>
              {repos.map(repo => {
                return (
                  <tr key={repo.id}>
                    <td>{repo.id}</td>
                    <td>{repo.name}</td>
                    <td>{repo.description}</td>
                    <td>{moment(repo.created_at).format('DD/MM/YYYY hh:mm')}</td>
                    <td><button onClick={() => this.handleHide(repo.id)}>Hide</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h2>{this.props.repos.length - this.state.repos.length} Repos are hidden</h2>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    repos: state.repos,
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(Results)
