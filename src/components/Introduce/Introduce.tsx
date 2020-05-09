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
