import {combineReducers} from 'redux'

import errorMessage from './error-message'
import repos from './repos'
import waiting from './waiting'

export default combineReducers({
  errorMessage,
  repos,
  waiting
})
