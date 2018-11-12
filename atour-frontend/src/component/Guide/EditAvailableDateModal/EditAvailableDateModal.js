import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import autobind from "react-autobind";
import { editAvailableDate } from "../../../action/ModalAction";
import "./styles.css";
import DatePicker from "react-date-picker";
import { Container, Segment, Grid, Button, Icon } from "semantic-ui-react";

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

class EditAvailableDateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: props.availableDates,
      newAvailableDate: ""
    };

    autobind(
      this,
      "renderEditAvailableDate",
      "onSubmitAvailableDate",
      "onCloseModal",
      "onSubmitNewTourInfo",
      "handleDateSelect",
      "deleteAvailableDate"
    );
  }
  handleDateSelect(date) {
    this.setState({
      newAvailableDate: date
    });
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
    let target = e.target;
    if (target.tagName !== "BUTTON") {
      target = target.parentNode;
    }
    const availableDates = this.state.availableDates;
    const clickedId = target.value;
    const newAvailableDates = availableDates.filter(
      item => item.id !== clickedId
    );
    console.log(target);
    console.log("clicked id ", clickedId);
    console.log("after deleted ", newAvailableDates);
    this.setState({ availableDates: newAvailableDates });
  }

  renderEditAvailableDate() {
    const { value } = this.state;
    return (
      <div className="edit-tour-form-control">
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
        <button
          onClick={() => this.onSubmitNewTourInfo()}
          className="btn btn-primary"
        >
          Next
        </button>
        <button onClick={() => this.onCloseModal()} className="btn btn-danger">
          Cancel
        </button>
      </div>
    );
  }
  render() {
    return (
      <Modal
        className="edit-tour-modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen}
        // isOpen={true}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        {this.renderEditAvailableDate()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.editAvailableDate };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(editAvailableDate(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAvailableDateModal);
