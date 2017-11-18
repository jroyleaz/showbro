import React from 'react'
import { findDOMNode } from 'react-dom'
import { push } from 'react-router-redux'
import { DebounceInput } from 'react-debounce-input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row } from 'react-materialize'

import { isEmpty } from 'lodash'

// Actions
import { search } from '../../modules/search'

// Local deps
import SearchResults from './search-results'
import './search.css'

class Search extends React.Component {
  componentDidMount() {
    this.searchField.focus()
  }
  componentDidUpdate() {
    this.searchField.focus()
  }
  submitSearch = e => {
    if (!isEmpty(e.target.value)) {
      this.props.changePage(e.target.value)
      this.props.search(e.target.value)
    }
  }

  render() {
    const incoming = this.props.match.params.query
    const current = this.props.searchQuery

    if ((incoming && !current) || incoming !== current) {
      this.props.search(this.props.match.params.query)
    }
    return (
      <div className="input-field">
        <Row className="Search-main1">
          <DebounceInput
            minLength={2}
            debounceTimeout={800}
            onChange={this.submitSearch}
            id="show_search"
            className="validate"
            value={this.props.searchQuery}
            inputRef={ref => {
              this.searchField = ref
            }}
          />
          <label className="active" htmlFor="show_search">
            Search for show...
          </label>
        </Row>
        <Row>
          <SearchResults />
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search,
      changePage: (query, sorter) => push(`/search/${query}`),
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Search)
