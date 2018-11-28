import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import * as validation from "../../../utils/validation";
import { editTour } from "../../../action/ModalAction";
import { getGuideInfo } from "../../../action/UserInfoAction";
import { Grid, Button } from "semantic-ui-react";
import "./styles.css";
import axios from "axios";
import { API_ENDPOINT } from "../../../utils/utils";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label className="editlish-new-tour-label">{label}</label>
      <div>
        <input
          onChange={onChange}
          className="editlish-new-tour-input"
          className="form-control"
          type={inputType || "text"}
          value={value}
        />
        <div className="error-text">{error && error !== true ? error : ""}</div>
      </div>
    </div>
  );
}

const Dec = ({ label, value, onChange }) => {
  let extractedValue = value.maximumSize;
  return <Field label={label} onChange={onChange} value={extractedValue} />;
};

class EditTourModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        tourName: this.props.tour.tourName,
        price: this.props.tour.price,
        minimumSize: this.props.tour.minimumSize,
        maximumSize: this.props.tour.maximumSize,
        detail: this.props.tour.detail,
        imageUrl: this.props.tour.imageUrl
      },
      error: {
        tourName: false,
        price: false,
        minimumSize: false,
        maximumSize: false,
        detail: false,
        imageUrl: false
      }
    };

    autobind(
      this,
      "renderEditTour",
      "onSubmitNewTourInfo",
      "onCloseModal",
      "onFieldChange",
      "onSubmitNewTourInfo",
      "onSubmitted"
    );
  }

  async onSubmitNewTourInfo() {
    let handleToUpdate = this.props.updateStates;
    let value = this.state.value;
    handleToUpdate(
      value.price,
      value.detail,
      value.minimumSize,
      value.maximumSize,
      value.imageUrl
    );
    const {
      error: { tourName, price, minimumSize, maximumSize, detail, imageUrl }
    } = this.state;
    if (
      !tourName &&
      !price &&
      !minimumSize &&
      !maximumSize &&
      !detail &&
      !imageUrl
    ) {
      const url = "http://" + API_ENDPOINT + "/tour/" + this.props.tour.tourId;
      const value = this.state.value;
      const res = await axios
        .post(url, {
          tourName: value.tourName,
          minimumSize: value.minimumSize,
          maximumSize: value.maximumSize,
          price: value.price,
          detail: value.detail,
          imageUrl: value.imageUrl
        })
        .then(this.onSubmitted());
    }
  }

  onSubmitted() {
    // update reducers
    this.props.getGuideInfo(this.props.guideId);
  }

  onCloseModal() {
    this.setState({});
    this.props.onCloseModal();
  }

  onFieldChange(
    field,
    value,
    validate = null,
    isCompare = false,
    mainValue = null
  ) {
    const newValue = this.state.value;
    const newError = this.state.error;
    if (validate !== null) {
      const error = validate(value);
      newError[field] = error;
    }
    if (isCompare) {
      newValue[field] = mainValue;
    } else {
      newValue[field] = value;
    }
    this.setState({ value: newValue, error: newError });
  }

  renderEditTour() {
    const { value, asCustomer } = this.state;
    return (
      <div className="edit-tour-form-control">
        <h2>Edit Tour</h2>
        <hr color="black" size="50" />
        <Field
          label="Tour image"
          value={value.imageUrl}
          onChange={e =>
            this.onFieldChange(
              "imageUrl",
              e.target.value,
              validation.validateDetail
            )
          }
          error={this.state.error.tourName}
        />
        <Field
          label="price"
          value={value.price}
          onChange={e =>
            this.onFieldChange(
              "price",
              e.target.value,
              validation.validatePrice
            )
          }
          error={this.state.error.price}
        />
        <div class="form-group">
          <label>Group size</label>
          <Field
            label="from"
            value={value.minimumSize}
            onChange={e =>
              this.onFieldChange(
                "minimumSize",
                e.target.value,
                validation.validateMinimumSize
              )
            }
            error={this.state.error.minimumSize}
          />
          <Field
            label="to"
            value={value.maximumSize}
            onChange={e =>
              this.onFieldChange(
                "maximumSize",
                e.target.value,
                validation.validateMinimumSize
              )
            }
            error={this.state.error.maximumSize}
          />
        </div>
        <Field
          label="Details"
          value={value.detail}
          onChange={e =>
            this.onFieldChange(
              "detail",
              e.target.value,
              validation.validateDetail
            )
          }
          error={this.state.error.detail}
        />

        <Grid columns={2}>
          <Grid.Column width={8}>
            <Button
              onClick={() => this.onSubmitNewTourInfo()}
              // className="btn btn-primary"
              primary
              fluid
            >
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button
              onClick={() => this.onCloseModal()}
              // className="btn btn-danger"
              color="red"
              fluid
            >
              Cancel
            </Button>
          </Grid.Column>
        </Grid>
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
        isOpen={this.props.isOpen == "editTour"}
        // isOpen={true}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        {this.renderEditTour()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.modalName,
    guideId: state.user.guideInfo.guideId
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(editTour(false)),
  getGuideInfo: guideId => getGuideInfo(guideId)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTourModal);
