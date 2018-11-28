import React, { Component } from "react";
import { Flex, Box, Text } from "rebass";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { SearchButton, Input } from "../BaseComponent";
import Cards from "../Cards/Cards";
import { onChange, onSearch } from "../../action/SearchAction";

class SearchFor extends Component {
  componentDidMount() {
    this.props.onSearch("");
  }
  render() {
    const { term, onChange, onSearch, tours, guides } = this.props;
    const isTour = this.props.location.pathname === "/searchForTour";
    const Header = "Search For " + (isTour ? "Tour" : "Guide");
    const placeholder = isTour ? "Tour Name" : "Guide Name";
    const items = isTour ? tours : guides;
    return (
      <div
        className="my fucking flag"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <Flex flexWrap="wrap" justifyContent="center">
          <Box width={4 / 5}>
            <Text fontSize={4} mb={4} mt={3}>
              <i style={{ marginRight: "10px" }} className="fa fa-search" />
              {Header}
            </Text>

            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              mb={[3, 4]}
              width={1}
            >
              <Box my={1} width={4 / 5}>
                <Input
                  placeholder={placeholder}
                  onChange={e => onChange(e.target.value)}
                  value={term}
                  onEnterText={() => onSearch(term, isTour)}
                />
              </Box>
              <Box my={1} width={1 / 5}>
                <SearchButton onClick={() => onSearch(term, isTour)}>
                  <Icon name="search" />
                  Search
                </SearchButton>
              </Box>
            </Flex>

            <Flex>
              <Cards
                items={items}
                isGuide={!isTour}
                role="customer"
                tours={this.props.tours}
              />
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default connect(
  state => ({
    term: state.search,
    tours: state.tour.tourList,
    guides: state.guide.guideList
  }),
  { onChange, onSearch }
)(SearchFor);
