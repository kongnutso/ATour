import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Flex, Text } from 'rebass';
import styled from 'styled-components';
import { Container, Segment, Grid } from 'semantic-ui-react';
import { AnimateIcon } from '../component/BaseComponent';
import Cards from './Cards/Cards';
import SearchBar from './SearchBar';
import homeImage from '../image/home-background.jpg';
import { onSearch } from '../action/SearchAction';
import { Link as LinkS } from 'react-scroll';

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

class App extends React.Component {
  componentDidMount() {
    this.props.getAllTour();
  }
  render() {
    if (this.props.role === 'Guide') {
      return <Redirect to="/guideHome" />;
    }
    return (
      <div>
        <StyledApp style={{ backgroundImage: `url(${homeImage})` }}>
          <Flexh100 width={1} pt={7} alignItems="center" justifyContent="center" flexWrap="wrap">
            <SearchBar />
            <Flex
              width={1}
              textAlign="center"
              flexDirection="column"
              alignItems="center"
              color="white"
            >
              <LinkScroll to="tourList" smooth duration={800}>
                <Text fontSize={6} textAlign="center">
                  <AnimateIcon className="fa fa-angle-double-down fa-float" />
                </Text>
              </LinkScroll>
            </Flex>
          </Flexh100>
        </StyledApp>
        <Container>
          <Segment id="tourList" style={{ padding: '5em 0em' }} vertical>
            <Grid verticalAlign="middle">
              <Grid.Row textAlign="center">
                <h2>Tour Available</h2>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Cards items={this.props.tours} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tours: state.tour.tourList,
  role: state.user.role,
});
const mapDispatchToProps = dispatch => ({
  getAllTour: () => dispatch(onSearch('', true)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
