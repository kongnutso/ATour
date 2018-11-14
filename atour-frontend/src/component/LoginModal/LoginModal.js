import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { loginModal, registerModal } from '../../action/ModalAction';
import { login } from '../../action/ApplicationAction';
import classNames from 'classnames';
import autobind from 'react-autobind';
import PopUpModal from '../../component/PopUpModal/PopUpModal';
import './styles.css';

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

  login() {
    const { username, password, asCustomer } = this.state;
    // const res = await axios
    //     .post('http://localhost:3000/customer/login', {userName: username, password})
    //     .then(res => {
    //       return res.data;
    //     });
    // if (
    //   (username === 'kongnut' || username === 'kongnut1') &&
    //   password === '123456'
    // ) {
    // this.props.onCloseModal();
    this.props.login(username, password, asCustomer ? 'Customer' : 'Guide');
    this.setState({
      asCustomer: true,
      username: '',
      password: '',
      errorMessage: ''
    });
    // } else {
    //   this.setState({ errorMessage: 'Invalid username or password' });
    // }
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
  login: (username, password, role) => dispatch(login(username, password, role))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
