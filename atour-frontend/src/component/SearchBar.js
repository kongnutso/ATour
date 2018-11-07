import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import autobind from "react-autobind";
import classNames from "classnames";
import { Container, Input, Button, Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

const SearchContainer = styled(Container)`
    background-color: black;
    background-image: url("../images/Tour-Packages-2.jpg");
    width = 2000px;
    height = 2000px;
  
`;

const GridWithBackground = styled(Grid)`
  background-color: black;
`;

class SearchBar extends React.Component {
  state = {
    terms: "",
    searchType: "tourName",
    tours: ["Japan", "England", "Thailand", "Taiwan", "Tongchai"]
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

      <GridWithBackground
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Row centered={true} columns={12}>
          <Grid.Column width={12} text>
            <Header as="h4" inverted color="grey">
              Where to ?
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered={true} columns={12}>
          <Grid.Column width={8}>
            <Input
              focus
              placeholder={`Search by ${this.state.searchType}`}
              fluid
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="blue">Search</Button>
          </Grid.Column>
        </Grid.Row>
      </GridWithBackground>
    );
  }
}

export default SearchBar;
