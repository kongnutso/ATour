import React, { Component, Fragment } from "react";
import { Box, Text } from "rebass";
import { connect } from "react-redux";
import axios from "axios";
import Table from "../Table";
import PopUpModal from "../PopUpModal/PopUpModal";
import COLOR from "../../utils/color";
import { Button } from "../BaseComponent";
import { API_ENDPOINT } from "../../utils/utils";

const adminApproveColumns = (handleApprove, handleReject) => [
  {
    Header: "Username",
    accessor: "username"
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Action",
    accessor: "action",
    width: 200,
    Cell: ({ original }) => {
      const { guideId } = original;
      return (
        <Fragment>
          <Button color={COLOR.primary} onClick={() => handleApprove(guideId)}>
            <i className="fa fa-check" style={{ marginRight: "5px" }} />
            Approve
          </Button>
          |
          <Button color={COLOR.danger} onClick={() => handleReject(guideId)}>
            <i className="fa fa-times" style={{ marginRight: "5px" }} />
            Reject
          </Button>
        </Fragment>
      );
    }
  }
];

class AdminApproveGuidePage extends Component {
  state = {
    approveModal: false,
    rejectModal: false,
    data: [],
    selectedGuideId: ""
  };

  componentDidMount() {
    this.onQuery();
  }

  handleApprove = guideId => {
    this.setState({ approveModal: true });
    this.setState({ selectedGuideId: guideId });
  };

  handleReject = guideId => {
    this.setState({ rejectModal: true });
    this.setState({ selectedGuideId: guideId });
  };

  onApprove = () => {
    axios
      .post("http://" + API_ENDPOINT + "/admin/approveGuide", {
        guideId: this.state.selectedGuideId
      })
      .then(res => {
        this.onQuery();
      });
  };

  onReject = () => {
    axios
      .post("http://" + API_ENDPOINT + "/admin/rejectGuide", {
        guideId: this.state.selectedGuideId
      })
      .then(res => {
        this.onQuery();
      });
  };

  onQuery = () => {
    axios
      .post("http://" + API_ENDPOINT + "/customer/searchGuide", { keyword: "" })
      .then(res => {
        this.setState({ data: this.mapInput(res.data) });
      });
  };
  mapInput = arr => {
    const filterUnapprove = arr.filter(e => e._type === 0);
    return filterUnapprove.map(e => {
      return {
        guideId: e.guideId,
        username: e.userName,
        phoneNumber: e.profile.phoneNumber,
        email: e.email
      };
    });
  };
  render() {
    const { data } = this.state;
    return (
      <Box>
        <Text fontSize={4} mb={4} mt={2}>
          <i style={{ marginRight: "10px" }} className="fa fa-users" />
          Guide Approval
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
          data={data}
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
)(AdminApproveGuidePage);
