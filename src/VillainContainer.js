import React from 'react';
import VillainCard from './VillainCard'

const VillainContainer = ({ results, reportVillain, reported }) => {
  return (
    <div className="villain-container container">
		{results.length === 0 ? <h3> No results to display yet </h3> : null }
    	{results.map((villain, index) => <VillainCard villain={villain} reportVillain={reportVillain} reported={reported.includes(index)}key={results.indexOf(villain)}/>)}
    </div>
  )
}

export default VillainContainer;