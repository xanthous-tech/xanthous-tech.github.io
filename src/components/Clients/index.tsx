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
  padding: 65px 215px;
  display: grid;
  @media (max-width: 800px) {
    padding: 60px 100px;
  }
  @media (max-width: 500px) {
    padding: 60px 50px;
  }
`;

const ClientsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .client {
    width: 16%;
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  @media (max-width: 1300px) {
    .client {
      width: 30%;
    }
  }
`;

const title = css`
  font-family: Saira;
  align-self: center;
  justify-self: center;
  line-height: 42px;
  font-size: 30px;
`;

const Clients: React.FC<{}> = ({}) => {
  return (
    <StyledDiv>
      <h1 className={`${title}`}>Our clients</h1>
      <ClientsWrapper>
        <div className="client">
          <Koch />
        </div>
        <div className="client">
          <Koch />
        </div>
        <div className="client">
          <Koch />
        </div>
        <div className="client">
          <Koch />
        </div>
        <div className="client">
          <Koch />
        </div>
        <div className="client">
          <Koch />
        </div>
      </ClientsWrapper>
    </StyledDiv>
  );
};

export default Clients;
