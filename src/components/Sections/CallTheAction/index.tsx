import React from "react";
import styled from "react-emotion";

const CallTheAction = () => {
  return (
    <StyledSection>
      <h1>Trusted by industry-leading teams, including...</h1>
      <div className="divider" />
      <References />
    </StyledSection>
  );
};

const References = () => {
  const logos = [
    "http://via.placeholder.com/300x80?Text=Lorem",
    "http://via.placeholder.com/300x80?Text=Ipsum",
    "http://via.placeholder.com/300x80?Text=Hoba"
  ];

  return (
    <div>
      {logos.map(i => (
        <img src={i} alt="logo" />
      ))}
    </div>
  );
};

const StyledSection = styled.section``;
export default CallTheAction;
