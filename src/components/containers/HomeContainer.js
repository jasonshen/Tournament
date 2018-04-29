import React, { Component } from 'react';
import { adapter } from '../../services';
import ImageUploadForm from '../ImageUploadForm';
import ResultsDisplay from '../ResultsDisplay';

let resultId = 1;

class HomeContainer extends Component{
  constructor(){
    super();
    this.state = {
      image: {},
      results: []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    adapter.submitImage(this.state.image).then(response => {
      if (!response.errors) {
        this.setState({
          image: {},
          results: [...this.state.results, {id: resultId, data: response}]
        })
        resultId++
      }
    })
  }

  handleChange = (event) => {
    this.setState({
      image: event.target.files[0]
    })
  }

  handleClick = (event) => {
    const id = parseInt(event.target.dataset.id)
    const image = this.findImage(id)
    console.log(id)
    adapter.submitReport(image).then(response => {
      if (response.status) {
        this.setState({
          results: this.removeImage(id)
        })
      }
    })
  }

  findImage = (id) => {
    return this.state.results.find(result => result.id === id)
  }

  removeImage = (id) => {
    return this.state.results.filter(result => result.id !== id)
  }

  render(){
    console.log(this.state)
    const { results } = this.state

    return(
      <div>
        <div className='ui center aligned segment container'>
          <ImageUploadForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        </div>
        <div className='ui center aligned segment container'>
          { !!results.length ? <ResultsDisplay results={results} handleClick={this.handleClick}/> : null}
        </div>
      </div>
    )
  }
}

export default HomeContainer;
