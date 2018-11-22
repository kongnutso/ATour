import React from "react";
import classNames from "classnames";
import { Card, Header, Image, Grid } from "semantic-ui-react";
import styled from "styled-components";
import "./styles.css";

const mapMonth = date => {
  var month = new Array();
  month[0] = "JAN";
  month[1] = "FEB";
  month[2] = "MAR";
  month[3] = "APR";
  month[4] = "MAY";
  month[5] = "JUN";
  month[6] = "JUL";
  month[7] = "AUG";
  month[8] = "SEP";
  month[9] = "OCT";
  month[10] = "NOV";
  month[11] = "DEC";
  return month[new Date(date).getMonth()];
};

const TripItem = props => (
  <Card>
    <Card.Content>
      <Grid>
        <Grid.Column textAlign="center" color="blue">
          <p className="calendar-icon-month">{mapMonth(props.date.getMonth)}</p>
        </Grid.Column>
        <Grid.Column>
          <p className="calendar-icon-date">{new Date(props.date).getDate()}</p>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

export default TripItem;
