import request from 'superagent'

export const ERROR = 'ERROR'
export const WAITING = 'WAITING'
export const NOT_WAITING = 'NOT_WAITING'
export const REPO_LIST = 'REPO_LIST'

export function showError (errorMessage) {
  return {
    type: ERROR,
    errorMessage: errorMessage
  }
}

function noError () {
  return {
    type: ERROR,
    errorMessage: null
  }
}

function waiting () {
  return {
    type: WAITING
  }
}

function notWaiting () {
  return {
    type: NOT_WAITING
  }
}

export function getRepos (username) {
  return dispatch => {
    dispatch(waiting())
    request
      .get(`https://api.github.com/users/${username}/repos`)
      .then(result => {
        dispatch(notWaiting())
        dispatch(repoList(result.body))
        dispatch(noError())
      })
      .catch(err => {
        dispatch(showError(err.message))
        dispatch(notWaiting())
      })
  }
}

export function repoList (repos) {
  return {
    type: REPO_LIST,
    repos
  }
}