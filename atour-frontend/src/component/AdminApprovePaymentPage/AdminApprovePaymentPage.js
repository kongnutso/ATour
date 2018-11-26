import React, { Component, Fragment } from "react";
import { Box, Text } from "rebass";
import axios from "axios";
import { connect } from "react-redux";
import Table from "../Table";
import PopUpModal from "../PopUpModal/PopUpModal";
import COLOR from "../../utils/color";
import { Button } from "../BaseComponent";
import parseDate from "../../utils/parseDateTime";
import { API_ENDPOINT } from "../../utils/utils";

const adminApproveColumns = (handleApprove, handleReject) => [
  {
    Header: "Book Date",
    accessor: "bookDate"
  },
  {
    Header: "Trip Id",
    accessor: "tripId"
  },
  {
    Header: "Trip Date",
    accessor: "tripDate"
  },
  {
    Header: "Customer Id",
    accessor: "customerId"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Paid Date",
    accessor: "paidDate"
  },
  {
    Header: "Slip",
    accessor: "slip",
    width: 100,
    Cell: ({ original }) => {
      return (
        <a href={original.slip} target="_blank" rel="noopener noreferrer">
          View
        </a>
      );
    }
  },
  {
    Header: "Status",
    accessor: "status",
    width: 200,
    Cell: ({ original }) => {
      const { tourId, tripId, customerId } = original;
      return (
        <Fragment>
          <Button
            color={COLOR.primary}
            onClick={() => handleApprove({ tourId, tripId, customerId })}
          >
            <i className="fa fa-check" style={{ marginRight: "5px" }} />
            Approve
          </Button>
          |
          <Button
            color={COLOR.danger}
            onClick={() => handleReject({ tourId, tripId, customerId })}
          >
            <i className="fa fa-times" style={{ marginRight: "5px" }} />
            Reject
          </Button>
        </Fragment>
      );
    }
  }
];

class AdminApprovePaymentPage extends Component {
  state = {
    approveModal: false,
    rejectModal: false,
    data: [],
    selectedRequest: {}
  };

  componentDidMount() {
    this.onQuery();
  }

  handleApprove = req => {
    this.setState({ approveModal: true });
    this.setState({ selectedRequest: req });
  };

  handleReject = req => {
    this.setState({ rejectModal: true });
    this.setState({ selectedRequest: req });
  };

  onApprove = () => {
    axios
      .post(
        "http://" + API_ENDPOINT + "/admin/approvePayment",
        this.state.selectedRequest
      )
      .then(res => {
        this.onQuery();
      });
  };

  onReject = () => {
    axios
      .post(
        "http://" + API_ENDPOINT + "/admin/rejectPayment",
        this.state.selectedRequest
      )
      .then(res => {
        this.onQuery();
      });
  };

  onQuery = () => {
    axios.get("http://" + API_ENDPOINT + "/admin/pendingPayments").then(res => {
      this.setState({ data: this.mapInput(res.data) });
    });
  };
  mapInput = arr => {
    return arr.map(e => {
      return {
        bookDate: parseDate(e.bookInfo.bookDate),
        customerId: e.bookInfo.customerId,
        price: e.bookInfo.price,
        paidDate: parseDate(e.paidDate),
        slip: e.slipImages[0].url,
        tripId: e.tripId,
        tripDate: parseDate(e.tripDate),
        tourId: e.tourId
      };
    });
  };
  render() {
    return (
      <Box>
        <Text fontSize={4} mb={4} mt={2}>
          <i style={{ marginRight: "10px" }} className="fa fa-check-square-o" />
          Payment Approval
        </Text>

        <PopUpModal
          isOpen={this.state.approveModal}
          onCloseModal={() => this.setState({ approveModal: false })}
          modalName="Approve"
          headerText={`Approve Confirmation`}
          bodyText={`Do you want to Approve ? `}
          onConfirm={this.onApprove}
          type="Confirmation"
        />

        <PopUpModal
          isOpen={this.state.rejectModal}
          onCloseModal={() => this.setState({ rejectModal: false })}
          modalName="Reject"
          headerText={`Reject Confirmation`}
          bodyText={`Do you want to Reject ? `}
          onConfirm={this.onReject}
          isDanger
          type="Confirmation"
        />
        <Table
          data={this.state.data}
          columns={adminApproveColumns(this.handleApprove, this.handleReject)}
          defaultPageSize={10}
          style={{
            textAlign: "center",
            display: "flex",
            alignItem: "center"
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
