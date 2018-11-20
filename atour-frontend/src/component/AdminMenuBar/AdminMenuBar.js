import React, { Component } from 'react';
import { Box } from 'rebass';
import { Menu } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'approvePayment' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Box mb={4}>
        <Menu pointing secondary color="blue" size="huge">
          <Menu.Item
            as={Link}
            to="/admin/approvePayment"
            name="paymentApproval"
            active={activeItem === 'paymentApproval'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/admin/approveRefund"
            name="refundApproval"
            active={activeItem === 'refundApproval'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/admin/search"
            name="searchGuide"
            active={activeItem === 'searchGuide'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Box>
    );
  }
}
