import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'

import { isEmpty } from 'lodash'

// Actions
import { search } from '../../../modules/search'

// Local deps
import { SearchResults } from '../../search-results'

class SearchForm extends React.Component {
  componentDidMount() {
    this.searchField.inputRef.focus()
  }
  componentDidUpdate() {
    this.searchField.inputRef.focus()
  }
  submitSearch = e => {
    const searchQuery = this.searchField.inputRef.value
    e.preventDefault()
    if (!isEmpty(searchQuery)) {
      this.props.changePage(searchQuery)
      this.props.search(searchQuery)
    }
  }

  render() {
    const incoming = this.props.match.params.query
    const current = this.props.searchQuery

    if ((incoming && !current) || incoming !== current) {
      this.props.search(this.props.match.params.query)
    }
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <Input
            className="Search-Form-input"
            fluid
            icon="search"
            placeholder="Search..."
            ref={ref => (this.searchField = ref)}
            defaultValue={incoming}
          />
        </form>
        <SearchResults
          changePage={this.props.changePage}
          path={this.props.match}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
