import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header } from "semantic-ui-react";
import styled from "styled-components";

// target props: tourName, tourImage, tourRating, tourPrice, tourLocation

const TourItem = props => (
  <Card>
    {/* <Image src='/images/avatar/large/matthew.png' /> */}
    <Card.Content>
      <Card.Meta>
        <span>{this.props.tourLocation}</span>
      </Card.Meta>
      <Card.Header>{this.props.tourName}</Card.Header>
      <Card.Description>{this.props.tourPrice}</Card.Description>
      <Card.Content extra />
    </Card.Content>
  </Card>
);

export default TourItem;
