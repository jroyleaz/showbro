import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Item, Segment } from 'semantic-ui-react'

class ShowList extends React.Component {
  render() {
    return (
      <Container>
        {this.props.searchResults.map(show => {
          return (
            <Segment key={show.id} padded="very">
              <Item.Group>
                <Item>
                  <Item.Image size="tiny" src={show.image} />
                  <Item.Content verticalAlign="top">
                    <Item.Header>
                      <a
                        onClick={() =>
                          this.props.changePage(`../show/${show.id}`)
                        }
                      >
                        {show.name} on {show.network}
                      </a>
                    </Item.Header>
                    <Item.Description>
                      <p>{show.summary}</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          )
        })}
      </Container>
    )
  }
}

const mapStateToProps = state => ({})

export default withRouter(connect(mapStateToProps)(ShowList))
