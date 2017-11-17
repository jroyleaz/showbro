import React from 'react'
import { Route } from 'react-router-dom'
import AppFooter from './app-footer'
import AppHeader from './app-header'

import Search from '../search'

import './app.css'

class App extends React.Component {
  render() {
    return (
      <div className="responsive appWrapper">
        <AppHeader />

        <main>
          <Route exact path="/search" component={Search} />
          <Route path="/search/:query" component={Search} />
        </main>

        <AppFooter />
      </div>
    )
  }
}

export default App
