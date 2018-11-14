import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { loginModal, registerModal } from '../../action/ModalAction';
import { loginSuccess } from '../../action/ApplicationAction';
import { getUserInfo } from '../../action/UserInfoAction';
import classNames from 'classnames';
import autobind from 'react-autobind';
import PopUpModal from '../../component/PopUpModal/PopUpModal';
import './styles.css';
import axios from 'axios';

class LoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      asCustomer: true,
      username: '',
      password: '',
      errorMessage: ''
    };
    autobind(this, 'switchToSignUp', 'login');
  }

  async login() {
    const { username, password, asCustomer } = this.state;
    const res = await axios
      .post('http://localhost:3000/customer/login', {
        userName: username,
        password
      })
      .then(res => {
        return res.data;
      });
    if (res.error) {
      this.setState({ errorMessage: 'Invalid username or password' });
    } else {
      this.props.loginSuccess(res, asCustomer, username);
      this.props.getUserInfo(username, res);
      this.setState({
        asCustomer: true,
        username: '',
        password: '',
        errorMessage: ''
      });
      this.props.onCloseModal();
    }
  }

  switchToSignUp() {
    this.props.onCloseModal();
    this.props.onOpenRegisterModal();
  }

  onCloseLoginModal() {
    this.setState({ asCustomer: true, username: '', password: '' });
    this.props.onCloseModal();
  }

  render() {
    const { asCustomer, username, password, errorMessage } = this.state;
    return (
      <Modal
        className="modal-container-loginModal"
        style={{
          overlay: {
            overflow: 'auto'
          }
        }}
        isOpen={this.props.isOpen}
        onRequestClose={() => this.onCloseLoginModal()}
        ariaHideApp={false}
      >
        <PopUpModal
          isOpen={errorMessage ? true : false}
          onCloseModal={() => this.setState({ errorMessage: '' })}
          headerText={'Login Fail'}
          bodyText={errorMessage}
          // onConfirm
        />
        <div
          onKeyPress={e => {
            if (e.which === 13) {
              this.login();
            }
          }}
        >
          <div className="loginModal-login">Log in</div>
          <button
            onClick={() => this.setState({ asCustomer: true })}
            className={classNames({
              'btn loginModal-selectiveButton': true,
              'loginModal-selected': asCustomer
            })}
          >
            Customer
          </button>
          <button
            onClick={() => this.setState({ asCustomer: false })}
            className={classNames({
              'btn loginModal-selectiveButton': true,
              'loginModal-selected': !asCustomer
            })}
          >
            Guide
          </button>
          <div className="loginModal-login-label">Username</div>
          <input
            className="loginModal-text-field"
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <div className="loginModal-login-label">Password</div>
          <input
            className="loginModal-text-field"
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button
            onClick={() => this.login()}
            className="btn loginModal-login-btn"
          >
            Login
          </button>
          <div className="loginModal-to-register-container">
            <div className="loginModal-to-register-text">
              Don't have an account ?
            </div>
            <div
              onClick={() => this.switchToSignUp()}
              className="loginModal-to-register-link"
            >
              Sign up
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.modalName === 'login'
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(loginModal(false)),
  onOpenRegisterModal: () => dispatch(registerModal(true)),
  loginSuccess: (token, role, username) =>
    dispatch(loginSuccess(token, role, username)),
  getUserInfo: (username, token) => dispatch(getUserInfo(username, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
