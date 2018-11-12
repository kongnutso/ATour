import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import { loginModal, registerModal } from "../../action/ModalAction";
import { logout, resizeWindow } from "../../action/ApplicationAction";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../image/Atour-logo.jpg";
import autobind from "react-autobind";
import ClickOutSide from "react-click-outside-component";
import $ from "jquery";

class TopBanner extends React.Component {
  constructor() {
    super();
    this.state = { isClickedDropdown: false, sideMenuStatus: "hidden" };
    autobind(this, "renderNotSignIn", "renderSignIn");
  }

  componentDidMount() {
    const { resizeWindow } = this.props;
    window.onresize = function() {
      resizeWindow(window.innerWidth);
    };
    $(".topbanner-menu-minimized-menu").bind(
      "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      () => this.toHidden()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.username !== this.props.userInfo.username) {
      this.setState({ isClickedDropdown: false });
    }
    if (nextProps.width > 710) {
      this.setState({ sideMenuStatus: "hidden" });
    }
  }

  onLogOutSideMenu() {
    this.onCloseSideMenu();
    this.props.logout();
  }

  toHidden() {
    if (this.state.sideMenuStatus === "isHidding")
      this.setState({ sideMenuStatus: "hidden" });
  }

  renderNotSignIn() {
    return (
      <div className="topbanner-user-container">
        <div className="topbanner-right">
          <div
            onClick={this.props.openRegisterModal}
            className="topbanner-menu"
          >
            Sign up
          </div>
        </div>
        <div className="topbanner-right">
          <div className="topbanner-menu" onClick={this.props.openLoginModal}>
            Login
          </div>
        </div>
      </div>
    );
  }

  renderSignIn() {
    const dropDown = this.state.isClickedDropdown ? (
      <ClickOutSide
        onClickOutside={() => this.setState({ isClickedDropdown: false })}
      >
        <div className="topbanner-login-dropdown">
          {this.props.userInfo.role === "Customer" ? (
            <Link className="topbanner-link" to="/bookedHistory">
              <div
                className="dropdown-item"
                onClick={() => this.setState({ isClickedDropdown: false })}
              >
                <i className="fa fa-calendar topbanner-icon" />
                Booked History
              </div>
            </Link>
          ) : (
            <Link to="/publishedTour" className="topbanner-link">
              <div
                className="dropdown-item"
                onClick={() => this.setState({ isClickedDropdown: false })}
              >
                <i className="fa fa-calendar topbanner-icon" />
                Published Tour
              </div>
            </Link>
          )}
          <Link to="/editProfile" className="topbanner-link">
            <div
              className="dropdown-item"
              onClick={() => this.setState({ isClickedDropdown: false })}
            >
              <i className="fa fa-cog topbanner-icon" />
              Edit Profile
            </div>
          </Link>
          <Link to="/" className="topbanner-link">
            <div
              className="dropdown-item"
              onClick={() => {
                this.props.logout();
              }}
            >
              <i className="fa fa-sign-out topbanner-icon" />
              Log out
            </div>
          </Link>
        </div>
      </ClickOutSide>
    ) : null;
    return (
      <div className="topbanner-login-container">
        <div
          className="topbanner-login-banner"
          onClick={() => this.setState({ isClickedDropdown: true })}
        >
          <div className="topbanner-role">{this.props.userInfo.role}</div>
          <div className="topbanner-as-username">
            {this.props.userInfo.username.substring(0, 8)}
          </div>
          <i className="fa fa-arrow-circle-down topbanner-dropdown-arrow" />
        </div>
        {dropDown}
      </div>
    );
  }

  renderNotSignInSideMenu() {
    return (
      <div>
        <div
          className={"dropdown-item topbanner-menu-minimized-item"}
          onClick={() => {
            this.onSignUpSideMenu();
          }}
        >
          <i className="fa fa-user-plus topbanner-icon" />
          Sign up
        </div>
        <div
          className={"dropdown-item topbanner-menu-minimized-item"}
          onClick={() => {
            this.onLoginSideMenu();
          }}
        >
          <i className="fa fa-sign-in topbanner-icon" />
          Login
        </div>
      </div>
    );
  }

  renderSignInSideMenu() {
    const path = this.props.location.pathname;
    return (
      <div>
        <div className="dropdown-item topbanner-menu-minimized-userInfo">
          {this.props.userInfo.role}
          {": "}
          {this.props.userInfo.username.substring(0, 8)}
        </div>
        <Link className="topbanner-menu-minimized-link" to="/bookedHistory">
          <div
            className={
              "dropdown-item topbanner-menu-minimized-item topbanner-menu-minimized-user" +
              (path === "/bookedHistory"
                ? " topbanner-menu-minimized-selected-item"
                : "")
            }
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-calendar topbanner-icon" />
            Booked History
          </div>
        </Link>
        <Link className="topbanner-menu-minimized-link" to="/editProfile">
          <div
            className={
              "dropdown-item topbanner-menu-minimized-item topbanner-menu-minimized-user" +
              (path === "/editProfile"
                ? " topbanner-menu-minimized-selected-item"
                : "")
            }
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-cog topbanner-icon" />
            Edit Profile
          </div>
        </Link>
        <Link className="topbanner-menu-minimized-link" to="/">
          <div
            className="dropdown-item topbanner-menu-minimized-item topbanner-menu-minimized-user"
            onClick={() => this.onLogOutSideMenu()}
          >
            <i className="fa fa-sign-out topbanner-icon" />
            Log out
          </div>
        </Link>
      </div>
    );
  }

  renderSideMenu() {
    const renderUserInfo = this.props.userInfo.username
      ? this.renderSignInSideMenu()
      : this.renderNotSignInSideMenu();
    return (
      <div>
        <div className="topbanner-menu-minimized" />
        <Link className="topbanner-menu-minimized-link" to="/">
          <div
            className={"dropdown-item topbanner-menu-minimized-item"}
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-search topbanner-icon" /> Search for Tour
          </div>
        </Link>
        <Link className="topbanner-menu-minimized-link" to="/">
          <div
            className="dropdown-item topbanner-menu-minimized-item"
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-search topbanner-icon" /> Search for Guide
          </div>
        </Link>
        {renderUserInfo}
      </div>
    );
  }

  onClickOpenMenu() {
    const { sideMenuStatus } = this.state;
    let nextStatus;
    if (sideMenuStatus === "hidden") nextStatus = "isShowing";
    else if (sideMenuStatus === "isShowing") nextStatus = "isHidding";
    // else if (sideMenuStatus === "isHidding") nextStatus = "isShowing";
    else return;
    this.setState({ sideMenuStatus: nextStatus });
  }

  onCloseSideMenu() {
    if (this.state.sideMenuStatus === "isShowing") {
      this.setState({ sideMenuStatus: "isHidding" });
    }
  }

  onLoginSideMenu() {
    this.onCloseSideMenu();
    this.props.openLoginModal();
  }

  onSignUpSideMenu() {
    this.onCloseSideMenu();
    this.props.openRegisterModal();
  }

  renderSideMenuButton() {
    return (
      <div className="topbanner-menu-minimized-container">
        <div className="topbanner-menu-minimized-btn">
          <i
            className="fa fa-bars topbanner-menu-minimized-icon"
            onClick={() => {
              this.onClickOpenMenu();
            }}
          />
        </div>
      </div>
    );
  }

  renderMenu() {
    const renderSignIn = this.props.userInfo.username
      ? this.renderSignIn()
      : this.renderNotSignIn();
    return (
      <div className="topbanner-right-container">
        <div className="topbanner-right topbanner-first">
          <div className="topbanner-menu">Search for Tour</div>
        </div>
        <div className="topbanner-right">
          <div className="topbanner-menu">Search for Guide</div>
        </div>
        {renderSignIn}
      </div>
    );
  }

  render() {
    const { sideMenuStatus } = this.state;
    const MenuClassName = "topbanner-menu-minimized-menu " + sideMenuStatus;
    const Menu = sideMenuStatus === "hidden" ? null : this.renderSideMenu();
    const width =
      sideMenuStatus === "hidden"
        ? 0
        : window.innerWidth <= 500
        ? window.innerWidth / 2
        : window.innerWidth <= 600
        ? (window.innerWidth * 2) / 5
        : window.innerWidth / 3;
    const height = sideMenuStatus === "hidden" ? 0 : window.innerHeight;
    const renderMenu =
      this.props.width <= 710 ? this.renderSideMenuButton() : this.renderMenu();
    return (
      <div>
        <LoginModal />
        <RegisterModal />
        <div className="topbanner">
          <div className={MenuClassName} style={{ height }}>
            {Menu}
          </div>
          <div className="topbanner-banner">
            <div className="topbanner-logo-container">
              <div className="topbanner-logo">
                <Link to="/">
                  <img
                    className="topbanner-logo-img"
                    src={logo}
                    alt="topbanner-logo"
                  />
                </Link>
              </div>
            </div>
            {renderMenu}
          </div>
        </div>
        <div style={{ height: "50px" }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user,
  width: state.app.width
});

const mapDispatchToProps = dispatch => ({
  openRegisterModal: () => dispatch(registerModal(true)),
  openLoginModal: () => dispatch(loginModal(true)),
  logout: () => dispatch(logout()),
  resizeWindow: width => dispatch(resizeWindow(width))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBanner);
