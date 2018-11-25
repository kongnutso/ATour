import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import Modal from "react-modal";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
import { Flex, Box, Text } from "rebass";
import styled from "styled-components";
import autobind from "react-autobind";
import * as validation from "../utils/validation";
import classNames from "classnames";
import { Container, Segment, Grid } from "semantic-ui-react";
import Cards from "./Cards/Cards";
import SearchBar from "./SearchBar";
import { mockTour } from "./mock";
import homeImage from "../image/home-background.jpg";
import { onSearch } from "../action/SearchAction";

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

class App extends React.Component {
  componentDidMount() {
    this.props.getAllTour();
  }
  render() {
    if (this.props.role === "Guide") {
      return <Redirect to="/guideHome" />;
    }
    return (
      <div>
        <StyledApp style={{ backgroundImage: `url(${homeImage})` }}>
          <Flexh100
            width={1}
            pt={7}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <SearchBar />
            <Flex
              width={1}
              textAlign="center"
              flexDirection="column"
              alignItems="center"
              color="white"
            >
              <Text fontSize={3}>Find out more</Text>
              <Text fontSize={5}>
                <i className="fa fa-angle-double-down" />
              </Text>
            </Flex>
          </Flexh100>
        </StyledApp>
        <Container>
          <Segment style={{ padding: "8em 0em" }} vertical>
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
  role: state.user.role
});
const mapDispatchToProps = dispatch => ({
  getAllTour: () => dispatch(onSearch("", true))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
