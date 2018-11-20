import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
// import autobind from "react-autobind";
import classNames from "classnames";
import { Container, Segment, Grid, RevealContent } from "semantic-ui-react";
import Tours from "../Tours/Tours";
import SearchBar from "../SearchBar";
import axios from "axios";

const GuideHome = props => {
  return (
    <Container>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid stackable>
          <Grid.Row textAlign="center">
            <Grid.Column textAlign="left">
              <h2>Published Tours</h2>
            </Grid.Column>
          </Grid.Row>
          <hr color="black" size="50" width="1100" />
          <Grid.Row>
            <Grid.Column>
              <Tours tours={props.publishedTours} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    publishedTours: state.user.guideInfo.publishedTours
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideHome);
