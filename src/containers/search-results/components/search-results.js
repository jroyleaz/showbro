import React from 'react'
import { push } from 'react-router-redux'
import { Route, withRouter } from 'react-router-dom'

import { get } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resultsReady, searchResults } from '../selectors'
import { Message } from 'semantic-ui-react'
import ShowList from './show-list'

class SearchResults extends React.Component {
  render() {
    return (
      <div>
        {this.props.isSearching && (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        )}
        {(this.props.resultsReady && (
          <ShowList
            changePage={this.props.changePage}
            searchResults={this.props.searchResults}
          />
        )) ||
          null}
        {this.props.searchEmpty && (
          <Message
            header="Search Results Failure"
            content={` No Currently Running Shows Were Found Matching: "${
              this.props.searchQuery
            }"`}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  searchResults: searchResults(state),
  isSearching: state.search.isSearching,
  searchEmpty: state.search.searchEmpty,
  resultsReady: resultsReady(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchResults),
)
