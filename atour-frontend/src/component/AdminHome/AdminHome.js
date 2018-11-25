import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AdminMenuBar from '../AdminMenuBar';
import AdminApprovePaymentPage from '../AdminApprovePaymentPage';
import AdminApproveRefundPage from '../AdminApproveRefundPage';
import AdminSearchPage from '../AdminSearchPage';
import AdminApproveGuidePage from '../AdminApproveGuidePage';

class AdminHome extends Component {
  render() {
    const { isLoginSuccess, userInfo } = this.props;
    if (isLoginSuccess && userInfo.role === 'Admin')
      return (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <Flex flexWrap="wrap" justifyContent="center">
            <Box width={4 / 5}>
              <AdminMenuBar activeItem={this.props.match.params.type} />
              <Route exact path="/minda/approvePayment" component={AdminApprovePaymentPage} />
              <Route exact path="/minda/approveRefund" component={AdminApproveRefundPage} />
              <Route exact path="/minda/search" component={AdminSearchPage} />
              <Route exact path="/minda/approveGuide" component={AdminApproveGuidePage} />
            </Box>
          </Flex>
        </div>
      );

    return <Redirect to="/minda" />;
  }
}
const mapStateToProps = state => {
  return {
    isLoginSuccess: state.user.isLoginSuccess,
    userInfo: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(AdminHome);
