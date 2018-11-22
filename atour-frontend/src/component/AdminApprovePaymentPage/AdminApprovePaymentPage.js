import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { connect } from 'react-redux';
import Table from '../Table';
import PopUpModal from '../PopUpModal/PopUpModal';
import COLOR from '../../utils/color';
import { Button } from '../BaseComponent';
import axios from 'axios';

// Mock data
const tableProps = num => {
  const dataArray = [];
  for (let i = 0; i <= num; i++) {
    dataArray.push({
      date: `${i}/10/2018`,
      username: `${String.fromCharCode(97 + i)}`,
      phoneNumber: `${i}${i}${i}${i}${i}${i}`,
      email: `${i}@hot.hr`,
    });
  }
  return dataArray;
};
const adminApproveColumns = (handleConfirm, handleReject) => [
  {
    Header: 'Date',
    accessor: 'date',
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
    Header: 'Slip',
    accessor: 'slip',
    width: 100,
    Cell: ({ original }) => <a href="imagURL">View</a>,
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

class AdminApprovePaymentPage extends Component {
  componentDidMount() {
    // const req = {
    //   tourName: tourName,
    //   tourId: tourId,
    //   tripId: tripInfo.tripId,
    //   tripDate: tripInfo.tripDate,
    //   customerId,
    //   size,
    //   price,
    //   guideName,
    // };

    // axios.post('http://localhost:3000/customer/bookTrip', req).then(res => {
    //   console.log(res);
    // });

    axios.get('http://localhost:3000/admin/pendingPayments').then(res => {
      console.log(res);
    });
  }

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
          <i style={{ marginRight: '10px' }} className="fa fa-check-square-o" />
          Payment Approval
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
)(AdminApprovePaymentPage);
