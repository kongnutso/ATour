import React from "react";
import { connect } from "react-redux";
import { Flex } from "rebass";
import TourItem from "./TourItem/TourItem";
import { Card } from "semantic-ui-react";

const Tours = props => {
  if (props.role === "Guide") {
    return (
      <Card.Group centered stackable itemsPerRow={4}>
        {props.tours.map((tour, index) => (
          <TourItem tour={tour} key={index} />
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
