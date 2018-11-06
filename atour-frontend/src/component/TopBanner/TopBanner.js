import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import autoBind from "react-autobind";
import "./styles.css";
import { Link } from "react-router-dom";

class TopBanner extends React.Component {
  constructor() {
    super();
    this.state = { isLoginModal: false, isRegisterModal: false };
    autoBind(
      this,
      "openLoginModal",
      "closeLoginModal",
      "openRegisterModal",
      "closeRegisterModal"
    );
  }
  openLoginModal() {
    this.setState({ isLoginModal: true });
  }
  closeLoginModal() {
    this.setState({ isLoginModal: false });
  }
  openRegisterModal() {
    this.setState({ isRegisterModal: true });
  }
  closeRegisterModal() {
    this.setState({ isRegisterModal: false });
  }
  render() {
    return (
      <div>
        <Modal
          className="Modal"
          isOpen={this.state.isLoginModal}
          onRequestClose={this.closeLoginModal}
        >
          Login Modal
        </Modal>
        <Modal
          className="Modal"
          isOpen={this.state.isRegisterModal}
          onRequestClose={this.closeRegisterModal}
        >
          Register Modal
        </Modal>
        <div className="banner">
          <Link to="/">
            <div className="home">ATour</div>
          </Link>
          <div className="right-container">
            <div className="right">Search for Tour</div>
            <div className="right">Search for Guide</div>
            <div className="right" onClick={this.openRegisterModal}>
              Sign up
            </div>
            <div className="right" onClick={this.openLoginModal}>
              Login
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(TopBanner);
