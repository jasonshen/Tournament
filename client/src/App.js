import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file: null,
      result: null,
      status: null,
      error: null,
    };
  }

  onResetForm = () => {
    this.setState({
      file: null,
      result: null,
      status: null,
      error: null,
    });
  }

  setError = (error) => {
    this.setState({ error });

    setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  }

  onCheckImage = (e) => {
    e.preventDefault();

    const url = '/api/check';

    this.makeRequest(this.state.file, url)
      .then((response) => {
        response.json()
        .then((body) => {
          if (body.errors) throw body.errors;
          this.setState({ result: body });
        })
        .catch((err) => { this.setError({ err }) });
      })
      .catch((err) => { this.setError({ err }) });

  }

  onReportImage = () => {
    const url = '/api/report';

    this.makeRequest(this.state.file, url)
      .then((response) => {
        response.json()
        .then((body) => {
          if (body.errors) throw body.errors;

          this.setState({ 
            result: null,
            status: body.status,
          });
        })
        .catch((err) => { this.setError({ err }) });
      })
      .catch((err) => { this.setError({ err }) });
  }

  onChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  makeRequest = (file, url) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', 'file');

    return fetch(url, {
      method: 'POST',
      body: formData,
    });
  }

  renderResult() {
    const { location, closest_match, percent_match } = this.state.result;

    return (
      <div className="App-body">
        <img className="uploadedImage" alt="user-uploaded pic" src={location} />
        <p>
          We are {percent_match}% sure this is {closest_match}.
          <br />
          Would you like to report them?
        </p>
        <div className="button-list">
          <button onClick={this.onResetForm}>Nevermind</button>
          <button className="submit" onClick={this.onReportImage}>Report {closest_match}</button>
        </div>
      </div>
    );
  }

  renderStatus() {
    return (
      <div className="App-body">
        <p>{this.state.status}</p>
        <div className="button-list">
          <button onClick={this.onResetForm}>Back to main</button>
        </div>
      </div>
    );
  }

  renderBody() {
    if (this.state.status) return this.renderStatus();
    if (this.state.result) return this.renderResult();

    return (
      <div className="App-body">
        <p>Upload your image of a suspected escaped villain.</p>
        <div className="App-form">
          <form onSubmit={this.onCheckImage}>
            <input type="file" onChange={this.onChange} accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    );
  }

  renderError() {
    return (
      <div className="App-error">
        There has been an error. Please try again.
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gothic City Police Department Villain Reporting Tool</h1>
        </header>
        {this.renderBody()}
        {this.state.error && this.renderError()}
      </div>
    );
  }
}

export default App;
