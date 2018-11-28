import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import EditTourModal from "../EditTourModal/EditTourModal";
import { editTour } from "../../../action/ModalAction";
import EditAvailableDate from "../EditAvailableDate/EditAvailableDate";
import {
  Grid,
  Container,
  Segment,
  Icon,
  Button,
  Image
} from "semantic-ui-react";
import autobind from "react-autobind";

class GuideTourInfo extends React.Component {
  constructor(props) {
    super(props);
    const { tour } = props.location.state;
    this.state = {
      tour: tour,
      tourName: tour.tourName,
      price: tour.price,
      tourLocation: tour.tourLocation,
      detail: tour.detail,
      minimumSize: tour.minimumSize,
      maximumSize: tour.maximumSize,
      reviews: tour.reviews,
      trips: tour.trips,
      imageUrl: tour.imageUrl
    };
    autobind(this, "updateStates");
  }
  updateStates(price, detail, minimumSize, maximumSize, imageUrl) {
    this.setState({
      price: price,
      detail: detail,
      minimumSize: minimumSize,
      maximumSize: maximumSize,
      imageUrl: imageUrl
    });
  }

  render() {
    return (
      <Container>
        <div className="topbanner-user-container">
          <EditTourModal
            tour={this.state.tour}
            updateStates={this.updateStates}
          />
        </div>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid columns={2} stackable>
            <Grid.Column width={12} textAlign="left">
              <div class="tour-info-header">
                <p>{this.state.tourName}</p>
                <p className="tour-location">{this.state.tourLocation}</p>
              </div>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <Button icon onClick={this.props.onClickEditTour}>
                Edit Tour
                <Icon name="edit" />
              </Button>
            </Grid.Column>
          </Grid>

          <hr color="black" size="50" width="1000" />
          <div>
            <Grid columns={2} stackable>
              <Grid.Column />
              <Grid.Column width={10} textAlign="left">
                {this.state.imageUrl == null ? (
                  <Image
                    src={require("../../../image/TourImage.png")}
                    size="medium"
                  />
                ) : (
                  <Image src={this.state.imageUrl} size="medium" />
                )}
                <h2>Details</h2>
                <p>{this.state.detail}</p>
                <h2>Price</h2>
                <p>{this.state.price}</p>
                <h2>Group size</h2>
                <p>
                  from {this.state.minimumSize} to {this.state.maximumSize}
                </p>
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                <EditAvailableDate tour={this.state.tour} />
              </Grid.Column>
            </Grid>
          </div>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { isOpen: state.modal.modalName };
};

const mapDispatchToProps = dispatch => ({
  onClickEditTour: () => {
    dispatch(editTour(true));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideTourInfo);
