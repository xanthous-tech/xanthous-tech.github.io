import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';

import { colors } from '../styles/colors';
import { PageContext } from '../pages/projects';
import MoreButton from './icons/more-buttons.png';

const ProjectCardStyles = css`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 40px;
  height: 222px;
  width: 242px;
  background: #f8f8f8;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease;

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }
`;

const ProjectCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const ProjectCardImage = styled.div`
  width: auto;
  height: 120px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const ProjectCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.backgroundgray};
  height: 105px;
`;

const ProjectCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 12px;
  top: -16px;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const ProjectCardTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 5px;
`;

const TechList = styled.ul`
  display: flex;
  position: relative;
  top: -13px;
  z-index: 10;
  margin: 0;
  padding: 0 10px;
  justify-content: flex-end;
  list-style: none;
`;

const TechListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :nth-child(1) {
    z-index: 10;
  }
  :nth-child(2) {
    z-index: 9;
  }
  :nth-child(3) {
    z-index: 8;
  }
  :nth-child(4) {
    z-index: 7;
  }
  :nth-child(5) {
    z-index: 6;
  }
  :nth-child(6) {
    z-index: 5;
  }
  :nth-child(7) {
    z-index: 4;
  }
  :nth-child(8) {
    z-index: 3;
  }
  :nth-child(9) {
    z-index: 2;
  }
  :nth-child(10) {
    z-index: 1;
  }
  :hover .tech-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const StaticAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 0px;
  width: 26px;
  height: 26px;
  margin: 0 2px;
  border: 1px solid white;
  background-color: white;
  border-radius: 100%;
`;

const TechImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
`;

export interface ProjectCardProps {
  post: PageContext;
}

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({ post }) => {
  const { meta } = post.frontmatter;
  return (
    <article
      className={`post-card ${ProjectCardStyles} ${!post.frontmatter.image ? 'no-image' : ''}`}
    >
      {post.frontmatter.image && (
        <Link
          className={`${ProjectCardImageLink} post-card-image-link`}
          to={`/${post.fields.langKey === 'en' ? '' : post.fields.langKey}${post.fields.slug}`}
        >
          <ProjectCardImage className="post-card-image">
            {post.frontmatter.image && post.frontmatter.image.childImageSharp.fluid && (
              <Img
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                fluid={post.frontmatter.image.childImageSharp.fluid}
              />
            )}
          </ProjectCardImage>
        </Link>
      )}

      <ProjectCardContent className="post-card-content">
        <TechList>
          {meta.techstack.map((tech, idx) => {
            // if (idx < 3) {
            return (
              <TechListItem>
                {/* <TechNameTooltip className="tech-name-tooltip">{tech.name}</TechNameTooltip> */}
                <Link className={`${StaticAvatar}`} to={`/tech/${_.kebabCase(tech.id)}/`}>
                  <img
                    className={`${TechImage}`}
                    srcSet={tech.logo.childImageSharp.fixed.srcSet}
                    alt={tech.id}
                  />
                </Link>
              </TechListItem>
            );
          })}
        </TechList>
        <Link
          className={`${ProjectCardContentLink} post-card-content-link`}
          to={`/${post.fields.langKey === 'en' ? '' : post.fields.langKey}${post.fields.slug}`}
        >
          <header className="post-card-header">
            <ProjectCardTitle>{post.frontmatter.title}</ProjectCardTitle>
          </header>
        </Link>
      </ProjectCardContent>
    </article>
  );
};

export default ProjectCard;
