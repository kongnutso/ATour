import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { publishNewTour } from "../../../action/ModalAction";
import autobind from "react-autobind";
import * as validation from "../../../utils/validation";
import classNames from "classnames";
import "./styles.css";
import { Grid, Form } from "semantic-ui-react";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label className="publish-new-tour-label">{label}</label>
      <div>
        <input
          onChange={onChange}
          className="publish-new-tour-input"
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
  let extractedValue = value.maxGroupSize;
  return <Field label={label} onChange={onChange} value={extractedValue} />;
};

function maxGroupSizeValidation(sizes) {
  let minGroupSize = sizes.minGroupSize ? sizes.minGroupSize : 0;
  let maxGroupSize = sizes.maxGroupSize;
  let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;

  console.log("min ", parseInt(minGroupSize));
  console.log("max ", parseInt(maxGroupSize));
  let passed = maxGroupSize.match(regex);
  if (
    passed == null ||
    maxGroupSize.length > 50 ||
    !minGroupSize ||
    !maxGroupSize ||
    parseInt(minGroupSize) > parseInt(maxGroupSize)
  ) {
    return "maximum group size must ...";
  }
  return false;
}

class PublishNewTourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      value: {
        tourName: "",
        price: "",
        minGroupSize: "",
        maxGroupSize: "",
        meetingPlace: "",
        schedule: "",
        detail: ""
      },
      error: {
        tourName: true,
        price: true,
        minGroupSize: true,
        maxGroupSize: true,
        meetingPlace: true,
        schedule: true,
        detail: true
      }
    };

    autobind(
      this,
      "renderPublishNewTour",
      "onSubmitNewTourInfo",
      "onCloseModal",
      "onFieldChange",
      "maxGroupSizeValidation",
      "onSubmitNewTourInfo"
    );
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
    console.log("compare", isCompare);
    if (isCompare) {
      newValue[field] = mainValue;
    } else {
      newValue[field] = value;
    }
    this.setState({ value: newValue, error: newError });
  }

  renderPublishNewTour() {
    const { value, asCustomer } = this.state;
    return (
      <div className="publish-new-tour-form-control">
        <h2>Publish New Tour</h2>
        <hr color="black" size="50" />
        <Field
          label="Tour name"
          value={value.tourName}
          onChange={e =>
            this.onFieldChange(
              "tourName",
              e.target.value,
              validation.validateTourName
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
            value={value.minGroupSize}
            onChange={e =>
              this.onFieldChange(
                "minGroupSize",
                e.target.value,
                validation.validateMinGroupSize
              )
            }
            error={this.state.error.minGroupSize}
          />
          <Dec
            label="to"
            value={{
              minGroupSize: value.minGroupSize,
              maxGroupSize: value.maxGroupSize
            }}
            onChange={e =>
              this.onFieldChange(
                "maxGroupSize",
                {
                  minGroupSize: value.minGroupSize,
                  maxGroupSize: e.target.value
                },
                true,
                e.target.value
              )
            }
            error={this.state.error.minGroupSize}
          />
        </div>
        <Field
          label="Details"
          value={value.detail}
          onChange={e =>
            this.onFieldChange("detail", e.target.value, this.detailValidation)
          }
          error={this.state.error.detail}
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
    const { accountInfo } = this.state;

    return (
      <Modal
        className="publish-new-tour-modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen == "publishNewTour"}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        {this.renderPublishNewTour()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.modalName };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(publishNewTour(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishNewTourModal);
