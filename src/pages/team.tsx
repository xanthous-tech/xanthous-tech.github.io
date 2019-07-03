import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain, AuthorProfileImage } from '../styles/shared';
import * as React from 'react';
import { css } from 'emotion';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import * as _ from 'lodash';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }

  .auth-list {
    display: block;
    width: 100%;
  }

  .auth-item {
    text-align: center;
    width: 33%;
    display: inline-block;

    a {
      text-decoration: none;
      box-shadow: none;
    }

    img {
      width: 80px;
      display: inline-block;
    }

    h2 {
      margin: 0;
      padding: 0;
      font-size: 18px;
    }

    h4 {
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
  }
`;

export interface IndexProps {
  pageContext: {
    langKey: string;
    slug: string;
  };
  data: {
    allAuthorYaml: {
      edges: {
        node: {
          id: string;
          name: string;
          bio: string;
          avatar: {
            children: {
              fixed: {
                src: string;
              };
            }[];
          };
        };
      }[];
    };
  };
}

const Team: React.FunctionComponent<IndexProps> = props => (
  <IndexLayout langKey="en">
    <Helmet>
      <title>Team - Xanthous Tech</title>
    </Helmet>
    <Wrapper className={`${PageTemplate}`}>
      <header className={`${SiteHeader} ${outer}`}>
        <div className={`${inner}`}>
          <SiteNav langKey="en" slug="/contact" />
        </div>
      </header>
      <main id="site-main" className={`site-main ${SiteMain} ${outer}`}>
        <article className={`${PostFull} post page ${NoImage}`}>
          <PostFullHeader>
            <PostFullTitle>Team</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <div className="auth-list">
                <h1>Team List</h1>

                {!props.data.allAuthorYaml
                  ? null
                  : props.data.allAuthorYaml.edges.map(author => (
                      <div className="auth-item" key={author.node.id}>
                        <Link to={`/author/${_.kebabCase(author.node.id)}/`}>
                          <img
                            className={`${AuthorProfileImage} auth-item-avatar`}
                            src={author.node.avatar.children[0].fixed.src}
                            alt={author.node.name}
                          />
                        </Link>

                        <h2>{author.node.name}</h2>
                        <h4>{author.node.bio}</h4>
                      </div>
                    ))}
              </div>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

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
