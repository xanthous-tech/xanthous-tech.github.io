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

  .heading {
    font-family: Saira;
    margin-bottom: 15px;
    color: black;
  }

  .slider-01 {
    padding-top: 70px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
  }

  .slider-01__title_box {
    text-align: start;
    margin-bottom: 30px;
    margin: 0 20px;
  }

  .slider-01__title_box p {
    font-family: Sarala;
    font-size: 26px;
    line-height: 36px;
    margin: 0;
  }

  @media (max-width: 1275px) {
    .slider__arrow {
      display: none;
    }
  }

  .slider__box {
    padding: 0;
    margin: 0;
    width: 1570px;
    margin-left: 20px;
    list-style: none;
    height: 450px;
  }

  /* .slick-slide {
    outline: none;
    width: 500px;
  } */
  .slick-list {
    box-shadow: 0 0 0 0 transparent !important;
  }

  .slider__img {
    width: 100%;
    height: 100%;
  }

  .slider__item_to_bottom {
    position: relative;
    height: 450px;
  }

  .slick-current .slider__item_box {
    left: 0;
    transform: translateX(0) scale(1.2);
  }

  .slider__item_box {
    position: absolute;
    bottom: 0;

    left: 100%;
    transform: translateX(-100%) scale(1);

    height: 350px;
    width: 450px;

    transition-property: all justify-content;
    transform-origin: bottom left;
    transition-delay: 0.1s;
    transition-duration: 0.4s;
  }

  .slider__item {
    height: 85%;
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
    smallImage: {
      childImageSharp: {
        fixed: any;
      };
    };
  };
  fields: {
    langKey: string;
    slug: string;
  };
}

const ProjectCard: React.FunctionComponent<HighlightedProjectItemProps> = props => (
  <div className="slider__item_to_bottom">
    <div className="slider__item_box">
      <div className="slider__item">
        <Link
          to={`/${props.fields.langKey === 'en' ? '' : props.fields.langKey}${props.fields.slug}`}
        >
          <Img className="slider__img" fixed={props.frontmatter.smallImage.childImageSharp.fixed} />
        </Link>
      </div>
      <div className="slider__item_title">{props.frontmatter.title}</div>
    </div>
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
