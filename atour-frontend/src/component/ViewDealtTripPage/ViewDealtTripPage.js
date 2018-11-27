import React, { Component } from "react";
import { Flex, Box, Text } from "rebass";
import { Menu, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Table from "../Table";
import { SearchButton, Input } from "../BaseComponent";
import { getDealtTrips } from "../../action/DealtTripAction";

// Mock data
const tableProps = num => {
  const dataArray = [];
  for (let i = 0; i <= num; i++) {
    dataArray.push({
      date: `${i}/10/2018`,
      deal: `${String.fromCharCode(97 + i)}asdasdsadsada`,
      tourUrl: "2ewds2wds",
      username: `${String.fromCharCode(97 + i)}`,
      phoneNumber: `${i}${i}${i}${i}${i}${i}`,
      email: `${i}@hot.hr`
    });
  }
  return dataArray;
};
const viewDealTripColumns = () => [
  {
    Header: "Date",
    accessor: "date",
    width: 250,
    Cell: ({ original }) => {
      const { date } = original;
      return <Text fontWeight="bold">{date}</Text>;
    }
  },
  {
    Header: "Deal Name",
    accessor: "deal",
    width: 250,
    Cell: ({ original }) => {
      const { deal, tourUrl } = original;
      return (
        <Link to={"/" + tourUrl}>
          <Text fontWeight="bold" color="#333">
            {deal}
          </Text>
        </Link>
      );
    }
  },
  {
    Header: "Customer Name",
    accessor: "username",
    width: 400,
    Cell: ({ original }) => {
      const { username, phoneNumber, email } = original;
      return (
        <Flex flexWrap="wrap">
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <Text fontWeight="bold">{username}</Text>
            </Box>
          </Flex>
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <i style={{ marginRight: "10px" }} className="fa fa-phone" />{" "}
              {phoneNumber}
            </Box>
          </Flex>
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <i style={{ marginRight: "10px" }} className="fa fa-envelope-o" />
              {email}
            </Box>
          </Flex>
        </Flex>
      );
    }
  }
];

class ViewDealtTripPage extends Component {
  state = {
    activeItem: "current",
    searchTerm: { date: "", deal: "", username: "" },
    activeDealtTrips: []
  };

  onSearch = () => {
    console.log(`Search :`, this.state.searchTerm);
    let searchOutput = [];
    let searchTerm = this.state.searchTerm;
    this.props.dealtTrips.map(dealtTrip => {
      let isPass = true;
      if (searchTerm.date !== "") {
        isPass = new Date(dealtTrip.tripDate) === new Date(searchTerm.date);
      }
      if (searchTerm.deal !== "") {
        isPass = dealtTrip.tourName === searchTerm.deal;
      }
      if (searchTerm.username !== "") {
        isPass = dealtTrip.bookInfo.customerId === searchTerm.username;
      }
      if (this.state.activeItem === "current") {
        isPass = new Date(dealtTrip.tripDate) >= new Date();
      }
      if (this.state.activeItem === "history") {
        isPass = new Date(dealtTrip.tripDate) < new Date();
      }
      if (isPass) {
        searchOutput.push(dealtTrip);
      }
    });
    return searchOutput;
  };

  handleMenuClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    console.log("Dealt Trips: ", this.props.dealtTrips);
    const { activeItem, searchTerm } = this.state;
    return (
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Flex flexWrap="wrap" justifyContent="center">
          <Box width={4 / 5}>
            <Text fontSize={4} mb={1} mt={3}>
              <i style={{ marginRight: "10px" }} className="fa fa-th-list" />
              View Dealt Trips
            </Text>
            <hr style={{ border: "1px solid" }} />
            <Menu tabular attached="top">
              <Menu.Item
                name="current"
                active={activeItem === "current"}
                onClick={this.handleMenuClick}
              />
              <Menu.Item
                name="history"
                active={activeItem === "history"}
                onClick={this.handleMenuClick}
              />
            </Menu>
            <Segment attached="bottom">
              <Text fontSize={3} mb={1} mt={2}>
                <i style={{ marginRight: "10px" }} className="fa fa-search" />
                Search
              </Text>

              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={[3, 4]}
                width={1}
              >
                <Box my={1} width={1 / 3} pr={1}>
                  <Input
                    placeholder="Date"
                    onChange={e =>
                      this.setState({
                        searchTerm: { ...searchTerm, date: e.target.value }
                      })
                    }
                    onEnterText={this.onSearch}
                  />
                </Box>
                <Box my={1} width={1 / 3} pr={1}>
                  <Input
                    placeholder="Deal Name"
                    onChange={e =>
                      this.setState({
                        searchTerm: { ...searchTerm, deal: e.target.value }
                      })
                    }
                    onEnterText={this.onSearch}
                  />
                </Box>
                <Box my={1} width={1 / 3} pr={1}>
                  <Input
                    placeholder="Customer Name"
                    onChange={e =>
                      this.setState({
                        searchTerm: { ...searchTerm, username: e.target.value }
                      })
                    }
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
              <Box width={1}>
                <Table
                  data={tableProps(4)}
                  columns={viewDealTripColumns()}
                  defaultPageSize={10}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItem: "center"
                  }}
                />
              </Box>
            </Segment>
          </Box>
        </Flex>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guideInfo: state.user.guideInfo,
    dealtTrips: state.user.guideInfo.dealtTrips
  };
};

export default connect(
  mapStateToProps,
  null
)(ViewDealtTripPage);
