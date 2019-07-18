import About from './about';
import { graphql } from 'gatsby';

export default About;

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
    allTechstackYaml {
      edges {
        node {
          id
          name
          logo {
            childImageSharp {
              fixed(quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }
`;
