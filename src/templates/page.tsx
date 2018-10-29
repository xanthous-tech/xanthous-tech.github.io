import * as React from "react";
import { graphql } from "gatsby";

import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts";

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </Container>
      </Page>
    </IndexLayout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fileAbsolutePath
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`;

// markdownRemark(fields: { slug: { eq: $slug } }) {
//   html
//   excerpt
//   frontmatter {
//     title
//   }
// }
// }
