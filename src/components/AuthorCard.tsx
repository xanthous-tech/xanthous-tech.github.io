import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';

import t from '../content/i18n';
import { colors } from '../styles/colors';
import { AuthorProfileImage } from '../styles/shared';

const AuthorCardSection = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    & img {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

const AuthorCardName = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 2rem;

  a {
    color: ${colors.darkgrey};
    font-weight: 700;
  }

  a:hover {
    text-decoration: none;
  }
`;

const AuthorCardContent = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 500px) {
    align-items: center;
  }

  p {
    margin: 0;
    color: ${colors.midgrey};
    line-height: 1.3em;
  }
`;

export interface AuthorCardProps {
  author: any;
}

const AuthorCard: React.FunctionComponent<AuthorCardProps> = ({ author }) => {
  console.log(author);
  return (
    <AuthorCardSection>
      {/* TODO: default avatar */}
      {/* TODO: author page url */}
      <img
        className={`${AuthorProfileImage}`}
        src={author.avatar.children[0].fixed.src}
        alt={author.name}
      />
      <AuthorCardContent>
        <AuthorCardName>
          <Link to={`/author/${_.kebabCase(author.id)}/`}>{author.name}</Link>
        </AuthorCardName>
        {author.title ? (
          <p>{t[author.title]()}</p>
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.id)}/`}>more posts</Link> by this author.
          </p>
        )}
      </AuthorCardContent>
    </AuthorCardSection>
  );
};

export default AuthorCard;
