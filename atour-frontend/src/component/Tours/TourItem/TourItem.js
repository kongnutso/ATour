import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header, Image, Grid, Segment } from "semantic-ui-react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import TripItem from "../TripItem/TripItem";
import "./styles.css";

const TripSection = styled(Card.Content)`
  padding: 0.5em 1.5em !important;
  .column {
    padding: 0.2em 0.5em !important;
  }
`;

class TourItem extends React.Component {
  filterString(string, threshold) {
    return string.substring(0, threshold) + "...";
  }

  filterTrips(trips) {
    let dates = [];
    let outputDate = [];
    if (trips.length === 0) {
      return outputDate;
    } else {
      trips.map(trip => dates.push(new Date(trip.tripDate)));
      dates.sort((a, b) => a - b);
      let counter = 0;
      for (var i = 0; i < dates.length; i++) {
        if (counter >= 4) {
          break;
        }
        let today = new Date();
        if (dates[i] - today > 0) {
          outputDate.push(dates[i]);
          counter += 1;
        }
      }
      return outputDate;
    }
  }
  renderContent() {
    return (
      <Card
        onClick={() => {
          this.selectTour(this.props.tour);
        }}
      >
        <Card.Content>
          <Image
            floated="right"
            size="medium"
            src={
              this.props.tour.imageUrl == null
                ? require("../../../image/TourImage.png")
                : this.props.tour.imageUrl
            }
          />
          <Card.Header>
            {this.filterString(this.props.tour.tourName, 30)}
          </Card.Header>
          <Card.Meta>{this.props.tour.price + " baht"}</Card.Meta>
          <Card.Description>
            {this.filterString(this.props.tour.detail, 100)}
          </Card.Description>
        </Card.Content>
        <TripSection>
          <Grid columns={4}>
            <Grid.Row textAlign="center">
              {this.filterTrips(this.props.tour.trips).map(date => (
                <Grid.Column>
                  <TripItem date={date} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </TripSection>
      </Card>
    );
  }
  render() {
    console.log("recieved from tours: ", this.props.tour);
    if (this.props.role == "Guide") {
      return (
        <Link
          to={{ pathname: "/guideTourInfo", state: { tour: this.props.tour } }}
        >
          {this.renderContent()}
        </Link>
      );
    }
    return <Link to="/customerTourInfo">{this.renderContent()}</Link>;
  }
}

const mapStateToProps = state => {
  return {
    role: state.user.role
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourItem);
