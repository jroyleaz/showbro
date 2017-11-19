import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Table } from 'semantic-ui-react'
import { forEach, isEmpty } from 'lodash'

import { showDetails } from '../../../modules/show-details'
import { getDetails } from '../selectors'

class ShowDetails extends React.Component {
  componentDidMount() {
    console.log('new id found', this.props.match.params.id)
    if (!this.props.details) {
      console.log('no data found, searching')
      this.props.showDetails(this.props.match.params.id)
    }
  }
  componentDidUpdate() {
    console.log('did update')
    if (this.props.match.params.id !== this.props.details.id) {
      // console.log('old id found', this.props.details.id)
      // console.log('new id found', this.props.match.params.id)
    }
    //this.props.showDetails(this.props.match.params.id)
  }
  componentShouldUpdate() {
    console.log('should update...')
  }
  render() {
    return (
      <div>
        {this.props.isLoading && (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        )}
        {!isEmpty(this.props.details) && (
          <Table celled padded>
            <Table.Body>
              {Object.keys(this.props.details).map(key => {
                if (key === 'id') return null
                if (key === 'image') {
                  return (
                    <Table.Row key={key}>
                      <Table.Cell>{key}</Table.Cell>
                      <Table.Cell>
                        <img src={this.props.details[key]} alt="" />
                      </Table.Cell>
                    </Table.Row>
                  )
                }
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{this.props.details[key]}</Table.Cell>
                  </Table.Row>
                  // <div>
                  //   {key} - {this.props.details[key]}
                  // </div>
                )
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  details: getDetails(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDetails,
      changePage: (query, sorter) => push(`/search/${query}`),
    },
    dispatch,
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowDetails),
)
