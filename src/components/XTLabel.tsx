import styled from '@emotion/styled';

import { colors } from '../styles/colors';

export default styled.span`
  color: ${colors.darkblue};
  position: relative;
  font-weight: 600;

  &.label--blue {
    color: ${colors.darkblue};

    &::after {
      content: ' ';
      display: inline-block;
      background: ${colors.darkblue};
      width: 50px;
      height: 2px;
      margin-left: 10px;
      position: relative;
      top: -10%;
    }
  }
`;
