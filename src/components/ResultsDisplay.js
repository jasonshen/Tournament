import React from 'react'
import { Grid, Image, Button } from 'semantic-ui-react'

const ResultsDisplay = (props) => {
  const showMatches = props.results.map((result) => {
    return (
      <Grid.Column key={result.id}>
        <Image src={result.data.location} />
        <p>Closest Match: {result.data.closest_match}</p>
        <p>Percent Match: {result.data.percent_match}</p>
        <Button onClick={props.handleClick} data-id={result.id}>Report</Button>
      </Grid.Column>
    )
  })

  return(
    <Grid stackable columns={3}>
      {showMatches}
    </Grid>
  )
}

export default ResultsDisplay
