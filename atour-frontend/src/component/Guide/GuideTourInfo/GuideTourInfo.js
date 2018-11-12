import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import EditTourModal from "../EditTourModal/EditTourModal";
import { editTour } from "../../../action/ModalAction";
import EditAvailableDate from "../EditAvailableDate/EditAvailableDate";
import {
  Grid,
  Container,
  Segment,
  Icon,
  Button,
  Card
} from "semantic-ui-react";
import StarRatingComponent from "react-star-rating-component";

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
              {/* <AvailableDates
                availableDates={availableDates}
                onClickEditAvailableDate={props.onClickEditAvailableDate}
              /> */}

              <EditAvailableDate availableDates={availableDates} />
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
  onClickEditTour: () => dispatch(editTour(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideTourInfo);
