import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';

import { AuthorProfileImage } from '../styles/shared';

const TeammemberCardSection = styled.section`
  display: flex;

  &:hover {
    opacity: 0.7;
  }
`;

export interface TeammemberCardProps {
  teammember: {
    id: string;
    bio: string;
    avatar: {
      children: {
        fixed: {
          src: string;
        };
      }[];
    };
  };
}

const TeammemberCard: React.FunctionComponent<TeammemberCardProps> = ({ teammember }) => {
  return (
    <Link to={`/author/${_.kebabCase(teammember.id)}/`}>
      <TeammemberCardSection>
        <img
          className={`${AuthorProfileImage}`}
          src={teammember.avatar.children[0].fixed.src}
          alt={teammember.id}
        />
      </TeammemberCardSection>
    </Link>
  );
};

export default TeammemberCard;
