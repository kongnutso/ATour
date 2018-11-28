import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { selectTour, selectGuide } from "../../action/SelectAction";
import TourItem from "../Tours/TourItem/TourItem";
import "./styles.css";

class CardItem extends React.Component {
  selectTour() {
    this.props.selectTour(this.props.item);
  }
  render() {
    if (!this.props.isGuide) {
      return (
        <TourItem
          tour={this.props.item}
          item={this.props.item}
          theRole={this.props.role}
        />
      );
    } else {
      const {
        item: {
          userName,
          profile: { firstName, lastName, gender, profileImageUrl },
          _type
        },
        item
      } = this.props;
      return (
        <Link to="/guideInfo">
          <Card
            style={{ height: "380px" }}
            onClick={() => {
              this.props.selectGuide(item);
            }}
          >
            <Image
              src={profileImageUrl || require("../../image/TourImage.png")}
              style={{ height: "250px" }}
            />
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Content style={{ marginTop: "10px" }}>
                {"Full Name: " + firstName + " " + lastName}
              </Card.Content>
              <Card.Content> {"Gender: " + gender}</Card.Content>
              {_type === 2 ? (
                <Card.Content>
                  <div className="bad-guid">BAD GUIDE</div>
                </Card.Content>
              ) : null}
            </Card.Content>
          </Card>
        </Link>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  selectTour: tour => dispatch(selectTour(tour)),
  selectGuide: guide => dispatch(selectGuide(guide))
});

export default connect(
  null,
  mapDispatchToProps
)(CardItem);
