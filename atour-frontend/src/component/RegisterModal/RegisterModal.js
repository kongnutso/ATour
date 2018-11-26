import React, { Fragment } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import "./styles.css";
import { registerModal, loginModal } from "../../action/ModalAction";
import autobind from "react-autobind";
import * as validation from "../../utils/validation";
import classNames from "classnames";
import FormProgress from "../FormProgress/FormProgress";
import PopUpModal from "../PopUpModal/PopUpModal";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/utils";

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
      <select
        className="form-control registerModal"
        onChange={onChange}
        value={value}
      >
        {renderChoice}
      </select>
    </div>
  );
}

const defaultValue = () => ({
  asCustomer: true,
  accountInfo: true,
  successful: false,
  errorPopUp: "",
  value: {
    userName: "",
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
    userName: true,
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
});

class RegisterModal extends React.Component {
  constructor() {
    super();
    const {
      asCustomer,
      accountInfo,
      value,
      error,
      errorPopUp,
      successful
    } = defaultValue();
    this.state = {
      asCustomer,
      accountInfo,
      value,
      error,
      errorPopUp,
      successful
    };

    autobind(this);
  }

  onSubmitAccountInfo() {
    const {
      error: { userName, password, email }
    } = this.state;
    if (!userName && !password && !email) {
      this.setState({ accountInfo: false });
    }
  }

  async onSubmitUserInfo() {
    const {
      asCustomer,
      value: {
        userName,
        email,
        password,
        name,
        sid,
        gender,
        birthDate,
        phone,
        bankName,
        bankAccountName,
        bankAccountNumber
      }
    } = this.state;
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    let payload = {
      userName,
      email,
      password,
      firstName,
      lastName,
      personalId: sid,
      gender,
      birthDate,
      phoneNumber: phone
    };
    if (asCustomer) {
      const res = await axios
        .post("http://" + API_ENDPOINT + "/customer/register", payload)
        .then(res => {
          return res.data;
        });
      if (res.error) {
        const errorPopUp = res.error;
        this.setState({ errorPopUp });
      } else {
        this.setState({ successful: true });
      }
    } else {
      payload.bankName = bankName;
      payload.bankAccountName = bankAccountName;
      payload.bankAccountNumber = bankAccountNumber;
      const res = await axios
        .post("http://" + API_ENDPOINT + "/guide/", payload)
        .then(res => {
          return res.data;
        });
      if (res.error) {
        const errorPopUp = res.error;
        this.setState({ errorPopUp });
      } else {
        this.setState({ successful: true });
      }
    }
  }

  closeSuccessful() {
    this.setState({ successful: false });
    this.onCloseModal();
  }

  onCloseModal() {
    const { asCustomer, accountInfo, value, error } = defaultValue();
    this.setState({
      asCustomer,
      accountInfo,
      value,
      error
    });
    this.props.onCloseModal();
  }

  switchToLogin() {
    this.props.onCloseModal();
    this.props.onOpenLoginModal();
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
      <div
        onKeyPress={e => {
          if (e.which === 13) {
            this.onSubmitAccountInfo();
          }
        }}
      >
        <div>Sign up as</div>
        <button
          onClick={() => this.setState({ asCustomer: true })}
          className={classNames({
            "btn selectiveButton-registerModal": true,
            selected: asCustomer,
            chooseRoleButton: true
          })}
        >
          Customer
        </button>
        <button
          onClick={() => this.setState({ asCustomer: false })}
          className={classNames({
            chooseRoleButton: true,
            "btn selectiveButton-registerModal": true,
            selected: !asCustomer
          })}
        >
          Guide
        </button>
        <Field
          label="Username: "
          value={value.userName}
          onChange={e =>
            this.onFieldChange(
              "userName",
              e.target.value,
              validation.validateUsername
            )
          }
          error={this.state.error.userName}
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
          className="btn btn-primary registerModal-next-btn"
        >
          Next
        </button>
        <div className="to-login-container">
          <div className="to-login-text">Already have an account ?</div>
          <div onClick={() => this.switchToLogin()} className="to-login-link">
            Log in
          </div>
        </div>
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
      <div
        onKeyPress={e => {
          if (e.which === 13) {
            this.onSubmitUserInfo();
          }
        }}
      >
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
            "btn selectiveButton-registerModal": true,
            selected: gender === "Male"
          })}
        >
          Male
        </button>
        <button
          onClick={() => this.onFieldChange("gender", "Female")}
          className={classNames({
            "btn selectiveButton-registerModal": true,
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
        <button
          onClick={() => this.setState({ accountInfo: true })}
          className="btn btn-danger registerModal-back-btn"
        >
          Back
        </button>
        <button
          onClick={this.onSubmitUserInfo}
          className="btn btn-primary registerModal-confirm-btn"
        >
          Confirm
        </button>
      </div>
    );
  }

  render() {
    const { accountInfo, successful, errorPopUp } = this.state;
    const renderObject = accountInfo
      ? this.renderAccount()
      : this.renderUserInfo();
    return (
      <Modal
        className="modal-container-registerModal"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        <PopUpModal
          isOpen={successful}
          onCloseModal={() => this.closeSuccessful()}
          headerText={"Register Sucess"}
          bodyText={""}
        />
        <PopUpModal
          isOpen={errorPopUp ? true : false}
          onCloseModal={() => this.setState({ errorPopUp: "" })}
          headerText={"Register Fail"}
          bodyText={errorPopUp}
          // onConfirm
        />
        <div className="registerModal-signUp-text">Sign Up</div>
        <Fragment>
          <div className="registerModal-formProgress-container">
            <FormProgress currentStep={accountInfo ? 1 : 2} />
          </div>
        </Fragment>
        {renderObject}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.modalName === "register" };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(registerModal(false)),
  onOpenLoginModal: () => dispatch(loginModal(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
