import {ERROR} from '../actions'

function errorMessage (state = '', action) {
  switch (action.type) {
    case ERROR:
      return action.errorMessage

    default:
      return state
  }
}

export default errorMessage
