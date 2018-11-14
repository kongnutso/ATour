import React from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Text } from 'rebass';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import autobind from 'react-autobind';
import classNames from 'classnames';
import { SearchButton, Input } from '../component/BaseComponent';
import { Icon, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { onChange, onSearch } from '../action/SearchAction';

const SearchContainer = styled(Flex)`
  background-color: rgb(22,22,22,0.7);
  padding-bottom : 15px;
  padding-top: 20px;
  justify-content: center;
  /* // background-image: url(${require('../image/Studio-Tour.jpg')}); */
/* //   width: 2000px; */
/* //   height: 2000px; */
`;

const SearchBackground = styled.img`
  z-index: -1;
  background: red;
`;

const GridWithBackground = styled(Grid)`
  background-color: black;
`;

class SearchBar extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  resize() {
    this.setState({ mobile: window.innerWidth <= 760 });
  }

  state = {
    searchType: 'tourName',
    tours: ['Japan', 'England', 'Thailand', 'Taiwan', 'Tongchai'],
    mobile: true,
  };

  onEnter = () => {
    console.log('Enter leaw', this.props.term);
    onSearch(this.props.term);
  };
  render() {
    const { term, onChange, onSearch } = this.props;
    const { mobile } = this.state;
    return (
      <SearchContainer mx={[4, 2]} px={[4, 0]} width={[1, 4 / 5, 7 / 10]}>
        <Box width={[1, 4 / 5]}>
          <Text fontSize={4} mb={4} color="white">
            <i style={{ marginRight: '10px' }} className="fa fa-search" />
            Where to ?
          </Text>

          <Flex alignItems="flex-start" justifyContent="flex-start" mb={[3]} width={1}>
            <Box my={1} width={4 / 5} pr={2}>
              <Input
                placeholder=" Tour Name"
                onChange={e => onChange(e.target.value)}
                onEnterText={this.onEnter}
                value={term}
              />
            </Box>
            <Box my={1} width={1 / 5}>
              <Link to="/searchForTour">
                <SearchButton onClick={() => onSearch(term)}>
                  <Icon name="search" />
                  {!mobile && 'Search'}
                </SearchButton>
              </Link>
            </Box>
          </Flex>
        </Box>
      </SearchContainer>
    );
  }
}

export default connect(
  state => ({ term: state.search }),
  { onChange, onSearch }
)(SearchBar);
