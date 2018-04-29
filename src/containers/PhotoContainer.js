import React from 'react'
import { Form, Input, Button, Icon, Grid, Card} from 'semantic-ui-react'
import {Adapter} from '../services'
import Photo from '../components/Photo'


class PhotoContainer extends React.Component {
  constructor(){
    super()
  }

  sortDesc(a,b){
      if(a.percent_match < b.percent_match){
        return 1
      } else if (a.percent_match > b.percent_match){
        return - 1
      } else{
        return 0
      }
  }

  render(){
    return (
      <div>
      <br/>
      <br/>
        <h2>Analyzed Photos:</h2>
        <Card.Group>
        {this.props.photos.sort(this.sortDesc).map((photo) => <Photo location={photo.location} closest_match={photo.closest_match} percent_match={photo.percent_match} disabled={photo.disabled} message={photo.message} reportPhoto={this.props.reportPhoto}/>)}
        </Card.Group>
      </div>
    )
  }
}

export default PhotoContainer
