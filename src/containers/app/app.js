import React from 'react'
import { Route } from 'react-router-dom'
import AppFooter from './app-footer'
import AppHeader from './app-header'

import { SearchForm } from '../search-form'
import { ShowDetails } from '../search-results'

import './app.css'

class App extends React.Component {
  render() {
    return (
      <div className="responsive appWrapper">
        <AppHeader />

        <main>
          <Route exact path="/search" component={SearchForm} />
          <Route exact path="/search/:query" component={SearchForm} />
          <Route exact path="/show/:id" component={ShowDetails} />
        </main>

        <AppFooter />
      </div>
    )
  }
}

export default App
