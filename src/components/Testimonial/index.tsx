import React from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import { colors } from '../../styles/colors';
import { StaticQuery, graphql } from 'gatsby';

const TestimonialContainer = styled.div`
  position: relative;
  display: flex;
  padding: 60px 30px;
  width: auto;
  background-color: #ffffff;
  min-height: 650px;
  flex-direction: row;
  @media (max-width: 900px) {
    padding: 60px 70px;
  }
  .title {
    position: relative;
    display: flex;
    max-width: 350px;
    width: 100%;
    color: black;
    line-height: 84px;
    font-family: Saira;
    font-size: 66px;
    line-height: 84px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e");
  }

  .quote {
    position: absolute;
    width: 100px;
    height: 100px;
    right: 30px;
    bottom: 100px;
    font-family: Saira;
    font-weight: 500;
    font-size: 300px;
    line-height: 300px;
    color: ${colors.yellow};
    transform: rotate(180deg);
  }

  .testimonials-container {
    width: 65%;
    flex: 1;
    background-color: ${colors.backgroundgray};
  }

  @media (max-width: 800px) {
    flex-direction: column;
    .title {
      max-width: 100%;
      width: 100%;
      height: 130px;
      justify-content: center;
      align-items: center;
    }
    .quote {
      right: 20px;
      bottom: 0;
    }
    .testimonials-container {
      width: 100%;
    }
  }

  .slick-dots {
    text-align: end;
  }

  .testimonials-01 .slick-prev {
    left: 50px;
    &::before {
      color: #333;
    }
  }
  .testimonials-01 .slick-next {
    right: 50px;
    &::before {
      color: #333;
    }
  }
  @media (max-width: 800px) {
    .testimonials-01 .slick-dots {
      bottom: -20px;
    }
  }
  .testimonials-01 .slick-slide {
    padding: 0 15px;
  }
  .testimonials-01 .slider__box:before {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    width: 15px;
    background-image: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0) 100%);
  }
  @media (max-width: 800px) {
    .testimonials-01 .slider__box:before {
      content: '';
    }
  }
  .testimonials-01 .slider__box:after {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    width: 15px;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, white 100%);
  }
  @media (max-width: 800px) {
    .testimonials-01 .slider__box:after {
      content: '';
    }
  }

  @media (max-width: 800px) {
    .testimonials-01__container {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .testimonials_item {
    position: relative;
    margin-bottom: 20px;
    text-align: left;
    padding: 40px;
    @media (max-width: 900px) {
      padding: 40px 0;
    }
  }

  .testimonials_logo {
    float: right;
    @media (max-width: 900px) {
      padding: 0 20px;
    }
  }
  .testimonials_logo--round {
    border-radius: 50%;
    box-shadow: 0 5px 15px 0 rgba(37, 44, 97, 0.15);
  }

  .testimonial_title {
    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    color: black;
  }

  .testimonials_text {
    color: #636363;
    font-size: 20px;
    line-height: 36px;
  }
`;

export interface TestimonialProps {
  [key: string]: any;
}

export interface TestimonialCardProps {
  id: string;
  name: string;
  title: string;
  image: any;
  testimonialTitle: string;
  testimonial: string;
}

const TestimonialCard: React.FunctionComponent<TestimonialCardProps> = (
  props: TestimonialCardProps,
) => (
  <div className="testimonials_item">
    <div className="testimonials_logo">
      <img src={props.image.publicURL} />
    </div>
    <h3 className="testimonial_title">{props.testimonialTitle}</h3>
    <p className="testimonials_text">{props.testimonial}</p>

    <div className="testimonials_author">
      {props.name}
      <br />
      {props.title}
    </div>
  </div>
);

const renderTestimonial = (data: any): React.ReactNode => {
  const testimonials: any[] = data.allTestimonialYaml.edges.map((x: any): any => x.node);
  console.log(testimonials);
  return (
    <TestimonialContainer>
      <div className="title">
        <h1 style={{ zIndex: '1' }}>What the people say</h1>
        <div className="quote">“</div>
      </div>

      <div className="testimonials-container">
        <Slider
          className="slider__box"
          dots={true}
          infinite={true}
          arrows={true}
          autoplay={true}
          autoplaySpeed={5000}
        >
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Slider>
      </div>
    </TestimonialContainer>
  );
};

class Testimonial extends React.Component {
  constructor(props: TestimonialProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query getAllTestimonials {
            allTestimonialYaml {
              edges {
                node {
                  id
                  name
                  title
                  image {
                    publicURL
                  }
                  testimonialTitle
                  testimonial
                }
              }
            }
          }
        `}
        render={renderTestimonial}
      />
    );
  }
}

export default Testimonial;
