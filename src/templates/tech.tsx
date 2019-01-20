import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled'
import { css } from 'emotion'

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import ProjectCard from '../components/ProjectCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SocialLink,
} from '../styles/shared';
import { PageContext } from './post';
import Helmet from 'react-helmet';
import config from '../website-config';
import Website from '../components/icons/website';
import t from '../content/i18n';

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: Georgia, serif;
  font-style: italic;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 5px 0 10px 0;
  max-width: 600px;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.5;
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: 0 0 20px 0;
  width: 100px;
  height: 100px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
`;

interface TechTemplateProps {
  pathContext: {
    slug: string;
    tech: string;
    langKey: string;
  };
  pageContext: {
    slug: string;
    tech: string;
    langKey: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMdx: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
    techstackYaml: {
      id: string;
      name: string;
      website?: string;
      desc?: string;
      logo: {
        childImageSharp: {
          fluid: any;
        };
      };
    };
  };
}

const Tech: React.FunctionComponent<TechTemplateProps> = props => {
  console.log(props);
  const tech = props.data.techstackYaml;
  const { edges, totalCount } = props.data.allMdx;

  return (
    <IndexLayout {...props.pathContext}>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tech.name} - {config.title}
        </title>
        <meta name="description" content={tech.desc} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${tech.name} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        <meta property="article:publisher" content="https://www.facebook.com/ghost" />
        <meta property="article:author" content="https://www.facebook.com/ghost" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${tech.name} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && <meta name="twitter:site" content={`@${config.twitter.split('https://twitter.com/')[1]}`} />}
        {config.twitter &&
        <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />}
      </Helmet>
      <Wrapper>
        <header
          className={`${SiteHeader} ${outer} no-cover`}
        >
          <div className={`${inner}`}>
            <SiteNav isHome={false} {...props.pathContext} />
            <SiteHeaderContent>
              <img
                className={`${AuthorProfileBioImage} ${AuthorProfileImage}`}
                src={props.data.techstackYaml.logo.childImageSharp.fluid.src}
                alt={tech.name}
              />
              <SiteTitle>{tech.name}</SiteTitle>
              {tech.desc && <AuthorBio>{t[tech.desc]()}</AuthorBio>}
              <AuthorMeta>
                <div className={`${HiddenMobile}`}>
                  {totalCount > 1 && `${totalCount} posts`}
                  {totalCount === 1 && `1 post`}
                  {totalCount === 0 && `No posts`} <Bull>•</Bull>
                </div>
                {tech.website && (
                  <div>
                    <a
                      className={`${SocialLink} social-link-wb`}
                      href={tech.website}
                      title="Website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Website />
                    </a>
                  </div>
                )}
              </AuthorMeta>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {edges.map(({ node }) => {
                if (node.frontmatter.meta.techstack && node.frontmatter.meta.techstack.map(t => t.id).includes(tech.id)) {
                  return <ProjectCard key={node.fields.slug} post={node} />;
                }
                return null;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tech;

export const pageQuery = graphql`
  query($tech: String, $lang: String) {
    techstackYaml(id: { eq: $tech }) {
      id
      name
      website
      desc
      logo {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMdx(
      limit: 2000,
      filter: {
        frontmatter: {
          layout: { eq: "project"}
          draft: { ne: true }
        },
        fields: {
          langKey: { eq: $lang }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            meta {
              techstack {
                id
                name
                logo {
                  childImageSharp {
                    fixed(quality: 100) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
            author {
              id
              name
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
          fields {
            layout
            slug
            langKey
          }
        }
      }
    }
  }
`;