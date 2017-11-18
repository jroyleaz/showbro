import React from 'react'
import { Route, NavLink } from 'react-router-dom'

class AppHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="navbar-fixed responsive">
          <nav>
            <div className="nav-wrapper light-blue darken-3">
              <NavLink exact to="/search" className="brand-logo right">
                ShowBro
              </NavLink>
              <ul className="left">
                <li>
                  <NavLink to="/search" activeClassName="selected">
                    Search
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/favorites" activeClassName="selected">
                    Favorites
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/about" activeClassName="selected">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default AppHeader
