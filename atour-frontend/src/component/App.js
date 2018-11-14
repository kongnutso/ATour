import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Modal from "react-modal";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
import { Flex, Box, Text } from 'rebass';
import styled from 'styled-components';
import autobind from 'react-autobind';
import * as validation from '../utils/validation';
import classNames from 'classnames';
import { Container, Segment, Grid } from 'semantic-ui-react';
import Tours from './Tours/Tours';
import SearchBar from './SearchBar';
import { mockTour } from './mock';
import homeImage from '../image/home-background.jpg';
import { Link as LinkS } from 'react-scroll';

// const ResponsiveContainer = ({ children }) => (
//   <div>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// );

const AnimateIcon = styled.i`
  animation: float 1s linear infinite;
`;

const LinkScroll = styled(LinkS)`
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  padding: 5px;
  &:visited,
  :active {
    color: inherit;
  }
  &:hover {
    color: #aaa;
  }
`;

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: noRepeat;
  margin-top: -50px;
`;

const Flexh100 = styled(Flex)`
  height: 100%;
`;

const tours = [
  {
    tourName: 'Tour Name',
    tourImage: '../../image/Atour-logo.jpg',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
];

const App = props => (
  <div>
    <StyledApp style={{ backgroundImage: `url(${homeImage})` }}>
      <Flexh100 width={1} pt={7} alignItems="center" justifyContent="center" flexWrap="wrap">
        <SearchBar />
        <Flex width={1} textAlign="center" flexDirection="column" alignItems="center" color="white">
          <LinkScroll to="tourList" smooth duration={800}>
            <Text fontSize={5} textAlign="center">
              <AnimateIcon className="fa fa-angle-double-down fa-float" />
            </Text>
          </LinkScroll>
        </Flex>
      </Flexh100>
    </StyledApp>
    <Container>
      <Segment id="tourList" style={{ padding: '8em 0em' }} vertical>
        <Grid verticalAlign="middle">
          <Grid.Row textAlign="center">
            <h2>Tour Available</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Tours tours={tours} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  </div>
);

export default App;
