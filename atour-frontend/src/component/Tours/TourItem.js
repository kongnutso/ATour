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
    console.log("TRIPS", trips);
    if (trips.length === 0) {
      console.log("NONE");
      return outputDate;
    } else {
      trips.map(trip => dates.push(new Date(trip.tripDate)));
      dates.sort((a, b) => a - b);
      console.log("DATES: ", dates);
      let counter = 0;
      for (var i = 0; i < dates.length; i++) {
        if (counter > 4) {
          break;
        }
        let today = new Date();
        if (dates[i] - today > 0) {
          outputDate.push(dates[i]);
          counter += 1;
        }
      }
      console.log("OUTPUT DATE: ", outputDate);
      return outputDate;
    }
  }
  renderContent() {
    return (
      <Card
        image={
          this.props.tour.imageUrl == null
            ? require("../../image/TourImage.png")
            : this.props.tour.imageUrl
        }
        header={this.props.tour.tourName}
        meta={this.props.tour.price + " baht"}
        description={this.props.tour.detail}
        onClick={() => {
          this.selectTour(this.props.tour);
        }}
        // content={this.filterTrips(this.props.tour.trips).map(date => (
        //   <TripItem date={date} />
        // ))}
      />
      // <Card
      // onClick={() => {
      //   this.selectTour(this.props.tour);
      // }}
      // >
      //   <Card.Content>
      //     {this.props.tour.imageUrl == null ? (
      //       <Image src={require("../../image/TourImage.png")} size="medium" />
      //     ) : (
      //       <Image src={this.props.tour.imageUrl} size="medium" />
      //     )}
      //     <Card.Header>{this.props.tour.tourName}</Card.Header>
      //     <Card.Meta>{this.props.tour.price}</Card.Meta>
      //     <Card.Group itemsPerRow={4}>
      //       {this.filterTrips(this.props.tour.trips).map(date => (
      //         <TripItem date={date} />
      //       ))}
      //     </Card.Group>
      //     {/* <StarRatingComponent
      //         name=""
      //         starCount={5}
      //         value={this.props.tour.tourRating}
      //       /> */}
      //   </Card.Content>
      // </Card>
    );
  }
  selectTour() {
    // this.props.selectTour(this.props.tour);
  }
  render() {
    console.log("recieved from tours: ", this.props.tour);
    if (this.props.role == "Guide") {
      // console.log("to guide");
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
