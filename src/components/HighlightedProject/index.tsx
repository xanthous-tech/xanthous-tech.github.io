import React from 'react';
import Img from 'gatsby-image';
import styled from "@emotion/styled";
import Slider from "react-slick";
import { StaticQuery, graphql } from "gatsby";

const HighlightedProjectContainer = styled.div`
.slider-01 {
  padding-top: 70px;
  padding-bottom: 100px; }
  .slider-01 .slick-list {
    border-radius: 10px;
    box-shadow: 0 12px 44px 0 rgba(0, 0, 0, 0.1); }
  .slider-01 .slick-prev {
    left: 50px;
  }
  .slider-01 .slick-next {
    right: 50px;
  }

.slider-01__title_box {
  text-align: center;
  margin-bottom: 70px; }

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

.slider__img {
  width: 100%; }
`;

export interface TestimonialProps {
  [key: string]: any,
}

export interface HighlightedProjectItemProps {
  [key: string]: any,
}

const TestimonialCard: React.FunctionComponent<HighlightedProjectItemProps> = (props: HighlightedProjectItemProps) => (
  <div className="slider__item">
    <Img className="slider__image" fluid={props.image.childImageSharp.fluid} />
  </div>
);

const renderHighlightedProject = (data: any): React.ReactNode => {
  console.log(data);
  const highlightedProjects: any[] = data.allMdx.edges.map((x: any): any => x.node);
  return (
    <HighlightedProjectContainer>
      <div className="slider-01">
        <div className="container container--small">
          <div className="slider-01__title_box">
            <h1 className="heading">Project Highlights</h1>
            {/* <p>Combine ground beef, cauliflower and mackerel. Enamel with chopped marmalade and serve mashed with okra. Enjoy!</p> */}
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
                highlightedProject => <TestimonialCard key={highlightedProject.id} image={highlightedProject.frontmatter.image} />
              )}
            </Slider>
          </div>
        </div>
      </div>
    </HighlightedProjectContainer>
  );
};

class HighlightedProject extends React.Component {
  constructor(props: TestimonialProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query getHighlightedProjects {
            allMdx(
              filter: {
                frontmatter: {
                  highlighted: { eq: true }
                }
              }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    image {
                      childImageSharp {
                        fluid(maxWidth: 800) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={renderHighlightedProject}
      />
    );
  }
}

export default HighlightedProject;