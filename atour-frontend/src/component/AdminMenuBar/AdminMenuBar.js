import React, { Component } from 'react';
import { Box } from 'rebass';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const mapPathName = {
  approvePayment: 'paymentApproval',
  approveRefund: 'refundApproval',
  approveGuide: 'guideApproval',
  search: 'searchGuide',
};

export default class MenuExampleSecondaryPointing extends Component {
  componentDidMount() {
    const { activeItem } = this.props;
    this.setState({ activeItem: mapPathName[activeItem] });
  }

  state = { activeItem: 'paymentApproval' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Box mb={4}>
        <Menu pointing secondary color="blue" size="huge">
          <Menu.Item
            as={Link}
            to="/minda/approvePayment"
            name="paymentApproval"
            active={activeItem === 'paymentApproval'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/minda/approveRefund"
            name="refundApproval"
            active={activeItem === 'refundApproval'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/minda/approveGuide"
            name="guideApproval"
            active={activeItem === 'guideApproval'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/minda/search"
            name="searchGuide"
            active={activeItem === 'searchGuide'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Box>
    );
  }
}
