import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Modal from "react-modal";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
import autobind from "react-autobind";
import * as validation from "../../utils/validation";
import classNames from "classnames";
import { Container, Segment, Grid } from "semantic-ui-react";
import Tours from "../Tours/Tours";
import SearchBar from "../SearchBar";

// const ResponsiveContainer = ({ children }) => (
//   <div>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// );

const tours = [
  {
    tourName: "Tour Name",
    tourImage: "../../image/Atour-logo.jpg",
    tourRating: "3",
    tourPrice: "3000 baht",
    tourLocation: "Bangkok"
  },
  {
    tourName: "Tour Name",
    tourImage: "../../image/TourImage.png",
    tourRating: "3",
    tourPrice: "3000 baht",
    tourLocation: "Bangkok"
  },
  {
    tourName: "Tour Name",
    tourImage: "../../image/TourImage.png",
    tourRating: "3",
    tourPrice: "3000 baht",
    tourLocation: "Bangkok"
  },
  {
    tourName: "Tour Name",
    tourImage: "../../image/TourImage.png",
    tourRating: "3",
    tourPrice: "3000 baht",
    tourLocation: "Bangkok"
  }
];

const GuideHome = props => (
  <Container>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <SearchBar />
          </Grid.Column>
        </Grid.Row>
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
);

export default GuideHome;
