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
    return (
      <Grid Columns={2}>
        <Grid.Column width={8} textAlign="left">
          <p>- {this.props.trip.tripDate}</p>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <Button
            icon
            onClick={this.props.deleteAvailableDate}
            value={this.props.trip.tripId}
          >
            {/* <Icon name="delete" /> */}
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
      availableDates: props.availableDates,
      selectedDate: new Date()
    };

    autobind(
      this,
      "renderEditAvailableDate",
      "onSubmitNewTourInfo",
      "handleDateSelect",
      "deleteAvailableDate"
    );
  }

  //   componentDidMount() {
  //     let availableDates = this.props.availableDates.map(({ date }, index) => ({
  //       dateId: index,
  //       date
  //     }));
  //     this.setState({ availableDates });
  //   }

  handleDateSelect(date) {
    this.setState({
      selectedDate: date
    });
    console.log("current state: ", this.state);
  }

  onSubmitNewTourInfo() {
    // const {
    //   error: { username, password, email }
    // } = this.state;
    // if (!username && !password && !email) {
    //   this.setState({ accountInfo: false });
    // }
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
      return res.data;
    });
    if (res.error) {
      console.log("cannot delete trip");
    } else {
      console.log("delete successfuly");
    }
  }

  renderEditAvailableDate() {
    return (
      <Card>
        <Card.Content>
          <div>
            <h2>Edit Available Dates</h2>
            <hr color="black" size="50" />
            {this.props.tour.trips.map(trip => (
              <AvailableDateItem
                trip={trip}
                deleteAvailableDate={this.deleteAvailableDate}
              />
            ))}
            <DatePicker
              onChange={this.handleDateSelect}
              value={this.state.selectedDate}
            />
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
