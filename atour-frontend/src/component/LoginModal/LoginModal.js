import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { loginModal, registerModal } from "../../action/ModalAction";
import { login } from "../../action/ApplicationAction";
import classNames from "classnames";
import autobind from "react-autobind";
import "./styles.css";

class LoginModal extends React.Component {
  constructor() {
    super();
    this.state = { asCustomer: true, username: "", password: "" };
    autobind(this, "switchToSignUp", "login");
  }

  login() {
    const { username, password, asCustomer } = this.state;
    this.props.onCloseModal();
    this.props.login(username, password, asCustomer ? "Customer" : "Guide");
  }

  switchToSignUp() {
    this.props.onCloseModal();
    this.props.onOpenRegisterModal();
  }

  render() {
    const { asCustomer, username, password } = this.state;
    return (
      <Modal
        className="modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
      >
        <div className="login">Log in</div>
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
        <div className="login-label">Username</div>
        <input
          className="text-field"
          value={username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <div className="login-label">Password</div>
        <input
          className="text-field"
          type="password"
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button onClick={() => this.login()} className="btn login-btn">
          {" "}
          Login{" "}
        </button>
        <div className="to-register-container">
          <div className="to-register-text">Don't have an account ?</div>
          <div
            onClick={() => this.switchToSignUp()}
            className="to-register-link"
          >
            Sign up
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.login
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(loginModal(false)),
  onOpenRegisterModal: () => dispatch(registerModal(true)),
  login: (username, password, role) => dispatch(login(username, password, role))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
