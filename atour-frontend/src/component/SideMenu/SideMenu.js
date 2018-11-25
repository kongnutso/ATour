import React from 'react';
import { connect } from 'react-redux';
import { loginModal, registerModal } from '../../action/ModalAction';
import { logout } from '../../action/ApplicationAction';
import { Link } from 'react-router-dom';
import './styles.css';
import $ from 'jquery';

class SideMenu extends React.Component {
  componentDidMount() {
    $('.side-menu-menu').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', () =>
      this.toHidden()
    );
  }

  onLogOutSideMenu() {
    this.onCloseSideMenu();
    this.props.logout();
  }

  toHidden() {
    if (this.props.sideMenuStatus === 'isHidding') this.props.setSideMenuStatus('hidden');
  }

  renderNotSignInSideMenu() {
    return (
      <div>
        <div
          className={'dropdown-item side-menu-item'}
          onClick={() => {
            this.onSignUpSideMenu();
          }}
        >
          <i className="fa fa-user-plus topbanner-icon" />
          Sign up
        </div>
        <div
          className={'dropdown-item side-menu-item'}
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
    const {
      path,
      userInfo: { role, userName },
    } = this.props;
    let userFunction;
    if (role === 'Customer') {
      userFunction = (
        <Link className="side-menu-link" to="/bookedHistory">
          <div
            className={
              'dropdown-item side-menu-item side-menu-user' +
              (path === '/bookedHistory' ? ' side-menu-selected-item' : '')
            }
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-calendar topbanner-icon" />
            Booked History
          </div>
        </Link>
      );
    } else if (role === 'Guide') {
      userFunction = (
        <div>
          <Link className="side-menu-link" to="/publishedTour">
            <div
              className={
                'dropdown-item side-menu-item side-menu-user' +
                (path === '/bookedHistory' ? ' side-menu-selected-item' : '')
              }
              onClick={() => this.onCloseSideMenu()}
            >
              <i className="fa fa-calendar topbanner-icon" />
              Published Tour
            </div>
          </Link>
          <Link className="side-menu-link" to="/viewDealtTrip">
            <div
              className={
                'dropdown-item side-menu-item side-menu-user' +
                (path === '/viewDealtTrip' ? ' side-menu-selected-item' : '')
              }
              onClick={() => this.onCloseSideMenu()}
            >
              <i className="fa fa-th-list topbanner-icon" />
              View Dealt Trip
            </div>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <div className="dropdown-item side-menu-userInfo">
          {role}
          {': '}
          {userName.substring(0, 8)}
        </div>
        {userFunction}
        {role !== 'Admin' && (
          <Link className="side-menu-link" to="/editProfile">
            <div
              className={
                'dropdown-item side-menu-item side-menu-user' +
                (path === '/editProfile' ? ' side-menu-selected-item' : '')
              }
              onClick={() => this.onCloseSideMenu()}
            >
              <i className="fa fa-cog topbanner-icon" />
              Edit Profile
            </div>
          </Link>
        )}
        <Link className="side-menu-link" to="/">
          <div
            className="dropdown-item side-menu-item side-menu-user"
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
    const renderUserInfo = this.props.userInfo.userName
      ? this.renderSignInSideMenu()
      : this.renderNotSignInSideMenu();
    return (
      <div>
        <div className="side-menu" />
        <Link className="side-menu-link" to="/searchForTour">
          <div className={'dropdown-item side-menu-item'} onClick={() => this.onCloseSideMenu()}>
            <i className="fa fa-search topbanner-icon" /> Search for Tour
          </div>
        </Link>
        <Link className="side-menu-link" to="/searchForGuide">
          <div className="dropdown-item side-menu-item" onClick={() => this.onCloseSideMenu()}>
            <i className="fa fa-search topbanner-icon" /> Search for Guide
          </div>
        </Link>
        {renderUserInfo}
      </div>
    );
  }

  onClickOpenMenu() {
    const { sideMenuStatus } = this.props;
    let nextStatus;
    if (sideMenuStatus === 'hidden') nextStatus = 'isShowing';
    else if (sideMenuStatus === 'isShowing') nextStatus = 'isHidding';
    // else if (sideMenuStatus === "isHidding") nextStatus = "isShowing";
    else return;
    this.props.setSideMenuStatus(nextStatus);
  }

  onCloseSideMenu() {
    if (this.props.sideMenuStatus === 'isShowing') {
      this.props.setSideMenuStatus('isHidding');
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
      <div className="side-menu-container">
        <div className="side-menu-btn">
          <i
            className="fa fa-bars side-menu-icon"
            onClick={() => {
              this.onClickOpenMenu();
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { sideMenuStatus } = this.props;
    const MenuClassName = 'side-menu-menu ' + sideMenuStatus;
    const Menu = sideMenuStatus === 'hidden' ? null : this.renderSideMenu();
    const height = sideMenuStatus === 'hidden' ? 0 : window.innerHeight;
    return (
      <div className={MenuClassName} style={{ height }}>
        {Menu}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openRegisterModal: () => dispatch(registerModal(true)),
  openLoginModal: () => dispatch(loginModal(true)),
  logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
  userInfo: state.user,
  width: state.app.width,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
