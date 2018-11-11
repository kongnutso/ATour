import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";

// target props: tourName, tourImage, tourRating, tourPrice, tourLocation

const TourItem = props => (
  <Card>
    <Image src={require("../../image/TourImage.png")} />
    <Card.Content>
      <Card.Meta>
        <span>{props.tour.tourLocation}</span>
      </Card.Meta>
      <Card.Header>{props.tour.tourName}</Card.Header>
      <Card.Description>{props.tour.tourPrice}</Card.Description>
      <Card.Content>
        <StarRatingComponent
          name=""
          starCount={5}
          value={props.tour.tourRating}
        />
      </Card.Content>
    </Card.Content>
  </Card>
);

export default TourItem;
