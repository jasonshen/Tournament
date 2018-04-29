import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Lookup.css';


class Lookup extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: null,
      lookupResults: {
        closest_match: '',
        location: '',
        percent_match: ''
      },
      reportSuccessMessage: null
    }

    this.handleReport = this.handleReport.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  
  handleSelectFile = (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
    this.setState({
      selectedImage: event.target.files[0]
    })
  }

  handleFileUpload = () => {
    if (this.state.selectedImage) {
      const data = new FormData();
      const API_KEY = 'api_key=ioPi-CX1OzLbZEYMaqpyLQ'
      data.append('image', this.state.selectedImage, this.state.selectedImage.name);
      axios.post('https://www.headlightlabs.com/api/gcpd_lookup?' + API_KEY, data)
        .then((res) => {
          this.setState({
            lookupResults: res.data
          });
        });
    } else {
      alert('First select an image');
    }
  }

  handleReport = () => {
    if (this.state.selectedImage) {
      const data = new FormData();
      const API_KEY = 'api_key=ioPi-CX1OzLbZEYMaqpyLQ'
      data.append('image', this.state.selectedImage, this.state.selectedImage.name);
      axios.post('https://www.headlightlabs.com/api/gcpd_report?' + API_KEY, data)
        .then((res) => {
          this.setState({
            reportSuccessMessage: res.data.status
          })
        });
    } else {
      alert('First select an image');
    }

  }

  render() {
    let closestMatch = 'Closest Match: ' + this.state.lookupResults.closest_match;
    let percentMatch = 'Percentage Match: ' + this.state.lookupResults.percent_match;
    let submittedImage = this.state.lookupResults.location;
    let reportSuccessMessage = this.state.reportSuccessMessage;

    return (
      <div className="allContentWrapper">
        <div className="lookupContainer">
          <h2>Lookup</h2>
          <div className="inputFields">
            <input type="file" onChange={this.handleSelectFile} />
            <button onClick={this.handleFileUpload}>Submit</button>
          </div>
        </div>
        <hr></hr>
        <div className='resultsContainer'>
          <h2>Results</h2>
          <div className='resultsFields'>
            <img className="submittedImage" src={submittedImage} />
            <div className="closestMatch">{closestMatch}</div>
            <div className ="percentMatch">{percentMatch}</div>
          </div>
        </div>
        <div className="reportingContainer">
          <button onClick={this.handleReport}>Report</button>
          <span classname="reportSuccessMessage"><h3>{reportSuccessMessage}</h3></span>
        </div>
      </div>
    );
  }
}

export default Lookup;
