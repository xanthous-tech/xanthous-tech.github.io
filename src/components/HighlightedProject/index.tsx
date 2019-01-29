import React from 'react';
import Img from 'gatsby-image';
import styled from "@emotion/styled";
import Slider from "react-slick";
import { StaticQuery, graphql, Link } from "gatsby";
import t from '../../content/i18n';
import { PageContext } from '../../templates/project';

const HighlightedProjectContainer = styled.div`
align-content: center;
.slider-01 {
  padding-top: 70px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 100px; }
  .slider-01 .slick-list {
    border-radius: 10px;
    box-shadow: 0 12px 44px 0 rgba(0, 0, 0, 0.1); }
  .slider-01 .slick-prev {
    left: 50px;
    z-index: 99;
    &::before{
      color:#333;
    }
  }
  .slider-01 .slick-next {
    right: 50px;
    z-index: 99;
    &::before{
      color:#333;
    }
  }

.slider-01__title_box {
  text-align: center;
  margin-bottom: 30px; }

.slider-01__container {
  text-align: center; }

  .slider {
  position: relative; }

.slider__arrow {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%); }
  .slider__arrow--prev {
    left: 0; }
  .slider__arrow--next {
    right: 0; }
  @media (max-width: 1275px) {
    .slider__arrow {
      display: none; } }

.slider__box {
  padding: 0;
  margin: 0;
  list-style: none; }

.slick-slide {
  outline: none; }
.slick-list{
  box-shadow:0 0 0 0 transparent!important;
}

.slider__img {
  width: 100%; }
.slider__item_box{
  width:65%;
  margin: auto;
  }
`;

export interface TestimonialProps {
  [key: string]: any,
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
  }
}

const ProjectCard: React.FunctionComponent<HighlightedProjectItemProps> = (props: HighlightedProjectItemProps) => (
  <div className="slider__item_box">
    <div className="slider__item">
      <Link
        to={`/${props.fields.langKey === 'en' ? '' : props.fields.langKey}${props.fields.slug}`}
      >
        <Img className="slider__image" fluid={props.frontmatter.image.childImageSharp.fluid} />
      </Link>
    </div>
    <div>
      {props.frontmatter.title}
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


const HighlightedProject: React.FunctionComponent<HighlightedProjectProps>= ({projects}) => {
  if (!projects) {
    return null;
  }

  const highlightedProjects: PageContext[] = projects.edges.map((x) => x.node);
  return (
    <HighlightedProjectContainer>
      <div className="slider-01">
        <div className="container container--small">
          <div className="slider-01__title_box">
            <h1 className="heading">{t["general.projects.title"]()}</h1>
            <p>
              {t["general.projects.subtitle"]()}
            </p>
          </div>
        </div>
        <div className="container slider-01__container">
          <div className="slider">
            <Slider
              className="slider__box"
              dots={true}
              infinite={true}
              arrows={true}
              autoplay={true}
              autoplaySpeed={5000}
            >
              {highlightedProjects.map(
                highlightedProject => <ProjectCard key={highlightedProject.id} {...highlightedProject}/>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </HighlightedProjectContainer>
  );
};

export default HighlightedProject;