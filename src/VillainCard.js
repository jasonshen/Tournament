import React from 'react';

const VillainCard = ({ villain, reportVillain, reported }) => {
  return (
    <div className="card">
    	<img alt="villain" src={villain.location} />
    	<h3>Closest Match: {villain.closest_match}</h3>
    	<p> Percent Match: {villain.percent_match}</p>
  		{ reported ? 
  			<b>VILLAIN REPORTED</b> : 
  			<button onClick={() => reportVillain(villain)}>Report Villain Match</button>
  		}
    </div>
  )
}

export default VillainCard;