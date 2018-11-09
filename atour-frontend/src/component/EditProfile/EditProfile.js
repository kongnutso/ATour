import React from "react";
import { connect } from "react-redux";
import { Flex, Box, Image } from "rebass";
import { editUserInfo } from "../../action/ApplicationAction";
import "./styles.css";
import { validateEmail, validatePhone } from "../../utils/validation";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = { email: "", phone: "" };
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps");
    const { email, phone } = nextProps.userInfo;
    this.setState({ email, phone });
  }

  componentDidMount() {
    const { email, phone } = this.props.userInfo;
    this.setState({ email, phone });
  }

  editUserInfo() {
    const { email, phone } = this.state;
    if (
      email !== this.props.userInfo.email ||
      phone !== this.props.userInfo.phone
    ) {
      const emailError = validateEmail(email);
      const phoneError = validatePhone(phone);
      let errorMessage =
        emailError && phoneError
          ? emailError + "\n" + phoneError
          : emailError
          ? emailError
          : phoneError
          ? phoneError
          : "";
      if (!errorMessage) {
        this.props.editUserInfo({ email, phone });
      }
    }
  }

  render() {
    const { name, socialID, gender, birthDate } = this.props.userInfo;
    const { email, phone } = this.state;
    return (
      <div className="editProfilePage">
        <div className="editProfilePage-header">
          <i className="fa fa-cog editProfilePage-header-icon" />
          <div className="editProfilePage-header-text">Edit Profile</div>
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
              <div style={{ fontWeight: "600" }}>Personnal Info</div>
              <div className="editProfilePage-content-info">
                <Flex>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div>Name</div>
                  </Box>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div className="editProfilePage-content-info-userinfo">
                      {name}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Social ID</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="editProfilePage-content-info-userinfo">
                      {socialID}
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

              <div style={{ fontWeight: "600", marginTop: "30px" }}>
                Contact Info
              </div>
              <div className="editProfilePage-content-info">
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Phone Number</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <input
                      className="form-control"
                      value={phone}
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Email</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <input
                      className="form-control"
                      value={email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Box>
                </Flex>
              </div>
              <button
                onClick={() => this.editUserInfo()}
                className="btn btn-primary editProfilePage-save-btn"
              >
                Save
              </button>
            </Box>
          </Flex>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userInfo: state.user.userInfo };
};

const mapDispatchToProps = dispatch => ({
  editUserInfo: userInfo => dispatch(editUserInfo(userInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
