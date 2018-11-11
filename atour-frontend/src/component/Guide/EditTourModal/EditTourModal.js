import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import * as validation from "../../../utils/validation";
import { editTour } from "../../../action/ModalAction";
import "./styles.css";

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

class EditTourModal extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = {
      value: {
        tourName: this.props.tour.tourName,
        price: this.props.tour.price,
        minGroupSize: this.props.tour.minGroupSize,
        maxGroupSize: this.props.tour.maxGroupSize,
        detail: this.props.tour.detail
      },
      error: {
        tourName: false,
        price: false,
        minGroupSize: false,
        maxGroupSize: false,
        detail: false
      }
    };

    autobind(
      this,
      "renderEditTour",
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

  renderEditTour() {
    const { value, asCustomer } = this.state;
    return (
      <div className="edit-tour-form-control">
        <h2>Edit Tour</h2>
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
        {this.renderEditTour()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.editTour };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(editTour(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTourModal);
