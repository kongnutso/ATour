import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Table from '../Table';
import PopUpModal from '../PopUpModal/PopUpModal';
import COLOR from '../../utils/color';
import { Button, SearchButton, Input } from '../BaseComponent';

//Mock Data
const tableProps = num => {
  const dataArray = [];
  for (let i = 0; i <= num; i++) {
    dataArray.push({
      username: `${String.fromCharCode(97 + i)}`,
      phoneNumber: `${i}${i}${i}${i}${i}${i}`,
      email: `${i}@hot.hr`,
      status: true,
    });
  }
  dataArray.push({
    username: `asdsadsads`,
    phoneNumber: `asdasdas`,
    email: `$asdasds@hot.hr`,
    status: false,
  });
  return dataArray;
};

const adminSearchColumns = (handleConfirm, handleReject) => [
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
    Header: 'Status',
    accessor: 'status',
    width: 120,
    Cell: ({ original }) => {
      const { status } = original;
      return <Fragment>{status ? <Text color={COLOR.danger}>Bad</Text> : 'Normal'}</Fragment>;
    },
  },
  {
    Header: 'Action',
    accessor: 'action',
    width: 150,
    Cell: ({ original }) => {
      const { status } = original;
      return (
        <Fragment>
          {status ? (
            <Text color={COLOR.disable_text}>-- No Action --</Text>
          ) : (
            <Button color={COLOR.danger} onClick={() => handleReject()}>
              <i className="fa fa-ban" style={{ marginRight: '5px' }} />
              Mark Bad
            </Button>
          )}
        </Fragment>
      );
    },
  },
];

class AdminSearchPage extends Component {
  state = { username: '', approveModal: false, rejectModal: false };

  handleConfirm = () => {
    this.setState({ approveModal: true });
  };
  handleReject = () => {
    this.setState({ rejectModal: true });
  };
  onSearch = () => {
    console.log(`Search user : ${this.state.username}`);
  };
  render() {
    return (
      <Box>
        <Text fontSize={4} mb={4} mt={2}>
          <i style={{ marginRight: '10px' }} className="fa fa-search" />
          Search Guide
        </Text>

        <Flex alignItems="flex-start" justifyContent="flex-start" mb={[3, 4]} width={1}>
          <Box my={1} width={4 / 5}>
            <Input
              placeholder="Username"
              onChange={e => this.setState({ username: e.target.value })}
              onEnterText={this.onSearch}
            />
          </Box>
          <Box my={1} width={1 / 5}>
            <SearchButton onClick={() => this.onSearch()}>
              <Icon name="search" />
              Search
            </SearchButton>
          </Box>
        </Flex>

        <PopUpModal
          isOpen={this.state.approveModal}
          onCloseModal={() => this.setState({ approveModal: false })}
          modalName="Unmark"
          headerText={`Unmark Guide`}
          bodyText={`Do you want to Unmark ? `}
          // onConfirm
          type="Confirmation"
        />

        <PopUpModal
          isOpen={this.state.rejectModal}
          onCloseModal={() => this.setState({ rejectModal: false })}
          modalName="MarkBad"
          headerText={`Mark Bad Guide`}
          bodyText={`Do you want to Mark Bad? `}
          // onConfirm
          isDanger
          type="Confirmation"
        />
        <Table
          data={tableProps(4)}
          columns={adminSearchColumns(this.handleConfirm, this.handleReject)}
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
)(AdminSearchPage);
