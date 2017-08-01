import {WAITING, NOT_WAITING} from '../actions'

function waiting (state = false, action) {
  switch (action.type) {
    case WAITING:
      return true

    case NOT_WAITING:
      return false
      
    default:
      return state
  }
}

export default waiting
