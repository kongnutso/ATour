import React from "react";
import styled from "styled-components";
import { Flex } from "rebass";
import TourItem from "./TourItem";

const Tours = props => {
  // console.log("received from guideHome ", props.tours);
  return (
    <Flex width={1} flexWrap="wrap">
      {props.tours.map(tour => (
        <TourItem tour={tour} />
      ))}
    </Flex>
  );
};

export default Tours;
