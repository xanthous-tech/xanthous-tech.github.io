import * as React from 'react';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { StaticQuery, graphql } from 'gatsby';
import Koch from '../icons/clients/koch';
import InitialView from '../icons/clients/initialView';
import { colors } from '../../styles/colors';

const StyledDiv = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 70px 250px;
  display: grid;
`;

const ClientsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const title = css`
  font-family: Saira;
  align-self: center;
  justify-self: center;
  line-height: 42px;
  font-size: 30px;
  color: ${colors.textcolor};
`;

const Clients: React.FC<{}> = ({}) => {
  return (
    <StyledDiv>
      <h1 className={`${title}`}>Our clients</h1>
      <ClientsWrapper>
        <Koch />
        <Koch />
        <Koch />
        <Koch />
        <Koch />
      </ClientsWrapper>
    </StyledDiv>
  );
};

export default Clients;
