import styled from 'styled-components';

export default styled.i`
  animation: vertical 1s linear infinite;
  @-webkit-keyframes vertical {
    0% {
      -webkit-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    10% {
      -webkit-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    20% {
      -webkit-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    30% {
      -webkit-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    40% {
      -webkit-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    50% {
      -webkit-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    60% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }

  @keyframes vertical {
    0% {
      -webkit-transform: translate(0, -3px);
      -ms-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    10% {
      -webkit-transform: translate(0, 3px);
      -ms-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    20% {
      -webkit-transform: translate(0, -3px);
      -ms-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    30% {
      -webkit-transform: translate(0, 3px);
      -ms-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    40% {
      -webkit-transform: translate(0, -3px);
      -ms-transform: translate(0, -3px);
      transform: translate(0, -3px);
    }

    50% {
      -webkit-transform: translate(0, 3px);
      -ms-transform: translate(0, 3px);
      transform: translate(0, 3px);
    }

    60% {
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
`;
