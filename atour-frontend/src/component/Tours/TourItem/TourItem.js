import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header, Image, Grid, Segment } from "semantic-ui-react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
// import { selectTour } from "../../action/TourAction";
import TripItem from "../TripItem/TripItem";
import "./styles.css";

const TripSection = styled(Card.Content)`
  padding: 0.5em 1.5em !important;
  .column {
    padding: 0.2em 0.5em !important;
  }
`;

class TourItem extends React.Component {
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
          <Card.Header>{this.props.tour.tourName}</Card.Header>
          <Card.Meta>{this.props.tour.price + " baht"}</Card.Meta>
          <Card.Description>{this.props.tour.detail}</Card.Description>
        </Card.Content>
        {/* <Card.Content extra className="trip-item-section"> */}
        <TripSection>
          <Grid columns={4}>
            <Grid.Row textAlign="center">
              {/* <div className="trip-item-section"> */}
              {this.filterTrips(this.props.tour.trips).map(date => (
                <Grid.Column>
                  <TripItem date={date} />
                </Grid.Column>
              ))}
              {/* </div> */}
            </Grid.Row>
          </Grid>
        </TripSection>
        {/* </Card.Content> */}
      </Card>
      // <Card
      //   image={
      //     this.props.tour.imageUrl == null
      //       ? require("../../image/TourImage.png")
      //       : this.props.tour.imageUrl
      //   }
      //   header={this.props.tour.tourName}
      //   meta={this.props.tour.price + " baht"}
      //   description={this.props.tour.detail}
      //   onClick={() => {
      //     this.selectTour(this.props.tour);
      //   }}
      //   content={this.filterTrips(this.props.tour.trips).map(date => (
      //     <TripItem date={date} />
      //   ))}
      // />
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
