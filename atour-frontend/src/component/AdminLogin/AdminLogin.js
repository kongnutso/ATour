import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex, Box, Text } from 'rebass';
import { Redirect } from 'react-router-dom';
import { Input, SearchButton as Button } from '../BaseComponent';
import { login } from '../../action/ApplicationAction';
class AdminLogin extends Component {
  state = { username: '', password: '', login: false };

  handleItemClick = () => {
    const { username, password } = this.state;
    this.props.login(username, password, 'Admin');
    this.setState({ login: true });
  };

  render() {
    if (this.state.login) return <Redirect to="/minda/approvePayment" />;
    return (
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        style={{
          height: '100vh',
          marginTop: '-60px',
          backgroundColor: '#1fc8db',
          backgroundImage: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
        }}
        alignItems="center"
      >
        <Flex
          width={[4 / 5, 3 / 5, 2 / 5]}
          p={4}
          flexWrap="wrap"
          style={{ height: '350px', backgroundColor: '#fff' }}
          alignItems="center"
        >
          <Box width={1} my={2}>
            <Text fontSize={4}>
              <i style={{ marginRight: '10px' }} className="fa fa-address-card-o" />
              Welcome to Admin Page
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
          <Box mb={3} />
        </Flex>
      </Flex>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.user.isLoginSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  login: (userName, password, role) => dispatch(login(userName, password, role)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);
