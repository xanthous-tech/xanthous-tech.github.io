import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';

import koch from '../../content/clients/koch.svg';
import amz from '../../content/clients/amz.svg';
import dynamite from '../../content/clients/dynamite.svg';
import initialView from '../../content/clients/initialView.svg';
import ingclass from '../../content/clients/ingclass.svg';
import caminer from '../../content/clients/caminer.svg';

const StyledDiv = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 65px 130px;
  display: grid;
  @media (max-width: 800px) {
    padding: 60px 50px;
  }
  @media (max-width: 500px) {
    padding: 60px 20px;
  }
`;

const ClientsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

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
`;

const Clients: React.FC<{}> = ({}) => {
  return (
    <StyledDiv>
      <h4 className={`${title}`}>Our clients</h4>
      <ClientsWrapper>
        <div className="client">
          <img src={koch} />
        </div>
        <div className="client">
          <img src={initialView} />
        </div>
        <div className="client">
          <img src={amz} />
        </div>
        <div className="client">
          <img src={dynamite} />
        </div>
        <div className="client">
          <img src={ingclass} />
        </div>
        <div className="client">
          <img src={caminer} />
        </div>
      </ClientsWrapper>
    </StyledDiv>
  );
};

export default Clients;
