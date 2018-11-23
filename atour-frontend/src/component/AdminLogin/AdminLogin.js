import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Redirect } from 'react-router-dom';
import { Input, SearchButton as Button } from '../BaseComponent';

export default class AdminLogin extends Component {
  componentDidMount() {
    // this.setState({ activeItem: mapPathName[activeItem] });
  }

  state = { username: '', password: '', login: false };

  handleItemClick = () => {
    const { username, password } = this.state;
    console.log(username, password);
    if (username === 'ching' && password === 'ching') {
      this.setState({ login: true });
    }
  };

  render() {
    if (this.state.login) return <Redirect to="/admin/approvePayment" />;
    return (
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        style={{ height: '100vh', marginTop: '-50px' }}
        alignItems="center"
      >
        <Flex width={2 / 5} flexWrap="wrap" style={{ height: '350px' }}>
          <Box width={1} my={3}>
            <Text fontSize={4}>
              <i style={{ marginRight: '10px' }} className="fa fa-address-card-o" />
              Welcome to Admin Page{' '}
            </Text>
          </Box>
          <Text mt={3}> Username</Text>
          <Input
            onChange={e => this.setState({ username: e.target.value })}
            onEnterText={this.handleItemClick}
          />
          <Text mt={3}> Password</Text>
          <Input
            onChange={e => this.setState({ password: e.target.value })}
            onEnterText={this.handleItemClick}
          />
          <Box mt={3} width={1} />
          <Button onClick={this.handleItemClick}>Log in</Button>
        </Flex>
      </Flex>
    );
  }
}
