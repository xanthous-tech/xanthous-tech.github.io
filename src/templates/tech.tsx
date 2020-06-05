import { graphql } from 'gatsby';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import { css } from 'emotion';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import ProjectCard from '../components/ProjectCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { PageContext } from './post';
import Helmet from 'react-helmet';
import config from '../website-config';
import t from '../content/i18n';
import Button from '../components/Button';

const MainContentWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 60px;
  min-height: 600px;
`;

const TechStackLogo = css`
  position: absolute;
  max-height: 55px;
`;

const CaseStudiesTitle = styled.div`
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin-bottom: 40px;
`;

const AuthorBio = styled.p`
  margin-top: 75px;
  font-size: 2rem;
  line-height: 29px;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const SliderStyles = css`
  .slick-track {
    width: 100%;
    margin: 0;
  }
`;
const ContactUsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
`;

const ContactUsText = styled.div`
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
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
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <SiteNav isHome={false} {...props.pathContext} />
      <Wrapper>
        <MainContentWrapper>
          <img
            className={`${TechStackLogo}`}
            src={props.data.techstackYaml.logo.childImageSharp.fluid.src}
            alt={tech.name}
          />
          {tech.desc && <AuthorBio>{t[tech.desc]()}</AuthorBio>}

          <CaseStudiesTitle>Case studies</CaseStudiesTitle>
          <Responsive tech={tech} data={props.data} />
          <ContactUsWrapper>
            <ContactUsText>
              Have a project you want to buld with {props.data.techstackYaml.name}?
            </ContactUsText>
            <Button>Talk to us</Button>
          </ContactUsWrapper>
        </MainContentWrapper>
      </Wrapper>
      <Footer />
    </IndexLayout>
  );
};

class Responsive extends Component<{ data: any; tech: { id: string } }> {
  render() {
    const { edges } = this.props.data.allMdx;
    const { tech } = this.props;
    // Carousel settings
    const settings = {
      className: `${SliderStyles}`,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <Slider {...settings}>
          {edges.reduce((acc: any[], { node }: any) => {
            if (
              node.frontmatter.meta.techstack &&
              node.frontmatter.meta.techstack.some((t: any) => t.id === tech.id)
            ) {
              return acc.concat(<ProjectCard key={node.fields.slug} post={node} />);
            }
            return acc;
          }, [])}
        </Slider>
      </div>
    );
  }
}

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
      limit: 2000
      filter: {
        frontmatter: { layout: { eq: "project" }, draft: { ne: true } }
        fields: { langKey: { eq: $lang } }
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
