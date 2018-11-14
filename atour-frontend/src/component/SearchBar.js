import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import autobind from 'react-autobind';
import classNames from 'classnames';
import { Container, Input, Button, Grid, Header, Search } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchContainer = styled(Container)`
  background-color: rgb(22,22,22,0.7);
  padding-bottom : 20px;
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
  state = {
    terms: '',
    searchType: 'tourName',
    tours: ['Japan', 'England', 'Thailand', 'Taiwan', 'Tongchai'],
  };
  someFunction() {}
  render() {
    return (
      //   <Header
      //     as="h1"
      //     content="Imagine-a-Company"
      //     inverted
      //     style={{
      //       fontSize: "4em",
      //       fontWeight: "normal",
      //       marginBottom: 0,
      //       marginTop: "3em"
      //     }}
      //   />
      <SearchContainer>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Row centered={true} columns={12} stretched>
            <Grid.Column width={12} text>
              <Header as="h4" inverted color="grey">
                Where to ?
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered={true} columns={12} stretched>
            <Grid.Column width={8}>
              <Input focus placeholder={`Search by ${this.state.searchType}`} fluid />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button color="blue" icon="search" style={{ height: '42px' }}>
                Search
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SearchContainer>
    );
  }
}

export default SearchBar;
