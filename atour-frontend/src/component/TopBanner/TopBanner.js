import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { Link } from 'react-router-dom';
import RegisterModal from '../RegisterModal/RegisterModal';
import { loginModal, registerModal } from '../../action/ModalAction';
import { logout, resizeWindow } from '../../action/ApplicationAction';
import { editProfile } from '../../action/UserInfoAction';
import LoginModal from '../LoginModal/LoginModal';
import logo from '../../image/Atour-logo.jpg';
import autobind from 'react-autobind';
import SideMenu from '../SideMenu/SideMenu';
import ClickOutSide from 'react-click-outside-component';

class TopBanner extends React.Component {
  constructor() {
    super();
    this.state = { isClickedDropdown: false, sideMenuStatus: 'hidden' };
    autobind(this);
  }

  componentDidMount() {
    const { resizeWindow } = this.props;
    window.onresize = function() {
      resizeWindow(window.innerWidth);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.username !== this.props.userInfo.username) {
      this.setState({ isClickedDropdown: false });
    }
    if (nextProps.width > 710) {
      this.setState({ sideMenuStatus: 'hidden' });
    }
  }

  setSideMenuStatus(status) {
    this.setState({ sideMenuStatus: status });
  }

  onClickOpenMenu() {
    const { sideMenuStatus } = this.state;
    let nextStatus;
    if (sideMenuStatus === 'hidden') nextStatus = 'isShowing';
    else if (sideMenuStatus === 'isShowing') nextStatus = 'isHidding';
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
          {this.props.userInfo.role === 'Customer' ? (
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
              <Link to="/viewDealtTrip" className="topbanner-link">
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
        <div style={{ height: '50px' }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user,
    width: state.app.width
  };
};

const mapDispatchToProps = dispatch => ({
  openRegisterModal: () => dispatch(registerModal(true)),
  openLoginModal: () => dispatch(loginModal(true)),
  logout: () => dispatch(logout()),
  resizeWindow: width => dispatch(resizeWindow(width)),
  editProfile: () => dispatch(editProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBanner);
