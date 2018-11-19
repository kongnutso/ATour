import React from 'react';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { Flex, Box } from 'rebass';
import { Redirect } from 'react-router-dom';
import tour from '../../image/Tour.jpg';
import { selectBookedTrip } from '../../action/BookAction';
import './styles.css';

class BookedHistory extends React.Component {
  constructor() {
    super();
    this.state = { redirect: false };
    autobind(this);
  }

  onSelect(tour) {
    this.props.selectBookedTrip(tour);
    this.setState({ redirect: true });
  }

  renderTour(item) {
    console.log(item);
    return (
      <div key={item.tourId} className="bookedhistory-list">
        <div
          onClick={() => {
            this.onSelect(item);
          }}
        >
          <div className="bookedhistory-table">
            <Flex>
              <Box p={2} width={[4 / 10, 5 / 15]}>
                <img
                  className="bookedhistory-tourimage"
                  src={tour}
                  alt={item.tourName}
                />
              </Box>
              <Box p={2} width={[6 / 10, 10 / 15]}>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Tour
                  </Box>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    {item.tourName}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Tour ID
                  </Box>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    {item.tourId}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Date
                  </Box>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    {item.tourDate}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Guide
                  </Box>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    {item.guide}
                  </Box>
                </Flex>
                <Flex>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    Status
                  </Box>
                  <Box p={2} width={[3 / 6, 3 / 10]}>
                    {item.status}
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
    bookedList: state.bookedHistory.bookedList
  };
};

const mapDispatchToProps = dispatch => ({
  selectBookedTrip: tour => dispatch(selectBookedTrip(tour))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookedHistory);
