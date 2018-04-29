import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reportGCPD } from '../store/photo';

class ReportMatch extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let payload = {
            api_key: 'ZcWnM_2Gs8s2xWFB-p-hhw',
            image_contents: this.props.photoData.data
        };
        this.props.reportGCPD(payload);
    }

    render() {
        return (
            <div>
                <div className='card-body'>
                    <button onClick={this.handleSubmit}>Report this villain to the GCPD?</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ photoData }) => {
    return {
        photoData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reportGCPD: (payload) => {
            dispatch(reportGCPD(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMatch);