import React from "react";
import { connect } from "react-redux";
import { Flex, Box, Image } from "rebass";
import {
  editUserInfo,
  updated,
  getGuideInfo
} from "../../action/UserInfoAction";
import "./styles.css";
import { dateToString } from "../../utils/utils";
import { validateEmail, validatePhone } from "../../utils/validation";
import logo from "../../image/Atour-logo.jpg";
import Cards from "../Cards/Cards";
import PopUpModal from "../PopUpModal/PopUpModal";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      phoneNumber: "",
      profileImageUrl: "",
      saveChanged: false
    };
  }

  componentWillUnmount() {
    this.props.updated();
  }

  componentWillReceiveProps(nextProps) {
    const { email, phoneNumber, profileImageUrl } = nextProps.userInfo;
    this.setState({ email, phoneNumber, profileImageUrl });
    if (nextProps.isUpdated) {
      this.setState({ saveChanged: true });
      this.props.updated();
    }
  }

  componentDidMount() {
    const { email, phoneNumber, profileImageUrl } = this.props.userInfo;
    this.setState({ email, phoneNumber, profileImageUrl });
    if (this.props.role === "Guide" || this.props.isView) {
      this.props.getGuideInfo(this.props.userInfo.guideId);
    }
  }

  editUserInfo() {
    const { email, phoneNumber, profileImageUrl } = this.state;
    const { userInfo, token, role } = this.props;
    if (
      email !== this.props.userInfo.email ||
      phoneNumber !== this.props.userInfo.phoneNumber ||
      profileImageUrl !== this.props.userInfo.profileImageUrl
    ) {
      const emailError = validateEmail(email);
      const phoneError = validatePhone(phoneNumber);

      let errorMessage =
        emailError && phoneError
          ? emailError + "\n" + phoneError
          : emailError
          ? emailError
          : phoneError
          ? phoneError
          : "";
      if (!errorMessage) {
        const res = userInfo;
        res.profileImageUrl = profileImageUrl;
        res.email = email;
        res.phoneNumber = phoneNumber;
        this.props.editUserInfo(res, token, role);
      }
    }
  }

  render() {
    const {
      firstName,
      lastName,
      personalId,
      gender,
      birthDate,
      publishedTours
    } = this.props.userInfo;
    const { email, phoneNumber, profileImageUrl } = this.state;
    const { isView } = this.props;
    const headerText = isView ? "Guide Profile" : "Edit Profile";
    return (
      <div className="editProfilePage">
        <PopUpModal
          isOpen={this.state.saveChanged}
          onCloseModal={() => this.setState({ saveChanged: false })}
          headerText="Your Information is updated"
        />
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
              <div>
                <Image
                  src={profileImageUrl || logo}
                  className="editProfilePage-content-img"
                />
                {(this.props.role === "Guide" || isView) &&
                this.props.userInfo._type === 2 ? (
                  <div className="bad-guid">BAD GUIDE</div>
                ) : null}
                {isView ? null : (
                  <input
                    placeholder="your image url"
                    value={profileImageUrl}
                    onChange={e =>
                      this.setState({ profileImageUrl: e.target.value })
                    }
                    className="editProfilePage-content-img-input form-control"
                  />
                )}
              </div>
            </Box>
            <Box
              className="editProfilePage-content-box"
              p={3}
              width={[1, 1, 3 / 4, 1 / 2]}
            >
              <div style={{ fontWeight: "600" }}>Personnal Info</div>
              <div className="editProfilePage-content-info">
                <Flex>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div>Name</div>
                  </Box>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div className="editProfilePage-content-info-userinfo">
                      {firstName + " " + lastName}
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
                      {dateToString(birthDate)}
                    </div>
                  </Box>
                </Flex>
              </div>

              <div style={{ fontWeight: "600", marginTop: "30px" }}>
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
        {isView ? (
          <div className="editProfilePage-tour-container">
            <div className="editProfilePage-tour-header">Tour</div>
            <Cards role="Customer" isGuide={false} items={publishedTours} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isView,
    profile,
    guideInfo,
    token,
    email,
    personalId,
    role,
    customerId,
    userName,
    isUpdated
  } = state.user;
  return {
    userInfo: isView
      ? { ...guideInfo, ...guideInfo.profile }
      : role === "Customer"
      ? { ...profile, email, personalId, customerId, userName }
      : { ...guideInfo, ...guideInfo.profile },
    isView,
    role,
    token,
    isUpdated
  };
};

const mapDispatchToProps = dispatch => ({
  editUserInfo: (userInfo, token, role) =>
    dispatch(editUserInfo(userInfo, token, role)),
  updated: () => dispatch(updated()),
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
