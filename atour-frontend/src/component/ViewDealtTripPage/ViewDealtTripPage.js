import React, { Component } from "react";
import { Flex, Box, Text } from "rebass";
import { Menu, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Table from "../Table";
import { SearchButton, Input } from "../BaseComponent";
import { getDealtTrips } from "../../action/DealtTripAction";
import { dateToString } from "../../utils/utils";

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
    width: 200,
    Cell: ({ original }) => {
      const { date } = original;
      return <Text fontWeight="bold">{date}</Text>;
    }
  },
  {
    Header: "Tour Name",
    accessor: "tourName",
    width: 500,
    Cell: ({ original }) => {
      const { tourName } = original;
      return (
        // <Link to={"/" + tourUrl}>
        <Text fontWeight="bold" color="#333">
          {tourName}
        </Text>
        // </Link>
      );
    }
  },
  {
    Header: "Customer Name",
    accessor: "customerName",
    width: 250,
    Cell: ({ original }) => {
      const { customerName, customerPhoneNumber, customerEmail } = original;
      return (
        <Flex flexWrap="wrap">
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <Text fontWeight="bold">{customerName}</Text>
            </Box>
          </Flex>
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <i style={{ marginRight: "10px" }} className="fa fa-phone" />{" "}
              {customerPhoneNumber}
            </Box>
          </Flex>
          <Flex width={1} justifyContent="flex-start">
            <Box ml={[2, 3, 4, 5]}>
              <i style={{ marginRight: "10px" }} className="fa fa-envelope-o" />
              {customerEmail}
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
    searchTerm: { date: "", tourName: "", customerName: "" },
    activeDealtTrips: this.props.guideInfo.dealtTripsDto,
    dealtTrips: this.props.guideInfo.dealtTripsDto
  };

  componentDidMount() {
    this.onSearch();
  }

  mapDealtTripToInfo(dealtTrips) {
    let output = [];
    dealtTrips.map(dealtTrip => {
      const customer = dealtTrip.customer.profile;
      output.push({
        date: dateToString(dealtTrip.tripDate),
        tourName: dealtTrip.tourName,
        customerName: customer.firstName + " " + customer.lastName,
        customerPhoneNumber: customer.phoneNumber,
        customerEmail: dealtTrip.customer.email
      });
    });
    return output;
  }

  onSearch = () => {
    let searchOutput = [];
    let searchTerm = this.state.searchTerm;
    this.state.dealtTrips.map(dealtTrip => {
      let isPass = true;
      if (searchTerm.date !== "") {
        if (!dateToString(dealtTrip.tripDate).includes(searchTerm.date)) {
          isPass = false;
        }
      }
      if (searchTerm.tourName !== "") {
        if (!dealtTrip.tourName.includes(searchTerm.tourName)) {
          isPass = false;
        }
      }
      if (searchTerm.customerName !== "") {
        let customerName =
          dealtTrip.customer.profile.firstName +
          " " +
          dealtTrip.customer.profile.lastName;
        if (!customerName.includes(searchTerm.customerName)) {
          isPass = false;
        }
      }
      if (this.state.activeItem === "current") {
        if (!(new Date(dealtTrip.tripDate) >= new Date())) {
          isPass = false;
        }
      }
      if (this.state.activeItem === "history") {
        if (!(new Date(dealtTrip.tripDate) < new Date())) {
          isPass = false;
        }
      }
      if (isPass) {
        searchOutput.push(dealtTrip);
      }
    });
    this.setState({ activeDealtTrips: searchOutput });
  };

  handleMenuClick = (e, { name }) => {
    this.setState({ activeItem: name }, this.onSearch);
  };

  render() {
    const { activeItem, searchTerm } = this.state;
    console.log("guideInfo", this.props.guideInfo);
    console.log("mapped: ", this.mapDealtTripToInfo(this.state.dealtTrips));
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
                        searchTerm: { ...searchTerm, tourName: e.target.value }
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
                        searchTerm: {
                          ...searchTerm,
                          customerName: e.target.value
                        }
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
                  // data={tableProps(4)}
                  data={this.mapDealtTripToInfo(this.state.activeDealtTrips)}
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
