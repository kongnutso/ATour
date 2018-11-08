import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import autobind from 'react-autobind';
import { Table } from 'semantic-ui-react';
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
          <Table className="bookedhistory-table">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={5} textAlign="center">
                  <img
                    className="bookedhistory-tourimage"
                    src={tour}
                    alt={item.tourName}
                  />
                </Table.Cell>
                <Table.Cell width={2}>
                  Tour<br />Tour ID<br />Date<br />Guide<br />Status
                </Table.Cell>
                <Table.Cell width={9}>
                  {item.tourName}
                  <br />
                  {item.tourId}
                  <br />
                  {item.tourDate}
                  <br />
                  {item.guide}
                  <br />
                  {item.status}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="bookedhistory-page">
        <div className="bookedhistory-header">
          <i className="fa fa-calendar topbanner-icon" />book history
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
