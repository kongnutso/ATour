import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import "./styles.css";
import EditTourModal from "../EditTourModal/EditTourModal";
import { editTour } from "../../../action/ModalAction";
import EditAvailableDateModal from "../EditAvailableDateModal/EditAvailableDateModal";
import { editAvailableDate } from "../../../action/ModalAction";
import {
  Grid,
  Container,
  Segment,
  Icon,
  Button,
  Card
} from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";

const AvailableDates = props => {
  return (
    <Card>
      <Card.Content>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={8} textAlign="left">
              <p className="available-date">Avaliable dates</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Button onClick={props.onClickEditAvailableDate}>Edit</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={16} textAlign="left">
            {props.availableDates.map(date => (
              <p>- {date.date}</p>
            ))}
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

const GuideTourInfo = props => {
  const {
    tourName,
    tourimage,
    tourRating,
    price,
    tourLocation,
    tourDetail,
    minGroupSize,
    maxGroupSize,
    availableDates
  } = props.tour;
  console.log("to send ", props);
  return (
    <Container>
      <div className="topbanner-user-container">
        <EditTourModal tour={props.tour} />
        <EditAvailableDateModal availableDates={props.tour.availableDates} />
      </div>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid columns={2} stackable>
          <Grid.Column width={8} textAlign="left">
            <div class="tour-info-header">
              <p>{tourName}</p>
              <p className="tour-location">{tourLocation}</p>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <Button icon onClick={props.onClickEditTour}>
              Edit Tour
              <Icon name="edit" />
            </Button>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column with={16} textAlign="left">
              <StarRatingComponent
                className="tour-info-stars"
                starCount={5}
                value={tourRating}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <hr color="black" size="50" width="1000" />
        <div>
          <Grid columns={2} stackable>
            <Grid.Column width={10} textAlign="left">
              <h2>Details</h2>
              <p>{tourDetail}</p>
              <h2>Price</h2>
              <p>{price}</p>
              <h2>Group size</h2>
              <p>
                from {minGroupSize} to {maxGroupSize}
              </p>
            </Grid.Column>
            <Grid.Column width={6} textAlign="right">
              <AvailableDates
                availableDates={availableDates}
                onClickEditAvailableDate={props.onClickEditAvailableDate}
              />
            </Grid.Column>
          </Grid>
        </div>
      </Segment>
    </Container>
  );
};

const mapStateToProps = state => {
  return;
};

const mapDispatchToProps = dispatch => ({
  onClickEditTour: () => dispatch(editTour(true)),
  onClickEditAvailableDate: () => {
    console.log(editAvailableDate(true));
    return dispatch(editAvailableDate(true));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideTourInfo);
