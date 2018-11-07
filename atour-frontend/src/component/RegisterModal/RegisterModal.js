import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./styles.css";
import { registerModal } from "../../action/ModalAction";
import autobind from "react-autobind";
import * as validation from "../../utils/validation";
import classNames from "classnames";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label>{label}</label>
      <div>
        <input
          onChange={onChange}
          className="form-control"
          type={inputType || "text"}
          value={value}
        />
        <div className="error-text">{error && error !== true ? error : ""}</div>
      </div>
    </div>
  );
}

function DropDown(props) {
  const { onChange, label, choice, value } = props;
  const renderChoice = choice.map(c => {
    return (
      <option key={c} value={c}>
        {c}
      </option>
    );
  });
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-control" onChange={onChange} value={value}>
        {renderChoice}
      </select>
    </div>
  );
}

class RegisterModal extends React.Component {
  constructor() {
    super();
    this.state = {
      asCustomer: true,
      accountInfo: true,
      value: {
        username: "",
        password: "",
        email: "",
        name: "",
        sid: "",
        gender: "Male",
        birthDate: "",
        phone: "",
        address: "",
        bankName: "SCB",
        bankAccountName: "",
        bankAccountNumber: ""
      },
      error: {
        username: true,
        password: true,
        email: true,
        name: true,
        sid: true,
        gender: true,
        birthDate: true,
        phone: true,
        address: true,
        bankAccountName: true,
        bankAccountNumber: true
      }
    };

    autobind(
      this,
      "renderAccount",
      "onSubmitAccountInfo",
      "onSubmitUserInfo",
      "renderUserInfo",
      "onCloseModal",
      "validateAccountInfo",
      "onFieldChange"
    );
  }

  onSubmitAccountInfo() {
    const {
      error: { username, password, email }
    } = this.state;
    if (!username && !password && !email) {
      this.setState({ accountInfo: false });
    }
  }

  onSubmitUserInfo(values) {
    console.log("from submit");
  }

  onCloseModal() {
    this.setState({
      asCustomer: true,
      accountInfo: true
    });
    this.props.onCloseModal();
  }

  onFieldChange(field, value, validate = null) {
    const newValue = this.state.value;
    const newError = this.state.error;
    if (validate !== null) {
      const error = validate(value);
      newError[field] = error;
    }
    newValue[field] = value;
    this.setState({ value: newValue, error: newError });
  }

  renderAccount() {
    const { value, asCustomer } = this.state;
    return (
      <div>
        <div>Sign up as</div>
        <button
          onClick={() => this.setState({ asCustomer: true })}
          className={classNames({
            "btn selectiveButton": true,
            selected: asCustomer
          })}
        >
          Customer
        </button>
        <button
          onClick={() => this.setState({ asCustomer: false })}
          className={classNames({
            "btn selectiveButton": true,
            selected: !asCustomer
          })}
        >
          Guide
        </button>
        <Field
          label="Username: "
          value={value.username}
          onChange={e =>
            this.onFieldChange(
              "username",
              e.target.value,
              validation.validateUsername
            )
          }
          error={this.state.error.username}
        />
        <Field
          label="Password: "
          inputType="password"
          value={value.password}
          onChange={e =>
            this.onFieldChange(
              "password",
              e.target.value,
              validation.validatePassword
            )
          }
          error={this.state.error.password}
        />
        <Field
          label="Email: "
          value={value.email}
          onChange={e =>
            this.onFieldChange(
              "email",
              e.target.value,
              validation.validateEmail
            )
          }
          error={this.state.error.email}
        />
        <button
          onClick={() => this.onSubmitAccountInfo()}
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

  renderUserInfo() {
    const {
      value: { gender },
      value
    } = this.state;
    const renderBankAccountInfo = !this.state.asCustomer ? (
      <div>
        <DropDown
          label="Bank: "
          onChange={e => this.onFieldChange("bankName", e.target.value)}
          value={value.bank}
          choice={["SCB", "KBANK", "XXX"]}
        />
        <Field
          label="Bank Account Name: "
          value={value.bankAccountName}
          onChange={e =>
            this.onFieldChange(
              "bankAccountName",
              e.target.value,
              validation.validateBankAccountName
            )
          }
          error={this.state.error.bankAccountName}
        />
        <Field
          label="Bank Account Number: "
          value={value.bankAccountNumber}
          onChange={e =>
            this.onFieldChange(
              "bankAccountNumber",
              e.target.value,
              validation.validateBankAccountNumber
            )
          }
          error={this.state.error.bankAccountNumber}
        />
      </div>
    ) : null;
    return (
      <div>
        <Field
          label="Full Name: "
          value={value.name}
          onChange={e =>
            this.onFieldChange("name", e.target.value, validation.validateName)
          }
          error={this.state.error.name}
        />
        <Field
          label="Social ID: "
          value={value.sid}
          onChange={e =>
            this.onFieldChange("sid", e.target.value, validation.validateSID)
          }
          error={this.state.error.sid}
        />
        <button
          onClick={() => this.onFieldChange("gender", "Male")}
          className={classNames({
            "btn selectiveButton": true,
            selected: gender === "Male"
          })}
        >
          Male
        </button>
        <button
          onClick={() => this.onFieldChange("gender", "Female")}
          className={classNames({
            "btn selectiveButton": true,
            selected: gender === "Female"
          })}
        >
          Female
        </button>
        <Field
          label="BirthDate: "
          value={value.birthDate}
          onChange={e =>
            this.onFieldChange(
              "birthDate",
              e.target.value,
              validation.validateBirthDate
            )
          }
          inputType="date"
          error={this.state.error.birthDate}
        />
        <Field
          label="Phone number: "
          value={value.phone}
          onChange={e =>
            this.onFieldChange(
              "phone",
              e.target.value,
              validation.validatePhone
            )
          }
          error={this.state.error.phone}
        />
        <Field
          label="Address: "
          value={value.address}
          onChange={e =>
            this.onFieldChange(
              "address",
              e.target.value,
              validation.validateAddress
            )
          }
          error={this.state.error.address}
        />
        {renderBankAccountInfo}
        <button onClick={this.onSubmitUserInfo} className="btn btn-primary">
          Confirm
        </button>
        <button
          onClick={() => this.setState({ accountInfo: true })}
          className="btn btn-danger"
        >
          Back
        </button>
      </div>
    );
  }

  render() {
    const { accountInfo } = this.state;
    const renderObject = accountInfo
      ? this.renderAccount()
      : this.renderUserInfo();
    return (
      <Modal
        className="modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        {renderObject}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.register };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(registerModal(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
