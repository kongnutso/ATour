import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import TourItem from './TourItem';

// target props: tours
// tourName, tourImage, tourRating, tourPrice, tourLocation
const Tours = props => {
  return (
    <Flex width={1} flexWrap="wrap">
      {props.tours.map(tour => (
        <TourItem tour={tour} />
      ))}
    </Flex>
  );
};

export default Tours;
