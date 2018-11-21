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
import { getGuideInfo } from "../../action/UserInfoAction";
import axios from "axios";

class GuideHome extends React.Component {
  state = {
    isLoad: false
  };
  componentDidMount() {
    const self = this;
    this.props.getGuideInfo(this.props.guideInfo.guideId);
    axios
      .get("http://localhost:3000/guide/" + this.props.guideInfo.guideId)
      .then(res => {
        console.log(res.data);
        self.setState({ data: res.data.publishedTours });
      });
  }

  render() {
    // console.log("publishedTours: ", publishedTours);
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
                {this.state && this.state.data && (
                  <Tours tours={this.state.data} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.user.userName,
    guideInfo: state.user.guideInfo,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => ({
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideHome);
