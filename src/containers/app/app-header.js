import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
// import { Button, Icon, Navbar, NavItem } from 'react-materialize'

// import AddEvent from '../add-event'
// import { addEvent } from '../../modules/calendarEvents'

class AppHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="navbar-fixed responsive">
          <nav>
            <div className="nav-wrapper light-blue darken-3">
              <NavLink exact to="/search" className="brand-logo right">
                ShowPlan
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

// const mapStateToProps = state => ({
//   events: state.calendarEvents,
// })

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       addEvent,
//     },
//     dispatch,
//   )

// export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
