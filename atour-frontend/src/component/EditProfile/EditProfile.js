import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box, Image } from 'rebass';
import { editUserInfo } from '../../action/UserInfoAction';
import './styles.css';
import { validateEmail, validatePhone } from '../../utils/validation';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = { email: '', phoneNumber: '' };
  }
  componentWillReceiveProps(nextProps) {
    const { email, phoneNumber } = nextProps.userInfo;
    this.setState({ email, phoneNumber });
  }

  componentDidMount() {
    const { email, phoneNumber } = this.props.userInfo;
    this.setState({ email, phoneNumber });
  }

  editUserInfo() {
    const { email, phoneNumber } = this.state;
    const { userInfo, token } = this.props;
    if (
      email !== this.props.userInfo.email ||
      phoneNumber !== this.props.userInfo.phoneNumber
    ) {
      const emailError = validateEmail(email);
      const phoneError = validatePhone(phoneNumber);
      let errorMessage =
        emailError && phoneError
          ? emailError + '\n' + phoneError
          : emailError
          ? emailError
          : phoneError
          ? phoneError
          : '';
      if (!errorMessage) {
        const res = userInfo;
        res.email = email;
        res.phoneNumber = phoneNumber;
        this.props.editUserInfo(res, token);
      }
    }
  }

  render() {
    const {
      firstName,
      lastName,
      personalId,
      gender,
      birthDate
    } = this.props.userInfo;
    const { email, phoneNumber } = this.state;
    const { isView } = this.props;
    const headerText = isView ? 'Guide Profile' : 'Edit Profile';
    return (
      <div className="editProfilePage">
        <div className="editProfilePage-header">
          <i className="fa fa-cog editProfilePage-header-icon" />
          <div className="editProfilePage-header-text">{headerText}</div>
        </div>
        <div className="editProfilePage-content-container">
          <Flex className="editProfilePage-content">
            <Box
              className="editProfilePage-content-img-container"
              p={3}
              width={[1, 1, 2 / 3, 1 / 3]}
            >
              <Image
                src="https://source.unsplash.com/random/720x720"
                className="editProfilePage-content-img"
              />
            </Box>
            <Box
              className="editProfilePage-content-box"
              p={3}
              width={[1, 1, 3 / 4, 1 / 2]}
            >
              <div style={{ fontWeight: '600' }}>Personnal Info</div>
              <div className="editProfilePage-content-info">
                <Flex>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div>Name</div>
                  </Box>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div className="editProfilePage-content-info-userinfo">
                      {firstName + ' ' + lastName}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Social ID</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="editProfilePage-content-info-userinfo">
                      {personalId}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Gender</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="editProfilePage-content-info-userinfo">
                      {gender}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Birthdate</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="editProfilePage-content-info-userinfo">
                      {birthDate}
                    </div>
                  </Box>
                </Flex>
              </div>

              <div style={{ fontWeight: '600', marginTop: '30px' }}>
                Contact Info
              </div>
              <div className="editProfilePage-content-info">
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Phone Number</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    {isView ? (
                      <div>{phoneNumber}</div>
                    ) : (
                      <input
                        className="form-control"
                        value={phoneNumber}
                        onChange={e =>
                          this.setState({ phoneNumber: e.target.value })
                        }
                      />
                    )}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Email</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    {isView ? (
                      <div>{email}</div>
                    ) : (
                      <input
                        className="form-control"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    )}
                  </Box>
                </Flex>
              </div>
              {isView ? null : (
                <button
                  onClick={() => this.editUserInfo()}
                  className="btn btn-primary editProfilePage-save-btn"
                >
                  Save
                </button>
              )}
            </Box>
          </Flex>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isView, profile, guideInfo, token, email, personalId } = state.user;
  return {
    userInfo: isView ? guideInfo : { ...profile, email, personalId },
    isView,
    token
  };
};

const mapDispatchToProps = dispatch => ({
  editUserInfo: (userInfo, token) => dispatch(editUserInfo(userInfo, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
