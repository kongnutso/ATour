import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';
import Table from '../Table';
import { connect } from 'react-redux';

const tableProps = num => {
  const dataArray = [];
  for (let i = 0; i <= num; i++) {
    dataArray.push({
      date: `${i}/10/2018`,
      username: `${String.fromCharCode(97 + i)}`,
      phoneNumber: `${i}${i}${i}${i}${i}${i}`,
      email: `${i}@hot.hr`,
      slip: <a href="imagURL">View</a>,
      status: `Approve | Reject`,
    });
  }
  return dataArray;
};

class AdminPage extends Component {
  render() {
    return (
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Flex flexWrap="wrap" justifyContent="center">
          <Box width={4 / 5}>
            <Text fontSize={4} mb={4} mt={2}>
              <i style={{ marginRight: '10px' }} className="fa fa-check-square-o" />
              Payment Approval
            </Text>
          </Box>
          <Box width={4 / 5}>
            <Table
              data={tableProps(4)}
              columns={[
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
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                },
              ]}
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItem: 'center',
              }}
              defaultPageSize={10}
            />
          </Box>
        </Flex>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(AdminPage);
