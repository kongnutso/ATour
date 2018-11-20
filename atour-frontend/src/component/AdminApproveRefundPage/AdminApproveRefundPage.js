import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { connect } from 'react-redux';
import Table from '../Table';
import PopUpModal from '../PopUpModal/PopUpModal';
import COLOR from '../../utils/color';
import { Button } from '../BaseComponent';
import AdminMenuBar from '../AdminMenuBar';

// Mock data
const tableProps = num => {
  const dataArray = [];
  for (let i = 0; i <= num; i++) {
    dataArray.push({
      requestDate: `${i}/10/2018`,
      username: `${String.fromCharCode(97 + i)}`,
      phoneNumber: `${i}${i}${i}${i}${i}${i}`,
      email: `${i}@hot.hr`,
      tripDate: `${i}/10/2018`,
      price: `${i}${i}${i}${i}`,
    });
  }
  return dataArray;
};
const adminApproveColumns = (handleConfirm, handleReject) => [
  {
    Header: 'Request Date',
    accessor: 'requestDate',
  },
  {
    Header: 'Username',
    accessor: 'username',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Trip Date',
    accessor: 'tripDate',
  },
  {
    Header: 'Trip Id',
    accessor: 'tripId',
    Cell: ({ original }) => <a href="imagURL">View</a>,
  },
  {
    Header: 'Price',
    accessor: 'price',
    width: 120,
  },
  {
    Header: 'Status',
    accessor: 'status',
    width: 200,
    Cell: ({ original }) => {
      return (
        <Fragment>
          <Button color={COLOR.primary} onClick={() => handleConfirm()}>
            <i className="fa fa-check" style={{ marginRight: '5px' }} />
            Approve
          </Button>
          |
          <Button color={COLOR.danger} onClick={() => handleReject()}>
            <i className="fa fa-times" style={{ marginRight: '5px' }} />
            Reject
          </Button>
        </Fragment>
      );
    },
  },
];

class AdminApproveRefundPage extends Component {
  state = { approveModal: false, rejectModal: false };

  handleConfirm = () => {
    this.setState({ approveModal: true });
  };
  handleReject = () => {
    this.setState({ rejectModal: true });
  };
  render() {
    return (
      <Box>
        <Text fontSize={4} mb={4} mt={2}>
          <i style={{ marginRight: '10px' }} className="fa fa-retweet" />
          Refund Approval
        </Text>

        <PopUpModal
          isOpen={this.state.approveModal}
          onCloseModal={() => this.setState({ approveModal: false })}
          modalName="Approve"
          headerText={`Approve Confirmation`}
          bodyText={`Do you want to Approve ? `}
          // onConfirm
          type="Confirmation"
        />

        <PopUpModal
          isOpen={this.state.rejectModal}
          onCloseModal={() => this.setState({ rejectModal: false })}
          modalName="Reject"
          headerText={`Reject Confirmation`}
          bodyText={`Do you want to Reject ? `}
          // onConfirm
          isDanger
          type="Confirmation"
        />
        <Table
          data={tableProps(4)}
          columns={adminApproveColumns(this.handleConfirm, this.handleReject)}
          defaultPageSize={10}
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItem: 'center',
          }}
        />
      </Box>
    );
  }
}

export default connect(
  null,
  null
)(AdminApproveRefundPage);
