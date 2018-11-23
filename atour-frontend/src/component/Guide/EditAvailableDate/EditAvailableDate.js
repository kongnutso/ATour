import React from "react";
import autobind from "react-autobind";
import "./styles.css";
import DatePicker from "react-date-picker";
import {
  Container,
  Segment,
  Grid,
  Button,
  Icon,
  Card
} from "semantic-ui-react";
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
          <Button
            icon
            onClick={this.props.deleteAvailableDate}
            value={this.props.trip.tripId}
            color="red"
          >
            <Icon name="delete" />
          </Button>
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
      // availableDates: props.availableDates,
      selectedDate: new Date()
    };

    autobind(
      this,
      "renderEditAvailableDate",
      "onSubmitNewTrip",
      "handleDateSelect",
      "deleteAvailableDate",
      "sortTrips"
    );
  }

  sortTrips(trips) {
    console.log("TRIP: ", trips);
    if (trips.length === 0) {
      return trips;
    } else {
      let output = trips.sort(
        (a, b) => new Date(a.tripDate) - new Date(b.tripDate)
      );
      console.log("OUTPUT: ", output);
      return output;
    }
  }

  handleDateSelect(date) {
    this.setState({
      selectedDate: date
    });
    console.log("current state: ", this.state.selectedDate);
    console.log("date: ", this.state.selectedDate.getDate());
    console.log("month: ", this.state.selectedDate.getMonth());
    console.log("year: ", this.state.selectedDate.getYear());
  }

  async onSubmitNewTrip() {
    const url =
      "http://localhost:3000/tour/" + this.props.tour.tourId + "/trips";
    const res = await axios
      .post(url, { date: this.state.selectedDate })
      .then(res => {
        console.log(res.data);
        this.setState({ trips: res.data.trips });
      });
  }

  async deleteAvailableDate(e) {
    let target = e.target;
    if (target.tagName !== "BUTTON") {
      target = target.parentNode;
    }
    const clickedValue = target.value;
    console.log(target);
    console.log("clicked id ", clickedValue);
    // console.log("after deleted ", newAvailableDates);
    const url =
      "http://localhost:3000/tour/" +
      String(this.props.tour.tourId) +
      "/trips/" +
      String(clickedValue);
    console.log("request to send: ", url);
    const res = await axios.delete(url).then(res => {
      console.log("after delete: ", res.data);
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
            {this.sortTrips(this.state.trips).map(trip => (
              <AvailableDateItem
                trip={trip}
                deleteAvailableDate={this.deleteAvailableDate}
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

export default EditAvailableDate;
