import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Route } from 'react-router-dom';
import AdminMenuBar from '../AdminMenuBar';
import AdminApprovePage from '../AdminApprovePage';
import AdminApproveRefundPage from '../AdminApproveRefundPage';
import AdminSearchPage from '../AdminSearchPage';

export default props => {
  return (
    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Flex flexWrap="wrap" justifyContent="center">
        <Box width={4 / 5}>
          <AdminMenuBar />
          <Route exact path="/admin/approvePayment" component={AdminApprovePage} />
          <Route exact path="/admin/approveRefund" component={AdminApproveRefundPage} />
          <Route exact path="/admin/search" component={AdminSearchPage} />
        </Box>
      </Flex>
    </div>
  );
};
