import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
//import { Tag } from './Tag';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

const PostCardStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 10px 40px;
  max-height: 420px;
  background: #f6f6f6 center center;
  background-size: cover;
  transition: all 0.5s ease;

  :hover {
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }

  @media (max-width: 1355px) {
    :nth-child(3) {
      display: none;
    }
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  /* border-radius: 5px 5px 0 0; */
  padding: 10px;
`;

const PostCardImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 10px 16px;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
  font-size: 30px;
  line-height: 44px;
`;
export interface PostCardProps {
  post: PageContext;
}

const PostCard: React.FunctionComponent<PostCardProps> = ({ post }) => {
  return (
    <article className={`${PostCardStyles} ${!post.frontmatter.image ? 'no-image' : ''}`}>
      {post.frontmatter.image && (
        <Link
          className={`${PostCardImageLink} `}
          to={`/${post.fields.langKey === 'en' ? '' : post.fields.langKey}${post.fields.slug}`}
        >
          <PostCardImage>
            {post.frontmatter.image && post.frontmatter.image.childImageSharp.fluid && (
              <Img
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                fluid={post.frontmatter.image.childImageSharp.fluid}
              />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent>
        <Link
          className={`${PostCardContentLink} post-card-content-link`}
          to={`/${post.fields.langKey === 'en' ? '' : post.fields.langKey}${post.fields.slug}`}
        >
          <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
        </Link>
      </PostCardContent>
    </article>
  );
};

export default PostCard;
