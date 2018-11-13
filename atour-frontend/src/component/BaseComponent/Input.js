import React, { Component } from 'react';
import styled from 'styled-components';
import COLOR from '../../utils/color';

const StyleInput = styled.input`
  border: 1px solid #ccc;
  width: 100%;
  height: 42px;
  padding-left: 10px;
  &::placeholder {
    color: ${COLOR.disable_text};
    font-weight: 100;
  }
  &:focus {
    outline: 0px;
    border-color: black;
  }
`;
export default class Input extends Component {
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onEnterText();
    }
  };
  render() {
    const { onEnterText, ...props } = this.props;
    return <StyleInput type="text" onKeyPress={this.handleKeyPress} {...props} />;
  }
}
