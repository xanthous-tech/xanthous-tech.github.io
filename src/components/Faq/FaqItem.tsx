import * as React from "react";
import styled from "@emotion/styled";
import Help from '../icons/help';

const StyledDiv = styled.div`
  text-align:left;
`;

export interface AskProps {
  title: any,
  content: any,
}

const FaqItem: React.FunctionComponent<AskProps> = ({ title, content }) => (
  <StyledDiv>
    <div className="help_icon_wrapper">
      <Help />
    </div>
    <h2 className="faq-02__question_heading">{title}</h2>
    <div className="faq-02__answer">
      <p>
        {content}
      </p>
    </div>
  </StyledDiv>
);

export default FaqItem;
