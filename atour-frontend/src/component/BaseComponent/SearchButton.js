import styled from 'styled-components';
import COLOR from '../../utils/color';

export default styled.button`
  width: 100%;
  border-color: ${COLOR.primary};
  border-radius: 5px;
  height: 42px;
  background-color: ${COLOR.primary};
  color: white;
  &:hover {
    border-color: ${COLOR.primary_darker};
    background-color: ${COLOR.primary_darker};
  }
  &:focus {
    outline: 0px !important;
  }
  &:active {
    outline: 0px !important;
    border-color: black;
  }
`;
