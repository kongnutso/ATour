import React from "react";
import { Card } from "semantic-ui-react";
import styled from "styled-components";
import "./styles.css";

const mapMonth = month => {
  var monthName = new Array();
  monthName = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  return monthName[month];
};

const SmallCard = styled(Card)`
  .content {
    padding: 0.2em 0.5em !important;
  }
`;

const TripItem = props => (
  <SmallCard>
    <Card.Content>
      <Card.Header className="trip-header">
        {mapMonth(props.date.getMonth())}
      </Card.Header>
      <Card.Description className="trip-item-description">
        <strong>{new Date(props.date).getDate()}</strong>
      </Card.Description>
    </Card.Content>
  </SmallCard>
);

export default TripItem;
