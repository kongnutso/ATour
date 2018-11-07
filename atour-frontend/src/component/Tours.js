import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Card, Header } from "semantic-ui-react";
import styled from "styled-components";
import TourItem from "./Guide/TourItem";

// target props: tours
// tourName, tourImage, tourRating, tourPrice, tourLocation
const Tours = props => (
  <Card.Group itemsPerRow={3}>
    {props.tours.map(tour => (
      <TourItem tour={tour} />
    ))}
  </Card.Group>
);

export default Tours;
