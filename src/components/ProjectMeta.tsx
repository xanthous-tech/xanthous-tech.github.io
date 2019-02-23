import React from 'react';
import { Link } from 'gatsby';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';
import TeammemberCard from './TeammemberCard';
import XTLabel from './XTLabel';

const StyledSection = styled.section`
  max-width: 1040px;
  position: relative;
  margin: 0 auto;
  border-bottom: 1px solid #e4eaed;
  padding-top: 5vw;

  .row {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    margin-bottom: 20px;

    .content {
      display: flex;
      flex-flow: row wrap;
      flex: 2;
    }
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 1170px) {
    padding: 5vw 7vw 0;
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 20px 5px 0px;

  .name {
    font-size: 12px;
    color: ${colors.darkgrey};
  }
  img {
    height: 40px;
    width: auto;
    padding-right: 10px;
  }
  :hover {
    .name {
      border-bottom: 2px solid ${colors.blue};
    }
  }

  @media (max-width: 500px) {
    justify-content: flex-start;
  }
`;

export interface ProjectMetaProps {
  project: {
    length: string;
    techstack: {
      id: string;
      name: string;
      logo: {
        childImageSharp: {
          fixed: any;
        };
      };
    }[];
    teammembers: {
      id: string;
      bio: string;
      avatar: {
        children: {
          fixed: {
            src: string;
          };
        }[];
      };
    }[];
  };
}

const ProjectMeta: React.FunctionComponent<ProjectMetaProps> = ({ project }) => {
  console.log(project);
  return (
    <StyledSection>
      <div className="row">
        <XTLabel className="label--blue">Length</XTLabel>
        <span className="content">{project.length}</span>
      </div>
      <div className="row">
        <XTLabel className="label--blue">Tech Stack</XTLabel>
        <span className="content">
          {project.techstack.map(tech => (
            <Link to={`/tech/${_.kebabCase(tech.id)}/`}>
              <TechItem>
                <img srcSet={tech.logo.childImageSharp.fixed.srcSet} />
                <span className="name"> {tech.name} </span>
              </TechItem>
            </Link>
          ))}
        </span>
      </div>
      <div className="row">
        <XTLabel className="label--blue">Project Team</XTLabel>
        <div className="content">
          {project.teammembers.map(teammember => (
            <TeammemberCard teammember={teammember} />
          ))}
        </div>
      </div>
    </StyledSection>
  );
};

export default ProjectMeta;
