import React, { Component } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Circle, Text } from "rebass";
import styled from "styled-components";

const SPACER = 60;

const BoxWithMaxWidth = styled(({ maxWidth, ...props }) => <Box {...props} />)`
  max-width: ${props => props.maxWidth};
`;

const StepCircle = ({ active, children }) => (
  <Circle bg={active ? "#26a8dc" : "#777777"} size={30} mx={0}>
    {children}
  </Circle>
);

const CircleText = styled(Text)`
  color: white;
`;

const Line = styled(Box)`
  height: 2px;
  width: calc(100% - 180px);
`;

export default class FormProgress extends Component {
  static propTypes = {
    currentStep: PropTypes.number,
    maxWidth: PropTypes.string
  };

  static defaultProps = {
    currentStep: 1,
    maxWidth: "100%"
  };

  render() {
    const { currentStep, maxWidth } = this.props;
    return (
      <BoxWithMaxWidth maxWidth={maxWidth}>
        <Flex alignItems="center">
          <Box width={SPACER} />
          <StepCircle active>
            {currentStep === 1 ? (
              <CircleText>1</CircleText>
            ) : (
              <i className="fa fa-check" style={{ marginTop: "5px" }} />
            )}
          </StepCircle>
          <Line bg={currentStep === 1 ? "#777777" : "#26a8dc"} />
          <StepCircle active={currentStep === 2}>
            <CircleText>2</CircleText>
          </StepCircle>
          <Box width={SPACER} />
        </Flex>
      </BoxWithMaxWidth>
    );
  }
}
