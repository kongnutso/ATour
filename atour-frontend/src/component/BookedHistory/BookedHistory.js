import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import autobind from 'react-autobind';
import { Table } from 'semantic-ui-react';
import { Flex, Box } from 'rebass';
import { Link } from 'react-router-dom';
import tour from '../../image/Tour.jpg';
import './styles.css';

class BookedHistory extends React.Component {
  constructor() {
    super();
    autobind(this, 'renderTour');
  }

  renderTour(item) {
    return (
      <div key={item.tourId} className="bookedhistiry-list">
        <Link to="/bookedHistoryInfo">
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
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="bookedhistory-page">
        <div className="bookedhistory-header">
          <i className="fa fa-calendar topbanner-icon" />Booked History
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

export default connect(mapStateToProps, null)(BookedHistory);
