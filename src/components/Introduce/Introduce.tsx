import * as React from 'react';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import CardComponent from '../Card';

const StyledDiv = styled.section`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 20px;
  overflow: hidden;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`;

const renderAsk = (data: any, f: any): React.ReactNode => {
  const sourceData = data.allIntroYaml.edges;

  return (
    <StyledDiv>
      {sourceData.map((d: any) => (
        <CardComponent text={f({ id: d.node.content })} />
      ))}
    </StyledDiv>
  );
};

const Ask: React.FunctionComponent = () => {
  const { formatMessage: f } = useIntl();

  return (
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
          allIntroYaml {
            edges {
              node {
                id
                title
                content
              }
            }
          }
        }
      `}
      render={data => renderAsk(data, f)}
    />
  );
};

export default Ask;

//<div className="intro-wrapper" key={d.node.id}>
{
  /* <div className="intro-img">
    <Truck />
  </div> */
}
//<div className="intro-info">
//<div className="title">{t[d.node.title]()}</div>
//<div className="content">
//<p>{t[d.node.content]()}</p>
//</div>
//</div>
//</div>

/*
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .intro-wrapper {
    display: flex;

    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 50px;

    width: 80vw;
    &:last-child {
      border-bottom: none;
    }
    .intro-info > .title {
      font-size: 1.55555555555555555555em;
      font-family: 'prophetmedium', sans-serif;
      color: #40404c;
      margin-bottom: 0.64285714285714285714em;
      line-height: 1.2;
      align-self: left;
    }
    .content,
    .title {
      text-align: left;
    }
    .content {
      word-wrap: break-word;
      width: 80%;
    }
  }
  @media (min-width: 376px) and (max-width: 425px) {
    .content {
      width: 50%;
      max-width: 580px;
    }
    .intro-wrapper {
      padding: 20px;
    }
    .intro-invitation {
      top: 666px !important;
    }
  }
  @media (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    .content {
      width: 50%;
      max-width: 580px;
    }
    .intro-wrapper {
      padding: 20px;
    }
    .intro-invitation {
      top: 666px !important;
    }
  }
*/
