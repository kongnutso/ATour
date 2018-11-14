import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import autobind from 'react-autobind';
import classNames from 'classnames';
import { Card, Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { selectTour } from '../../action/TourAction';

// target props: tourName, tourImage, tourRating, tourPrice, tourLocation
class TourItem extends React.Component {
  selectTour() {
    this.props.selectTour(this.props.tour);
  }
  render() {
    return (
      <Link to="/customerTourInfo">
        <Card
          onClick={() => {
            console.log(this.props.tour);
            this.selectTour(this.props.tour);
          }}
        >
          <Image src={require('../../image/TourImage.png')} />
          <Card.Content>
            <Card.Meta>
              <span>{this.props.tour.tourLocation}</span>
            </Card.Meta>
            <Card.Header>{this.props.tour.tourName}</Card.Header>
            <Card.Description>{this.props.tour.tourPrice}</Card.Description>
            <Card.Content>
              <StarRatingComponent
                name=""
                starCount={5}
                value={this.props.tour.tourRating}
              />
            </Card.Content>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectTour: tour => dispatch(selectTour(tour))
});

export default connect(
  null,
  mapDispatchToProps
)(TourItem);
