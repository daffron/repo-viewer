import {REPO_LIST} from '../actions'

function repoList (state = null, action) {
  switch (action.type) {
    case REPO_LIST:
      return action.repos

    default:
      return state
  }
}

export default repoList
