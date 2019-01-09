import * as React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";

import Truck from '../icons/truck';

const StyledDiv = styled.div`
  background-color: #f8f0f0;
  .intro-wrapper{
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width:1080px;
    padding:50px;
    border-bottom: 2px solid #eeeeee;
    .intro-img,.intro-info{
      width:50%;
      min-width:375px;
    }
    .intro-info > .title{
      font-size: 1.55555555555555555555em;
      font-family: 'prophetmedium',sans-serif;
      color: #40404C;
      margin-bottom: .64285714285714285714em;
      line-height: 1.2;
      align-self: left;
    }
    .content,.title{
      text-align:left;
    }
  }
`;

const renderAsk = (data: any): React.ReactNode => {
  const sourceData = data.allIntroYaml.edges;
  console.log(sourceData)
  return (
    <StyledDiv>
      {
        sourceData.map((d: any) => (
          <div className="intro-wrapper" key={d.node.id}>
            <div className="intro-img">
              <Truck />
            </div>
            <div className="intro-info">
              <div className="title">
                Evolution
          </div>
              <div className="content">
                {d.node.content}
              </div>
            </div>
          </div>
        ))
      }
    </StyledDiv>
  )
}


const Ask: React.FunctionComponent = () => (
  <StaticQuery
    query={graphql`
      query allFile {
        title_icon: file(relativePath: { eq: "img/chatbot.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        allIntroYaml{
         edges{
          node{
            id
            content
          }
        }
        }
      }
    `}
    render={renderAsk}
  />
);

export default Ask;
