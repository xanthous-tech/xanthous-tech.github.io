import React from 'react';
import { Link } from 'gatsby';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';

const StyledSection = styled.section`
  max-width: 1040px;
  position: relative;
  margin: 70px auto 0;
  border-bottom: 1px solid #e4eaed;

  .row {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    padding: 10px 0;
    .label {
      font-weight: 600
    }
    .content {
      margin-top: 10px;
      display: flex;
      flex-flow: row wrap;
      flex: 2;
    }
  } 

  a {
    text-decoration: none;
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
  min-width: 170px;

  .name {
    font-size: 12px;
    color: ${colors.darkgrey};
  }
  img {
    height: 40px;
    width: auto;
  }
  :hover {
    .name {
      border-bottom: 2px solid ${colors.blue};
    }
  }
`

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
  };
}

const ProjectMeta: React.FunctionComponent<ProjectMetaProps> = ({project}) => {
  console.log(project)
  return (
    <StyledSection>
      <div className="row">
        <span className="label">Length</span>
        <span className="content">{project.length}</span>
      </div>
      <div className="row">
        <span className="label">Tech Stack</span>
        <div className="content">
          {
            project.techstack.map(tech => (
              <Link to={`/tech/${_.kebabCase(tech.id)}/`}>
                <TechItem>
                  <img srcSet={tech.logo.childImageSharp.fixed.srcSet} />
                  <span className="name"> {tech.name} </span>
                </TechItem>
              </Link>
            ))
          }
        </div>
      </div>
    </StyledSection>
  )
}

export default ProjectMeta;