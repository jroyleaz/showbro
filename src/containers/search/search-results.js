import React from 'react'
import { push } from 'react-router-redux'
import { get } from 'lodash'
import {
  Card,
  CardTitle,
  Col,
  Collapsible,
  CollapsibleItem,
  Collection,
  CollectionItem,
  Row,
  Tab,
  Tabs,
} from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resultsReady, searchResults, seasons, seasonImages } from './selectors'

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
            <Tabs className="tab-demo z-depth-1">
              {this.props.searchResults.map((show, key) => {
                console.log('key', key)
                const active = key === 0 ? 'active' : ''
                return (
                  <Tab key={key} title={show.name} className={active}>
                    <Collection header="Next Episode">
                      <CollectionItem>
                        <Row>
                          <Col s={3} className="left-align">
                            <p>
                              <b>Name:</b> {show.nextEpisode.name} <br />
                              <b>Airs:</b> {show.nextEpisode.airdate} @{' '}
                              {show.nextEpisode.airtime} <br />
                              <b>Season:</b> {show.nextEpisode.season} <br />
                              <b>Episode:</b> {show.nextEpisode.number} <br />
                            </p>
                          </Col>
                          <Col s={9} className="right-align">
                            link
                          </Col>
                        </Row>
                      </CollectionItem>
                    </Collection>
                    <Collapsible accordion>
                      {this.props.seasons(key).map(season => {
                        return (
                          <CollapsibleItem
                            key={season.id}
                            header={`Season ${season.number} - ${
                              season.episodeOrder ? season.episodeOrder : '??'
                            } episodes`}
                            children={() => <div>SomeDIv</div>}
                          >
                            <img src={season.image} alt={season.number} />Blah
                          </CollapsibleItem>
                        )
                      })}
                    </Collapsible>
                  </Tab>
                )
              })}
            </Tabs>
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
  seasons: id => seasons(state, id),
  seasonImages: id => seasonImages(state, id),
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
