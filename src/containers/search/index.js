import React from 'react'
import { push } from 'react-router-redux'
import { DebounceInput } from 'react-debounce-input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { search } from '../../modules/search'

// Component deps
import { Row } from 'react-materialize'
import SearchResults from './search-results'
import './search.css'

class Search extends React.Component {
  submitSearch = e => {
    this.props.changePage(e.target.value)
    this.props.search(e.target.value)
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
            type="text"
            className="validate"
            value={this.props.searchQuery}
          />
          <label htmlFor="show_search">Search for show...</label>
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
  isSearching: state.search.isSearching,
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
