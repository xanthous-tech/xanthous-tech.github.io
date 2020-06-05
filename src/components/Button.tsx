import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';

const Button = styled.a`
  width: 200px;
  height: 60px;
  background: ${colors.yellow};
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 7px 13px 18px 6px rgba(255 205 54, 0.17);
  color: ${colors.darkyellow};
  font-family: Saira;
  font-weight: 600;
  font-size: 30px;
  line-height: 56px;

  :hover {
    background: ${colors.fadedyellow};
  }
`;

export default Button;
