import styled from 'styled-components';

export default styled.button`
  border-color: white;
  background-color: white;
  color: ${props => props.color};
  &:hover {
    color: #555;
  }
`;
