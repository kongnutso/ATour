import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import { loginModal, registerModal } from "../../action/modalAction";
import LoginModal from "../LoginModal/LoginModal";

class TopBanner extends React.Component {
  render() {
    return (
      <div>
        <LoginModal />
        <RegisterModal />
        <div className="banner">
          <Link to="/">
            <div className="home">ATour</div>
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
