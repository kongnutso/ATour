import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import autobind from "react-autobind";
import classNames from "classnames";
import { Container, Segment, Grid } from "semantic-ui-react";
import Tours from "../Tours/Tours";
import PublishNewTourModal from "./PublishNewTourModal/PublishNewTourModal";
import { publishNewTour } from "../../action/ModalAction";

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

class GuideViewPublishedTour extends React.Component {
  renderPublishNewTour() {
    return (
      <div className="topbanner-user-container">
        <PublishNewTourModal />
      </div>
    );
  }

  render() {
    return (
      <Container>
        {this.renderPublishNewTour()}
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid verticalAlign="middle">
            <Grid.Row columns={12}>
              <Grid.Column width={1} />
              <Grid.Column width={4} textAlign="left">
                <h2>View Published Tours</h2>
              </Grid.Column>
              <Grid.Column width={6} />
              <Grid.Column width={1} />
              <div onClick={this.props.onClickPublishNewTour}>
                <i className="fa fa-plus-circle" />
              </div>
            </Grid.Row>
            <hr color="black" size="50" width="1000" />
            <Grid.Row>
              <Tours tours={tours} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return;
};

const mapDispatchToProps = dispatch => ({
  onClickPublishNewTour: () => dispatch(publishNewTour(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideViewPublishedTour);
