import * as React from "react";
import styled from "@emotion/styled";

import Truck from '../icons/truck';
import Divider from '../icons/divider';
import { backgroundImages } from "polished";

const StyledDiv = styled.div`
  background-color: #f8f0f0;
`;

export interface AskProps {
  icon: any,
}

const Ask: React.FunctionComponent<AskProps> = () => (
  <StyledDiv>
    <div className="intro-wrapper" style={{ backgroundImage: Divider }}>
      <div className="intro-img">
        <Truck />
      </div>
      <div className="intro-info">
        <div className="title">
          Evolution
        </div>
        <div className="conetent">
          You believe in passion, open minds, obsessing over the little details and so do we. You’ve worked out your idea, but it got a bit rusty over the years. We’ll help you brush off the dust and give you a kick-start.
        </div>
      </div>
    </div>
  </StyledDiv>
);

export default Ask;
