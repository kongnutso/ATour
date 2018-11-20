import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
// import { selectTour } from "../../action/TourAction";
import TripItem from "./TripItem/TripItem";

class TourItem extends React.Component {
  filterTrips(trips) {
    let dates = [];
    let outputDate = [];
    trips.map(trip => dates.push(trip.tripDate.getDate()));
    dates.sort((a, b) => a - b);
    let counter = 0;
    for (var i = 0; i < dates.length; i++) {
      if (counter > 4) {
        break;
      }
      let today = new Date();
      if (dates[i] - today > 0) {
        outputDate.add(dates[i]);
        counter += 1;
      }
    }
    return outputDate;
  }
  renderContent() {
    return (
      <Card
        onClick={() => {
          this.selectTour(this.props.tour);
        }}
      >
        <Image src={require("../../image/TourImage.png")} />
        <Card.Content>
          <Card.Meta>
            <span>{this.props.tour.tourLocation}</span>
          </Card.Meta>
          <Card.Header>{this.props.tour.tourName}</Card.Header>
          <Card.Description>{this.props.tour.tourPrice}</Card.Description>
          <Card.Content>
            <Card.Group itemsPerRow={4}>
              {this.filterTrips(this.props.tour.trips).map(date => (
                <TripItem date={date} />
              ))}
            </Card.Group>
            {/* <StarRatingComponent
              name=""
              starCount={5}
              value={this.props.tour.tourRating}
            /> */}
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
  selectTour() {
    // this.props.selectTour(this.props.tour);
  }
  render() {
    console.log("role", this.props.role);
    if (this.props.role == "Guide") {
      console.log("to guide");
      return (
        <Link
          to={{ pathname: "/guideTourInfo", state: { tour: this.props.tour } }}
        >
          {/* <Link to="/guideTourInfo" params={this.props.tour}> */}
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

const mapDispatchToProps = dispatch => ({
  // selectTour: tour => dispatch(selectTour(tour))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourItem);
