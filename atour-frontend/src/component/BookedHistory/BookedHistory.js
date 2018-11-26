import React from "react";
import { connect } from "react-redux";
import autobind from "react-autobind";
import { Flex, Box } from "rebass";
import { Redirect } from "react-router-dom";
import tour from "../../image/Tour.jpg";
import { selectBookedTrip } from "../../action/BookAction";
import { getUserInfo } from "../../action/UserInfoAction";
import { seeBookHistory } from "../../action/BookAction";
import { dateToString } from "../../utils/utils";
import { toStatus } from "../../utils/TripType";
import "./styles.css";

class BookedHistory extends React.Component {
  constructor() {
    super();
    this.state = { redirect: false };
    autobind(this);
  }

  componentDidMount() {
    this.props.getUserInfo(
      this.props.userInfo.userName,
      this.props.userInfo.token
    );
    this.props.seeBookHistory(this.props.customerId);
  }

  onSelect(trip) {
    const { tripId, tripDate, _type } = trip;
    this.props.selectBookedTrip(tripId, tripDate, _type);
    this.setState({ redirect: true });
  }

  renderTour(item) {
    return (
      <div key={item.tripId} className="bookedhistory-list">
        <div
          onClick={() => {
            this.onSelect(item);
          }}
        >
          <div className="bookedhistory-table">
            <Flex className="bookedhistory-each">
              <Box p={2} className="bookedhistory-image-container">
                <img
                  className="bookedhistory-tourimage"
                  src={tour}
                  alt={item.tourName}
                />
              </Box>
              <Box
                className="bookedHistory-content"
                p={2}
                width={[6 / 10, 10 / 15]}
              >
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Tour
                  </Box>
                  <Box p={2} className="bookedHistory-value" width={[1 / 1]}>
                    {item.tourName.length > 20
                      ? item.tourName.substring(0, 20)
                      : item.tourName}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Tour ID
                  </Box>
                  <Box p={2} className="bookedHistory-value" width={[1 / 1]}>
                    {item.tourId}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Date
                  </Box>
                  <Box p={2} className="bookedHistory-value" width={[1 / 1]}>
                    {dateToString(item.tripDate)}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Status
                  </Box>
                  <Box p={2} className="bookedHistory-value" width={[1 / 1]}>
                    {toStatus(item._type)}
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/bookedHistoryInfo" />;
    }
    return (
      <div className="bookedhistory-page">
        <div className="bookedhistory-header">
          <i className="fa fa-calendar topbanner-icon" />
          Booked History
        </div>
        <hr className="bookedhistory-line" />
        <div>{this.props.bookedList.map(item => this.renderTour(item))}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookedList: state.bookedHistory.bookedList,
    customerId: state.user.customerId,
    userInfo: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  selectBookedTrip: (tripId, tripDate, _type) =>
    dispatch(selectBookedTrip(tripId, tripDate, _type)),
  getUserInfo: (userName, token) => dispatch(getUserInfo(userName, token)),
  seeBookHistory: customerId => dispatch(seeBookHistory(customerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedHistory);
