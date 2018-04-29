import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './containers/Upload'
import PhotoContainer from './containers/PhotoContainer'
import {Container} from 'semantic-ui-react'
import {API_ROOT, API_KEY} from './services'
import { Header, Icon} from 'semantic-ui-react'

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      photos: [],
      uploadError: null
    }
  }
  
  uploadPhoto = (event) => {
        event.persist();
        event.preventDefault();

        let data = new FormData()
        data.append('image', event.target[0].files[0])
        data.append("api_key", API_KEY);
        fetch(`${API_ROOT}/gcpd_lookup`, {
          method: 'POST',
          body: data
        })
        .then(res => res.json())
        .then(json => {console.log(json); this.addPhoto(json)});
      }
      
  addPhoto = (api_response) => {
      if(api_response.errors){
        console.log(api_response.errors)
        this.setState({uploadError: api_response.errors}, () => console.log("just set state", this.state))
      }else{
        this.setState({photos: [...this.state.photos, api_response]}, () => console.log("just set state", this.state))
      }
  }
  
  reportPhoto = (location) => {

        let data = new FormData()
        data.append('image', location)
        data.append("api_key", API_KEY);

        fetch(`${API_ROOT}/gcpd_report`, {
          method: 'POST',
          body: data
        })
        .then(res => res.json())
        .then(json => {console.log("response to reporting pic", json); this.disablePhoto(location, json)});
      }
      
  disablePhoto = (location, json) => {
        let myPhoto = this.state.photos.filter((p) => p.location === location)[0]
        
        myPhoto.disabled = true
        myPhoto.message = json.status      
        let others = this.state.photos.filter((p) => p.location !== location)
        console.log("myphoto", myPhoto, "others", others, "combo", [...others, myPhoto])
        this.setState({photos: [...others, myPhoto]})
      }
      
  
  render() {
    return (
      <Container className="App">
      <Header as='h2' icon>
        <Icon name='law' />
        Help Save Gotham!
        <Header.Subheader>
          Submit pictures of suspected super villians to headquarters for processing.
        </Header.Subheader>
      </Header>
        <Upload uploadPhoto={this.uploadPhoto} uploadError={this.state.uploadError}/>
        <PhotoContainer photos={this.state.photos} reportPhoto={this.reportPhoto}/>
      </Container>
    );
  }
}

export default App;
