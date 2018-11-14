import React from 'react';
import { Box } from 'rebass';
import { Card, Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';

// target props: tourName, tourImage, tourRating, tourPrice, tourLocation

const TourItem = props => {
  console.log('proppp', props);
  return (
    <Box width={[1, 1 / 2, 1 / 2, 1 / 3]} p={2} my={2}>
      <Card>
        <Image src={require('../../image/TourImage.png')} />
        <Card.Content>
          <Card.Meta>
            <span>{props.tour.tourLocation}</span>
          </Card.Meta>
          <Card.Header>{props.tour.tourName}</Card.Header>
          <Card.Description>{props.tour.tourPrice}</Card.Description>
          <Card.Content>
            <StarRatingComponent name="" starCount={5} value={props.tour.tourRating} />
          </Card.Content>
        </Card.Content>
      </Card>
    </Box>
  );
};
export default TourItem;
