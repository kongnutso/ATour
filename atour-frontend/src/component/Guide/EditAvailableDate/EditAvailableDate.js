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

const AvailableDateItem = props => {
  console.log("props ", props);
  return (
    <Grid Columns={2}>
      <Grid.Column width={8} textAlign="left">
        <p>- {props.date}</p>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <Button icon onClick={props.deleteAvailableDate} value={props.id}>
          <Icon name="delete" />
        </Button>
      </Grid.Column>
    </Grid>
  );
};

class EditAvailableDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: props.availableDates,
      newAvailableDate: ""
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
    // QUERY HERE
  }

  onSubmitNewTourInfo() {
    const {
      error: { username, password, email }
    } = this.state;
    if (!username && !password && !email) {
      this.setState({ accountInfo: false });
    }
  }

  onCloseModal() {
    this.setState({});
    this.props.onCloseModal();
  }

  deleteAvailableDate(e) {
    // QUERY HERE
    // let target = e.target;
    // if (target.tagName !== "BUTTON") {
    //   target = target.parentNode;
    // }
    // const availableDates = this.state.availableDates;
    // const clickedId = target.value;
    // const newAvailableDates = availableDates.filter(
    //   item => item.id !== clickedId
    // );
    // console.log(target);
    // console.log("clicked id ", clickedId);
    // console.log("after deleted ", newAvailableDates);
    // this.setState({ availableDates: newAvailableDates });
  }

  renderEditAvailableDate() {
    const { value } = this.state;
    return (
      <Card>
        <Card.Content>
          <div>
            <h2>Edit Available Dates</h2>
            <hr color="black" size="50" />
            {this.state.availableDates.map(date => (
              <AvailableDateItem
                id={date.id}
                date={date.date}
                deleteAvailableDate={this.deleteAvailableDate}
              />
            ))}
            <DatePicker
              onChange={this.handleDateSelect}
              value={this.state.newAvailableDate}
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
