import React, { Component } from 'react';
import Card from './Card';
import fetchApiData from '../api/fetchApiData';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class CardContainer extends Component {
    constructor() {
        super();

        this.state = {
            showViolation: true,
            error: null,
            successMessage: null
        };
    }

    handleReport = e => {
        const data = {
            image: this.props.matchStatus.percent_match,
            api_key: API_KEY
        };

        fetchApiData(API_URL + 'gcpd_report', 'post', data)
            .then(jsonData => {
                this.setState({
                    successMessage: jsonData.status
                });
            })
            .catch(error => this.setState({ error }));
    };

    render() {
        return (
            <div>
                <Card
                    reportSuccess={this.state.successMessage}
                    error={this.state.error}
                    handleClick={this.handleReport}
                    {...this.state}
                    {...this.props}
                />
            </div>
        );
    }
}

export default CardContainer;
