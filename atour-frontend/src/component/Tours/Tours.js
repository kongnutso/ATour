import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Flex } from "rebass";
import TourItem from "./TourItem/TourItem";
import { Card } from "semantic-ui-react";

const Tours = props => {
  // console.log("received from guideHome ", props.tours);
  // console.log("ROLE: ", props.role);
  if (props.role === "Guide") {
    return (
      <Card.Group centered stackable itemsPerRow={3}>
        {props.tours.map(tour => (
          <TourItem tour={tour} />
        ))}
      </Card.Group>
    );
  } else {
    return (
      <Flex width={1} flexWrap="wrap">
        {props.tours.map(tour => (
          <TourItem tour={tour} />
        ))}
      </Flex>
    );
  }
};

const mapStateToProps = state => {
  return {
    role: state.user.role
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tours);
