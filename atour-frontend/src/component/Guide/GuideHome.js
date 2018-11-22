import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import "./styles.css";
// import { registerModal } from "../../action/modalAction";
// import autobind from "react-autobind";
import classNames from "classnames";
import { Container, Segment, Grid, Button, Icon } from "semantic-ui-react";
import Tours from "../Tours/Tours";
import SearchBar from "../SearchBar";
import { getGuideInfo } from "../../action/UserInfoAction";
import { publishNewTour } from "../../action/ModalAction";
import PublishNewTourModal from "./PublishNewTourModal/PublishNewTourModal";
import axios from "axios";
import { Flex } from "rebass";
import Cards from "../Cards/Cards";

class GuideHome extends React.Component {
  state = {
    isLoaded: false
  };
  componentDidMount() {
    const self = this;
    this.props.getGuideInfo(this.props.guideInfo.guideId);
    const guideId = this.props.guideInfo.guideId;
    console.log("guide id", guideId);
    // axios.get("http://localhost:3000/guide/" + guideId).then(res => {
    //   console.log(res.data);
    //   self.setState({
    //     data: res.data.publishedTours,
    //     isLoaded: true,
    //     guideId: guideId
    //   });
    // });
  }

  // updateGuideHome() {
  //   const guideId = this.state.isLoaded;
  //   const self = this;
  //   self.setState(
  //     { isLoaded: false },
  //     axios.get("http://localhost:3000/guide/" + guideId).then(res => {
  //       console.log(res.data);
  //       self.setState({ data: res.data.publishedTours, isLoaded: true });
  //     })
  //   );
  // }

  render() {
    // console.log("publishedTours: ", publishedTours);
    if (!this.props.guideInfo.publishedTours) return <div />;
    return (
      <Container>
        <PublishNewTourModal updateGuideHome={this.updateGuideHome} />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid stackable>
            <Grid.Row textAlign="center" columns={2}>
              <Grid.Column textAlign="left" width={14}>
                <h2>Published Tours</h2>
              </Grid.Column>
              <Grid.Column textAlign="center" width={2}>
                <Button animated onClick={this.props.onClickPublishNewTour}>
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
            <hr color="black" size="50" width="1100" />
            {/* <Grid.Row>
              <Grid.Column>
                <Tours tours={this.props.guideInfo.publishedTours} />
                )}
              </Grid.Column> */}
            {/* </Grid.Row> */}
            <Flex>
              <Cards
                items={this.props.guideInfo.publishedTours}
                isGuide={false}
                role="Guide"
              />
            </Flex>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.user.guideInfo);
  return {
    userName: state.user.userName,
    guideInfo: state.user.guideInfo,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => ({
  getGuideInfo: guideId => dispatch(getGuideInfo(guideId)),
  onClickPublishNewTour: () => dispatch(publishNewTour(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideHome);
