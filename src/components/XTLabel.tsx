import styled from '@emotion/styled';

import { colors } from '../styles/colors';

export default styled.span`
  color: ${colors.darkblue};
  position: relative;
  font-weight: 600;
  width: 200px;
  overflow: hidden;
  margin-bottom: 20px;

  &.label--blue {
    color: ${colors.darkblue};

    &::after {
      content: ' ';
      display: inline-block;
      background: ${colors.darkblue};
      width: 100%;
      height: 2px;
      margin-left: 20px;
      position: absolute;
      top: 50%;
      z-index: 2;
    }
  }
`;
