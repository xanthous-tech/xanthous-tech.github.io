import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import DoubleArrows from './icons/doubleArrows';

const Wrapper = styled.div`
  display: block;
  color: #fff;
  border-radius: 10px;
  opacity: 0.8;
  margin-left: 60px;
  font-family: Saira;
  font-weight: normal;
  font-size: 16px;
  line-height: 12px;
  @media (max-width: 1000px) {
    margin-left: 30px;
  }
  /* or 75% */

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`;

export interface LanguageToggleProps {
  langKey: string;
  slug: string;
}

const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = props => {
  console.log('$$$$', props);
  return (
    <Link to={`${props.langKey === 'en' ? '/zh' : ''}/${props.slug}`}>
      <Wrapper>
        {props.langKey === 'en' ? '中文' : 'English'}
        <DoubleArrows />
      </Wrapper>
    </Link>
  );
};

export default LanguageToggle;
