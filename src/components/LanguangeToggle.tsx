import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;
  margin-left: 5px;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`

export interface LanguageToggleProps {
  langKey: string;
  slug: string;
}

const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = (props) =>  {
  console.log("$$$$", props)
  return (
    <Link to={`${(props.langKey === "en") ? '/zh' : ''}/${props.slug}`}>
      <Wrapper>
        {
          (props.langKey === "en")
          ? "中文"
          : "English"
        }
      </Wrapper>
    </Link>

  )
}

export default LanguageToggle;