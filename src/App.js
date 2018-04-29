import React, { Component } from 'react';
import Header from './components/Header';
import Upload from './components/Upload';
import List from './components/List';
import fetchApiData from './api/fetchApiData';
import './css/App.css';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
    constructor() {
        super();

        this.state = {
            selectedImage: null,
            resultsList: [],
            error: null
        };
    }

    handleOnSubmit = e => {
        e.preventDefault();
        const formElement = document.querySelector('#uploadForm'),
            formData = new FormData(formElement);
        formData.append('api_key', API_KEY);

        fetchApiData(API_URL + 'gcpd_lookup', 'post', formData)
            .then(jsonData => {
                this.setState({
                    resultsList: [ jsonData, ...this.state.resultsList ]
                });
            })
            .catch(error => this.setState({ error }));
    };

    handleFileSelect = e => {
        this.setState({ selectedImage: e.target.files[0] });
    };

    render() {
        return (
            <div className="App">
                <Header title="Wayne Enterprises" />
                <Title>Quick! Report A Villain By Uploading an Image</Title>
                <Upload
                    handleOnSubmit={this.handleOnSubmit}
                    onChangeCB={this.handleFileSelect}
                />
                {this.state.error}
                <List data={this.state.resultsList} />
            </div>
        );
    }
}

export default App;

const Title = styled.h2`margin: 2.5em 0 2.5em 0;`;
