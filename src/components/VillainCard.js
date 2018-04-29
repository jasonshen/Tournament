import React from "react";
import { Button, Card, Image, Label } from "semantic-ui-react";

const VillainCard = props => {
  const handleClick = e => {
    if (e.target.id === "yes") {
      props.reportVillain();
    } else {
      props.clearVillain();
    }
  };

  return (
    <div className="padding">
      <Card centered>
        <Image src={props.lookup.location} />

        <Card.Content>
          <Card.Header>{props.lookup.closest_match}</Card.Header>

          <Label color="orange" attached="top right">
            {props.lookup.percent_match} % match
          </Label>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button id="yes" basic color="green" onClick={handleClick}>
              Yes
            </Button>
            <Button id="no" basic color="red" onClick={handleClick}>
              No
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default VillainCard;
