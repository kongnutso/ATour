import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import { selectTour, selectGuide } from "../../action/SelectAction";
import TourItem from "../Tours/TourItem/TourItem";

class CardItem extends React.Component {
  selectTour() {
    this.props.selectTour(this.props.item);
  }
  render() {
    if (!this.props.isGuide) {
      // if (this.props.role == "Guide") {
      return <TourItem tour={this.props.item} item={this.props.item} />;
      // } else {
      //   return (
      //     <Link to="/customerTourInfo">
      //       <Card
      //         style={{ height: "400px" }}
      //         onClick={() => {
      //           this.selectTour(this.props.item);
      //         }}
      //       >
      //         <Image src={require("../../image/TourImage.png")} />
      //         <Card.Content>
      //           <Card.Meta>
      //             <span>{this.props.item.tourLocation}</span>
      //           </Card.Meta>
      //           <Card.Header>
      //             {this.props.item.tourName.substring(0, 40) + " ..."}
      //           </Card.Header>
      //           <Card.Description>
      //             {this.props.item.price + " bath"}{" "}
      //           </Card.Description>
      //           <Card.Content>
      //             <StarRatingComponent
      //               name=""
      //               starCount={5}
      //               value={this.props.item.tourRating}
      //             />
      //           </Card.Content>
      //         </Card.Content>
      //       </Card>
      //     </Link>
      //   );
      // }
    } else {
      const {
        item: {
          userName,
          profile: { firstName, lastName, gender }
        },
        item
      } = this.props;
      return (
        <Link to="/guideInfo">
          <Card
            style={{ height: "400px" }}
            onClick={() => {
              this.props.selectGuide(item);
            }}
          >
            <Image src={require("../../image/TourImage.png")} />
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Content style={{ marginTop: "10px" }}>
                {"Full Name: " + firstName + " " + lastName}
              </Card.Content>
              <Card.Content> {"Gender: " + gender}</Card.Content>
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
