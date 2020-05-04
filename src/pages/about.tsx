import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { outer, SiteMain, AuthorProfileImage } from '../styles/shared';
import * as React from 'react';
import { css } from 'emotion';
import t from '../content/i18n';

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

  .post-content {
    margin-bottom: 50px;
  }

  .list {
    display: block;
    width: 100%;

    h2 {
      margin-top: 80px;
      font-size: 24px;
    }

    .item {
      text-align: center;
      width: 33%;
      margin: 20px 0;
      display: inline-block;

      a {
        text-decoration: none;
        box-shadow: none;
      }

      .item-image {
        width: 80px;
        display: inline-block;
      }

      .item-name {
        margin: 0;
        padding: 0;
        font-size: 22px;
      }

      .item-title {
        margin: 5px;
        padding: 0;
        font-size: 12px;
        color: #333;
        font-weight: normal;
      }
    }
  }

  .list--team {
  }

  .list--stack {
    .item {
      width: auto;
      display: inline-block;
      margin: 10px 20px;

      .item-image {
        width: 40px;
      }

      .item-name {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
`;

export interface IProps {
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
          title: string;
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
    allTechstackYaml: {
      edges: {
        node: {
          id: string;
          name: string;
          bio: string;
          title: string;
          logo: {
            childImageSharp: {
              fixed: {
                src: string;
              };
            };
          };
        };
      }[];
    };
  };
}

export interface II18nData {
  [key: string]: {
    title: string;
    subtitle: string;
    teamTitle: string;
    stackTitle: string;
    content: JSX.Element;
  };
}

const i18nData: II18nData = {
  en: {
    title: 'About',
    subtitle: 'About Us',
    teamTitle: 'Team List',
    stackTitle: 'Tech Stack List',
    content: (
      <>
        <p>
          We started off as a group of freelancers, to help teams and companies around the world to
          solve various technical challenges. We realized that we really love to work with startups
          and to help them succeed. More importantly, we are pretty good at it! So we started
          Xanthous Tech in 2018 to help more businesses grow.
        </p>
        <p>
          Check out our <a href="/projects">projects</a> and see what it is like to work with us!
        </p>
      </>
    ),
  },
  zh: {
    title: '关于',
    subtitle: '关于我们',
    teamTitle: '团队列表',
    stackTitle: '技术栈列表',
    content: (
      <>
        <p>
          我们一开始只是一个自由职业者团队，为全世界范围的团队和公司解决技术难题。
          我们意识到我们都喜欢（并且很擅长）协助初创企业并获得成功，所以我们在2018年创办了先思科技，和企业共同成长。
        </p>
        <p>
          请看我们做过的<a href="/projects">项目</a>，看看我们是如何帮助企业的。
        </p>
      </>
    ),
  },
};

const About: React.FunctionComponent<IProps> = props => {
  const currentData = i18nData[props.pageContext.langKey] || i18nData['en'];

  return (
    <IndexLayout langKey={props.pageContext.langKey}>
      <Helmet>
        <title>{currentData.title} Xanthous Tech</title>
      </Helmet>
      <Wrapper className={`${PageTemplate}`}>
        <SiteNav langKey={props.pageContext.langKey} slug="/about" />

        <main id="site-main" className={`site-main ${SiteMain} ${outer}`}>
          <article className={`${PostFull} post page ${NoImage}`}>
            <PostFullHeader>
              <PostFullTitle>{currentData.title}</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <div className="about-text">{currentData.content}</div>

                <div className="list list--team">
                  <h2>{currentData.teamTitle}</h2>

                  {!props.data.allAuthorYaml
                    ? null
                    : props.data.allAuthorYaml.edges.map(author => (
                        <div className="item" key={author.node.id}>
                          <Link to={`/author/${_.kebabCase(author.node.id)}/`}>
                            <img
                              className={`${AuthorProfileImage} item-image`}
                              src={author.node.avatar.children[0].fixed.src}
                              alt={author.node.name}
                            />
                          </Link>

                          <h3 className="item-name">{author.node.name}</h3>
                          {author.node.title && (
                            <h4 className="item-title">{t[author.node.title]()}</h4>
                          )}
                        </div>
                      ))}
                </div>

                <div className="list list--stack">
                  <h2>{currentData.stackTitle}</h2>

                  {!props.data.allTechstackYaml
                    ? null
                    : props.data.allTechstackYaml.edges.map(stack => (
                        <div className="item" key={stack.node.id}>
                          <Link to={`/tech/${_.kebabCase(stack.node.id)}/`}>
                            <img
                              className={`${AuthorProfileImage} item-image`}
                              src={stack.node.logo.childImageSharp.fixed.src}
                              alt={stack.node.name}
                            />
                          </Link>

                          <h3 className="item-name">{stack.node.name}</h3>
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
};

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
