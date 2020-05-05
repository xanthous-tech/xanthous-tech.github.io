import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';

export const Button = styled.a`
    position: absolute;
    width: 200px;
    height: 83px;
    top: 553px;
    left: 103px;
    background: ${colors.yellow};
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 7px 13px 18px 6px rgba(255 205 54, 0.17);
  }

  .intro-invitation > a {
    color: ${colors.darkyellow};
    font-family: Saira;
    font-weight: 600;
    font-size: 30px;
    line-height: 56px;
`;
