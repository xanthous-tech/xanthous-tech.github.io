import { graphql } from 'gatsby';
import Team from './team';

export default Team;

export const pageQuery = graphql`
  query {
    allAuthorYaml {
      edges {
        node {
          id
          name
          title
          bio
          avatar {
            children {
              ... on ImageSharp {
                fixed(quality: 100) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
