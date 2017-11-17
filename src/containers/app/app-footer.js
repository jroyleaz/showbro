import React from 'react'
import { Footer } from 'react-materialize'

class AppFooter extends React.Component {
  render() {
    return (
      <footer>
        <Footer
          className="fixed light-blue darken-3"
          copyrights="&copy; 2017 Digital Liberty"
        />
      </footer>
    )
  }
}

export default AppFooter
