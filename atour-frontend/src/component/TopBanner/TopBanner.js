import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import { loginModal, registerModal } from "../../action/ModalAction";
import { logout, resizeWindow } from "../../action/ApplicationAction";
import { editProfile, getUserInfo } from "../../action/UserInfoAction";
import { seeBookHistory } from "../../action/BookAction";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../image/Atour-logo.jpg";
import autobind from "react-autobind";
import SideMenu from "../SideMenu/SideMenu";
import ClickOutSide from "react-click-outside-component";

class TopBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedDropdown: false,
      sideMenuStatus: "hidden",
      topTransparent: props.transparent
    };
    autobind(this);
  }

  componentDidMount() {
    const { resizeWindow } = this.props;
    document.addEventListener("scroll", this.onScroll);
    window.onresize = function() {
      resizeWindow(window.innerWidth);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.userName !== this.props.userInfo.userName) {
      this.setState({ isClickedDropdown: false });
    }
    if (nextProps.width > 710) {
      this.setState({ sideMenuStatus: "hidden" });
    }
    if (nextProps.transparent !== this.props.transparent) {
      this.setState({ topTransparent: nextProps.transparent });
    }
    if (
      this.props.isLoginSuccess !== nextProps.isLoginSuccess &&
      nextProps.isLoginSuccess
    ) {
      this.props.getUserInfo(
        nextProps.userInfo.userName,
        nextProps.userInfo.token
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    // This also can change to dispatch transparent action
    // May need to have variable to know which page need transparent
    const documentBody =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (documentBody > 90 || !this.props.transparent) {
      this.setState({ topTransparent: false });
    } else {
      this.setState({ topTransparent: true });
    }
  }

  setSideMenuStatus(status) {
    this.setState({ sideMenuStatus: status });
  }

  onClickOpenMenu() {
    const documentBody =
      document.body.scrollTop || document.documentElement.scrollTop;
    const { sideMenuStatus } = this.state;
    let nextStatus;
    if (sideMenuStatus === "hidden") {
      nextStatus = "isShowing";
      this.setState({ topTransparent: false });
    } else if (sideMenuStatus === "isShowing") {
      nextStatus = "isHidding";
      if (documentBody <= 90) {
        this.setState({ topTransparent: true });
      }
    }
    // else if (sideMenuStatus === "isHidding") nextStatus = "isShowing";
    else return;
    this.setState({ sideMenuStatus: nextStatus });
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
          {this.props.userInfo.role === "Customer" && (
            <Link className="topbanner-link" to="/bookedHistory">
              <div
                className="dropdown-item"
                onClick={() => {
                  this.props.seeBookHistory(this.props.userInfo.customerId);
                  this.setState({ isClickedDropdown: false });
                }}
              >
                <i className="fa fa-calendar topbanner-icon" />
                Booked History
              </div>
            </Link>
          )}
          {this.props.userInfo.role === "Guide" && (
            <div>
              <Link to="/publishedTour" className="topbanner-link">
                <div
                  className="dropdown-item"
                  onClick={() => this.setState({ isClickedDropdown: false })}
                >
                  <i className="fa fa-calendar topbanner-icon" />
                  Published Tour
                </div>
              </Link>
              <Link to="/viewDealtTrips" className="topbanner-link">
                <div
                  className="dropdown-item"
                  onClick={() => this.setState({ isClickedDropdown: false })}
                >
                  <i className="fa fa-th-list topbanner-icon" />
                  View Dealt Trip
                </div>
              </Link>
            </div>
          )}
          {this.props.userInfo.role !== "Admin" && (
            <Link to="/editProfile" className="topbanner-link">
              <div
                className="dropdown-item"
                onClick={() => {
                  this.props.editProfile();
                  this.setState({ isClickedDropdown: false });
                }}
              >
                <i className="fa fa-cog topbanner-icon" />
                Edit Profile
              </div>
            </Link>
          )}
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
            {this.props.userInfo.userName.substring(0, 8)}
          </div>

          <i className="fa fa-chevron-circle-down topbanner-dropdown-arrow" />
        </div>
        {dropDown}
      </div>
    );
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
    const renderSignIn = this.props.userInfo.userName
      ? this.renderSignIn()
      : this.renderNotSignIn();
    return (
      <div className="topbanner-right-container">
        <div className="topbanner-right topbanner-first">
          <Link
            to={{ pathname: "/searchForTour", state: { isSearch: true } }}
            className="topbanner-link"
          >
            <div className="topbanner-menu">Search for Tour</div>
          </Link>
        </div>
        <div className="topbanner-right">
          <Link to="/searchForGuide" className="topbanner-link">
            <div className="topbanner-menu">Search for Guide</div>
          </Link>
        </div>
        {renderSignIn}
      </div>
    );
  }

  render() {
    const { sideMenuStatus, topTransparent } = this.state;
    const path = this.props.location.pathname;
    const renderMenu =
      this.props.width <= 710 ? this.renderSideMenuButton() : this.renderMenu();
    return (
      <div>
        <LoginModal />
        <RegisterModal />
        <div className="topbanner">
          <SideMenu
            sideMenuStatus={sideMenuStatus}
            setSideMenuStatus={this.setSideMenuStatus}
            path={path}
          />
          <div
            className={`topbanner-banner${
              topTransparent ? "--transparent" : ""
            }`}
          >
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
  width: state.app.width,
  isLoginSuccess: state.user.isLoginSuccess
});

const mapDispatchToProps = dispatch => ({
  openRegisterModal: () => dispatch(registerModal(true)),
  openLoginModal: () => dispatch(loginModal(true)),
  logout: () => dispatch(logout()),
  resizeWindow: width => dispatch(resizeWindow(width)),
  editProfile: () => dispatch(editProfile()),
  getUserInfo: (userName, token) => dispatch(getUserInfo(userName, token)),
  seeBookHistory: customerId => dispatch(seeBookHistory(customerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBanner);
