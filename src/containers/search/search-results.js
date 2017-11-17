import React from 'react'
import { push } from 'react-router-redux'
import {
  Col,
  Collection,
  CollectionItem,
  Icon,
  Input,
  Row,
} from 'react-materialize'
import { DebounceInput } from 'react-debounce-input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resultsReady, searchResults } from './selectors'

import './search.css'

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
          <div>
            <Collection>
              {this.props.searchResults.map(show => {
                return (
                  <CollectionItem
                    key={show.id}
                    className="collection-item avatar"
                  >
                    <Row>
                      <Col s={6}>
                        <img
                          className="circle"
                          src={show.image}
                          alt={show.name}
                        />
                        <span className="title">
                          <b>{show.name}</b> on {show.network}
                        </span>
                        <p>
                          <b>Next Episode</b>: <i>{show.nextEpisode.name}</i>
                          <br />
                          <b>Airs</b>: {show.nextEpisode.airdate}
                        </p>
                      </Col>
                      <Col className="right-align" s={6}>
                        <Row className="valign-wrapper">
                          <Col s={12}>
                            <Icon>favorite_border</Icon>
                          </Col>
                        </Row>
                        <Col s={12}>
                          {show.links.map(link => {
                            return (
                              <a
                                key={link.title}
                                className="SearchResults-link-chip btn waves-effect waves-green chip"
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.title}
                              </a>
                            )
                          })}
                        </Col>
                      </Col>
                    </Row>
                  </CollectionItem>
                )
              })}
            </Collection>
          </div>
        )) ||
          null}
        {this.props.searchEmpty && (
          <h3>
            No Currently Running Shows Were Found Matching: "{
              this.props.searchQuery
            }"
          </h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
