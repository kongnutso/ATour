import React from "react";
import { Image } from "rebass";
import "./styles.css";

class Review extends React.Component {
  render() {
    return (
      <div className="review-container">
        <div className="review-profile-container">
          <Image src={this.props.image} className="review-profile-img" />
          <div className="review-profile-username">
            {this.props.fullName}
            <div className="review-date">{this.props.date}</div>
          </div>
        </div>
        <div className="review-content">{this.props.comment}</div>
      </div>
    );
  }
}

export default Review;
