import React, {Component} from 'react'

import Search from '../Search/Search'
import Results from '../Results/Results'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <Results />
      </div>
    )
  }
}

export default App
