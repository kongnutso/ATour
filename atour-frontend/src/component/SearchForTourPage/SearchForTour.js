import React, { Component, Fragment } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Table from '../Table';
import PopUpModal from '../PopUpModal/PopUpModal';
import COLOR from '../../utils/color';
import { Button, SearchButton, Input } from '../BaseComponent';
import Tours from '../Tours/Tours';
import { onChange, onSearch } from '../../action/SearchAction';

//Mock Data
const tours = [
  {
    tourName: 'Tour Name',
    tourImage: '../../image/Atour-logo.jpg',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
  {
    tourName: 'Tour Name',
    tourImage: '../../image/TourImage.png',
    tourRating: '3',
    tourPrice: '3000 baht',
    tourLocation: 'Bangkok',
  },
];
class SearchForTour extends Component {
  render() {
    const { term, onChange, onSearch } = this.props;
    return (
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Flex flexWrap="wrap" justifyContent="center">
          <Box width={4 / 5}>
            <Text fontSize={4} mb={4} mt={3}>
              <i style={{ marginRight: '10px' }} className="fa fa-search" />
              Search For Tour
            </Text>

            <Flex alignItems="flex-start" justifyContent="flex-start" mb={[3, 4]} width={1}>
              <Box my={1} width={4 / 5}>
                <Input
                  placeholder="Tour Name"
                  onChange={e => onChange(e.target.value)}
                  value={term}
                />
              </Box>
              <Box my={1} width={1 / 5}>
                <SearchButton onClick={() => onSearch()}>
                  <Icon name="search" />
                  Search
                </SearchButton>
              </Box>
            </Flex>

            <Flex>
              <Tours tours={tours} />
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default connect(
  state => ({ term: state.search }),
  { onChange, onSearch }
)(SearchForTour);
