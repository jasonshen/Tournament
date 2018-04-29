import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRecordsFromServer } from '../store/records';


class Results extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getRecordsFromServer(this.props.user.id);
        console.log('id', this.props.user.id)

    }

    render() {
        const { records } = this.props
        console.log('recner', records)
        return (
            <div>
                {records && records.length ?
                    records.map(record => {
                        return (
                            <div className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" style={{ width: "18rem" }} src={record.location} />
                                <div className="card-body">
                                    <h5 className="card-title">Closest Match = {record.closest_match}</h5>
                                    <p className="card-text">Percentage = {record.percent_match}</p>

                                </div>
                            </div>
                        )
                    })
                    :
                    null
                }
            </div>

        )
    }
}

const mapStateToProps = ({ records, user }) => {
    return {
        records, user
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        getRecordsFromServer: (id) => {
            dispatch(getRecordsFromServer(id));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Results);
