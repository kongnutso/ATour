import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Modal from "react-modal";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import autobind from 'react-autobind';
import * as validation from '../utils/validation';
import classNames from 'classnames';
import { Container, Segment, Grid } from 'semantic-ui-react';
import Tours from './Tours/Tours';
import SearchBar from './SearchBar';
import { mockTour } from './mock';
import homeImage from '../image/home-background.jpg';

// const ResponsiveContainer = ({ children }) => (
//   <div>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// );

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
    tourLocation: 'Bangkok'
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok'
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok'
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok'
  }
];

const App = props => (
  <div>
    <StyledApp style={{ backgroundImage: `url(${homeImage})` }}>
      <Flexh100 width={1} alignItems="center" justifyContent="center">
        <Box width={1}>
          <SearchBar />
        </Box>
      </Flexh100>
    </StyledApp>
    <Container>
      <Segment style={{ padding: '8em 0em' }} vertical>
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
