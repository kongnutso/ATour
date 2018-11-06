import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import "./styles.css";

function getInputType(input) {
  if (input === "password") return "password";
  else if (input === "birthDate") return "date";
  else return "text";
}

class RegisterPage extends React.Component {
  renderDropDown(field) {
    const { input, label, choice } = field;
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
        <select className="form-control" {...input}>
          {renderChoice}
        </select>
      </div>
    );
  }

  renderField(field) {
    const { meta, input, label } = field;
    const className =
      "form-group " +
      (meta.touched ? (meta.error ? "has-danger" : "correct") : "");
    return (
      <div className={className}>
        <label>{label}</label>
        <div>
          <input
            type={getInputType(input.name)}
            {...input}
            className="form-control"
          />
          <div className="error-text">{meta.touched ? meta.error : ""}</div>
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        RegisterPage
        <Field
          label="Username: "
          name="username"
          component={this.renderField}
        />
        <Field
          label="Password: "
          name="password"
          component={this.renderField}
        />
        <Field label="Name: " name="name" component={this.renderField} />
        <Field label="Personnal ID: " name="pid" component={this.renderField} />
        <Field
          label="Gender: "
          name="gender"
          choice={["Male", "Female"]}
          component={this.renderDropDown}
        />
        <Field label="Email: " name="email" component={this.renderField} />
        <Field
          label="Birth Date: "
          name="birthDate"
          component={this.renderField}
        />
        <Field
          label="Phone number: "
          name="phone"
          component={this.renderField}
        />
        <Field label="Address: " name="address" component={this.renderField} />
        <Field
          label="Bank: "
          name="bank"
          choice={["SCB", "KBANK", "XXX"]}
          component={this.renderDropDown}
        />
        <Field
          label="Bank Account Name: "
          name="bankAccountName"
          component={this.renderField}
        />{" "}
        <Field
          label="Bank Account Number: "
          name="bankAccountNumber"
          component={this.renderField}
        />
        <button className="btn btn-primary">Confirm</button>
        <Link to="/">
          <button className="btn btn-danger">Cancel</button>
        </Link>
      </form>
    );
  }
}
const emailRegex = /\w+@\w+\.\w+/;
function validatePID(pid) {
  if (pid.length !== 13) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseFloat(pid.charAt(i)) * (13 - i);
  if ((11 - (sum % 11)) % 10 !== parseFloat(pid.charAt(12))) return false;
  return true;
}

function validate(values) {
  const errors = {
    username: "",
    password: "",
    email: "",
    pid: "",
    phone: "",
    name: "",
    bankAccountName: "",
    bankAccountNumber: ""
  };
  if (!values.username || values.username.length < 6) {
    errors.username = "Username must be ...";
  }
  if (!values.password || values.password.length < 6) {
    errors.password = "Password length must more than 6";
  }
  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "Please enter email in the correct format";
  }
  if (!values.pid || !validatePID(values.pid)) {
    errors.pid = "Invalid Personnal ID";
  }
  if (!values.phone || (values.phone.length !== 10 || isNaN(values.phone))) {
    errors.phone = "Invalid Phone number";
  }
  if (!values.address || values.address.length < 20) {
    errors.address = "Address length must more than 20";
  }
  if (!values.name || values.name.length < 5) {
    errors.name = "Name must ...";
  }
  if (!values.bankAccountName || values.bankAccountName.length < 5) {
    errors.bankAccountName = "Bank Account Name must ...";
  }
  if (
    !values.bankAccountNumber ||
    values.bankAccountNumber.length !== 7 ||
    isNaN(values.bankAccountNumber)
  ) {
    errors.bankAccountNumber = "Bank Account Number must ...";
  }
  return errors;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default reduxForm({
  validate,
  form: "RegisterPage"
})(
  connect(
    null,
    mapDispatchToProps
  )(RegisterPage)
);
