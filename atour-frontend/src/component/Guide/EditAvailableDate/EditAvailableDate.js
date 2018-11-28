import React from "react";
import autobind from "react-autobind";
import { connect } from "react-redux";
import "./styles.css";
import DatePicker from "react-date-picker";
import { API_ENDPOINT } from "../../../utils/utils";

import { Container, Grid, Button, Icon, Card } from "semantic-ui-react";
import axios from "axios";

class AvailableDateItem extends React.Component {
  render() {
    let tripDate = new Date(this.props.trip.tripDate);
    const month = tripDate.getMonth();
    const date = tripDate.getDate();
    const year = tripDate.getYear();
    return (
      <Grid Columns={2}>
        <Grid.Column width={8} textAlign="left">
          <p>
            - {date}/{month + 1}/{year - 100}
          </p>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          {this.props.isDealt ? (
            <Button icon color="red" />
          ) : (
            <Button
              icon
              onClick={this.props.deleteAvailableDate}
              value={this.props.trip.tripId}
              color="red"
            >
              <Icon name="delete" />
            </Button>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

class EditAvailableDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: props.tour.trips,
      dealtTripsIds: [],
      selectedDate: new Date()
    };

    autobind(
      this,
      "componentDidMount",
      "renderEditAvailableDate",
      "onSubmitNewTrip",
      "handleDateSelect",
      "deleteAvailableDate",
      "sortTrips"
    );
  }
  componentDidMount() {
    let dealtTripsIdsList = [];
    this.props.guideInfo.dealtTrips.map(dealtTrip => {
      dealtTripsIdsList.push(dealtTrip.tripId);
    });
    const self = this;
    this.setState({ dealtTripsIds: dealtTripsIdsList });
  }

  sortTrips(trips) {
    if (trips.length === 0) {
      return trips;
    } else {
      let output = trips.sort(
        (a, b) => new Date(a.tripDate) - new Date(b.tripDate)
      );
      return output;
    }
  }

  handleDateSelect(date) {
    this.setState({
      selectedDate: date
    });
  }

  async onSubmitNewTrip() {
    if (this.state.selectedDate <= new Date()) return;
    let isUnique = true;
    this.state.trips.map(trip => {
      if (String(this.state.selectedDate) === String(new Date(trip.tripDate))) {
        isUnique = false;
      }
    });
    if (isUnique === true) {
      const url =
        "http://" + API_ENDPOINT + "/tour/" + this.props.tour.tourId + "/trips";
      const res = await axios
        .post(url, { date: this.state.selectedDate })
        .then(res => {
          this.setState({ trips: res.data.trips });
        });
    }
  }

  async deleteAvailableDate(e) {
    let target = e.target;
    if (target.tagName !== "BUTTON") {
      target = target.parentNode;
    }
    const clickedValue = target.value;
    const url =
      "http://" +
      API_ENDPOINT +
      "/tour/" +
      String(this.props.tour.tourId) +
      "/trips/" +
      String(clickedValue);
    const res = await axios.delete(url).then(res => {
      this.setState({ trips: res.data.trips });
    });
  }

  renderEditAvailableDate() {
    return (
      <Card>
        <Card.Content>
          <div>
            <h2>Edit Available Dates</h2>
            <hr color="black" size="50" />
            {this.sortTrips(this.state.trips).map((trip, index) => (
              <AvailableDateItem
                key={index}
                trip={trip}
                deleteAvailableDate={this.deleteAvailableDate}
                isDealt={this.state.dealtTripsIds.indexOf(trip.tripId) >= 0}
              />
            ))}
            <Grid columns={2}>
              <Grid.Column width={5}>
                <Button primary onClick={this.onSubmitNewTrip}>
                  Submit
                </Button>
              </Grid.Column>
              <Grid.Column width={11}>
                <DatePicker
                  onChange={this.handleDateSelect}
                  value={this.state.selectedDate}
                />
              </Grid.Column>
            </Grid>
          </div>
        </Card.Content>
      </Card>
    );
  }
  render() {
    return <Container>{this.renderEditAvailableDate()}</Container>;
  }
}
const mapStateToProps = state => {
  return {
    guideInfo: state.user.guideInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(EditAvailableDate);
