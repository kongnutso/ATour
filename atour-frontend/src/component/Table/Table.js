import Table from 'react-table';
import styled, { css } from 'styled-components';
import COLOR from '../../utils/color';
import './react-table.css';

const TableStyled = styled(Table)`
  & .rt-thead {
    background-color: ${COLOR.primary};
  }
  & .rt-tr {
    ${({ alignItems }) =>
      alignItems &&
      css`
        align-items: ${alignItems};
      `};
  }
`;

export default TableStyled;
