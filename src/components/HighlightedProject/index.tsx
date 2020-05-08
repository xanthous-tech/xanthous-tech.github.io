import React from 'react';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import { StaticQuery, graphql, Link } from 'gatsby';
import t from '../../content/i18n';
import { PageContext } from '../../templates/project';
import { settings } from 'cluster';

const HighlightedProjectContainer = styled.div`
  align-content: center;
  .slider-01 {
    padding-top: 70px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
  }

  .slider-01__title_box {
    text-align: center;
    margin-bottom: 30px;
  }

  @media (max-width: 1275px) {
    .slider__arrow {
      display: none;
    }
  }

  .slider__box {
    padding: 0;
    margin: 0;
    width: 100vw;
    margin-left: 100px;
    list-style: none;
    height: 450px;
  }

  .slick-slide {
    outline: none;
    width: 500px;
  }
  .slick-list {
    box-shadow: 0 0 0 0 transparent !important;
  }

  .slider__img {
    width: 100%;
    height: 300px;
  }

  .slick-current .slider__item_box {
    transform: scale(1.2);
    transform-origin: bottom right;
    transition-delay: 0.1s;
    transition-duration: 0.4s;
    padding-left: 63px;
  }

  .slider__item_box {
    margin: 50px 0 0 50px;
    padding: 80px 0 0 0;
    transform-origin: bottom right;
    transition-delay: 0.1s;
    transition-duration: 0.4s;
  }

  .slick-dots {
    bottom: -60px;
    width: 100%;
    list-style: none;
    text-align: center;
    max-width: 1260px;
  }

  .slick-dots li {
    margin: 0;
  }
`;

export interface TestimonialProps {
  [key: string]: any;
}

export interface HighlightedProjectItemProps {
  frontmatter: {
    title: string;
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
  };
  fields: {
    langKey: string;
    slug: string;
  };
}

const ProjectCard: React.FunctionComponent<HighlightedProjectItemProps> = props => (
  <div className="slider__item_box">
    <div className="slider__item">
      <Link
        to={`/${props.fields.langKey === 'en' ? '' : props.fields.langKey}${props.fields.slug}`}
      >
        <Img className="slider__img" fixed={props.frontmatter.smallImage.childImageSharp.fixed} />
      </Link>
    </div>
    <div>{props.frontmatter.title}</div>
  </div>
);

export interface HighlightedProjectProps {
  projects: {
    edges: {
      node: PageContext;
    }[];
  };
}

const HighlightedProject: React.FunctionComponent<HighlightedProjectProps> = ({ projects }) => {
  if (!projects) {
    return null;
  }

  const highlightedProjects: PageContext[] = projects.edges.map(x => x.node);
  return (
    <HighlightedProjectContainer>
      {/* <div className="slider-01"> */}
      <div className="container container--small">
        <div className="slider-01__title_box">
          <h1 className="heading">{t['general.projects.title']()}</h1>
          <p>{t['general.projects.subtitle']()}</p>
        </div>
      </div>

      <Slider
        className="slider__box"
        dots={true}
        slidesToShow={3}
        arrows={true}
        autoplay={false}
        autoplaySpeed={3000}
        infinite={true}
        swipeToSlide={true}
      >
        {highlightedProjects.concat(highlightedProjects).map(highlightedProject => (
          <ProjectCard key={highlightedProject.id} {...highlightedProject} />
        ))}
      </Slider>
      {/* </div> */}
    </HighlightedProjectContainer>
  );
};

export default HighlightedProject;
