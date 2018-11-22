import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Route } from 'react-router-dom';
import AdminMenuBar from '../AdminMenuBar';
import AdminApprovePaymentPage from '../AdminApprovePaymentPage';
import AdminApproveRefundPage from '../AdminApproveRefundPage';
import AdminSearchPage from '../AdminSearchPage';
import AdminApproveGuidePage from '../AdminApproveGuidePage';

export default props => {
  return (
    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Flex flexWrap="wrap" justifyContent="center">
        <Box width={4 / 5}>
          <AdminMenuBar activeItem={props.match.params.type} />
          <Route exact path="/admin/approvePayment" component={AdminApprovePaymentPage} />
          <Route exact path="/admin/approveRefund" component={AdminApproveRefundPage} />
          <Route exact path="/admin/search" component={AdminSearchPage} />
          <Route exact path="/admin/approveGuide" component={AdminApproveGuidePage} />
        </Box>
      </Flex>
    </div>
  );
};
