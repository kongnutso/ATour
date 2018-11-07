import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import { loginModal, registerModal } from "../../action/ModalAction";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../image/Atour-logo.jpg";

class TopBanner extends React.Component {
  render() {
    return (
      <div>
        <LoginModal />
        <RegisterModal />
        <div className="banner">
          <Link to="/">
            <div className="logo">
              <img className="logo-img" src={logo} alt="logo" />
            </div>
          </Link>
          <div className="right-container">
            <div className="right">Search for Tour</div>
            <div className="right">Search for Guide</div>
            <div className="right" onClick={this.props.openRegisterModal}>
              Sign up
            </div>
            <div className="right" onClick={this.props.openLoginModal}>
              Login
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openRegisterModal: () => dispatch(registerModal(true)),
  openLoginModal: () => dispatch(loginModal(true))
});

export default connect(
  null,
  mapDispatchToProps
)(TopBanner);
