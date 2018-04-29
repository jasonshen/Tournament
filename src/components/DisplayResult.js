import React from 'react';
import ReportMatch from './ReportMatch';


const DisplayResult = (props) => {
    const matchInfo = props.photo;
    return (
        <div>
            {matchInfo.closest_match ?
                <div>
                    <h1>Results</h1>
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" style={{ width: "18rem" }} src={matchInfo.location} />
                        <div className="card-body">
                            <h5 className="card-title">Closest Match = {matchInfo.closest_match}</h5>
                            <p className="card-text">Percentage = {matchInfo.percent_match}</p>

                        </div>
                    </div>
                    {props.photo.status ?
                        <div>
                            <br />
                            <h3>{props.photo.status}</h3>
                        </div>
                        :
                        <ReportMatch />
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default DisplayResult;
