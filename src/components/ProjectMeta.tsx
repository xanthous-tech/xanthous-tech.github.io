import React from 'react';
import { Link } from 'gatsby';
import * as _ from 'lodash';
import styled from '@emotion/styled';

const StyledSection = styled.section`
  margin: 100px 10vw 20px;
  .row {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
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
`;

const TechItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  .name {
    font-size: 12px;
    color: #030303;
  }
  img {
    height: 40px;
    width: auto;
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