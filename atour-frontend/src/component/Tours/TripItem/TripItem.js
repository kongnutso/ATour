import React from "react";
import classNames from "classnames";
import { Card, Header, Image, Grid } from "semantic-ui-react";
import styled from "styled-components";
import "./styles.css";

const mapMonth = month => {
  var monthName = new Array();
  monthName[0] = "JAN";
  monthName[1] = "FEB";
  monthName[2] = "MAR";
  monthName[3] = "APR";
  monthName[4] = "MAY";
  monthName[5] = "JUN";
  monthName[6] = "JUL";
  monthName[7] = "AUG";
  monthName[8] = "SEP";
  monthName[9] = "OCT";
  monthName[10] = "NOV";
  monthName[11] = "DEC";
  return monthName[month];
};

const SmallCard = styled(Card)`
  .content {
    padding: 0.2em 0.5em !important;
  }
`;

const TripItem = props => (
  <SmallCard as="div">
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
