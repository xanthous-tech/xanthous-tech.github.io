import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';

const ImageWrapper = styled.figure`
  width: 100vw;
`

export const Image: React.FunctionComponent = (props) => {
  console.log(props)
  return <ImageWrapper> src </ImageWrapper>
  // return (
  //   // <StaticQuery
  //   //   query={graphql`
  //   //     query ReadNextQuery {
  //   //       image: file(relativePath: { eq: src }) {
  //   //         childImageSharp {
  //   //           # Specify the image processing specifications right in the query.
  //   //           # Makes it trivial to update as your page's design changes.
  //   //           fluid(maxWidth: 2000) {
  //   //             ...GatsbyImageSharpFluid
  //   //           }
  //   //         }
  //   //       }
  //   //     }
  //   //   `}
  //   //   // tslint:disable-next-line:react-this-binding-issue
  //   //     render={({image}) => (
  //         <ImageWrapper>
  //           {/* <img srcSet={image.childImageSharp.fluid.src} /> */}
  //         </ImageWrapper>
  //       // )} 
  //   //  />
  // );
}
