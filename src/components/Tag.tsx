import React from 'react';
import styled from '@emotion/styled';

const TagItem = styled.a`
  text-decoration: none !important;
  display: block;
  padding: 0 8px;
  margin-right: 10px;
  background-color: ${(props: any) => props.inputColor || 'gray'};
  border-radius: 3rem;
  width: fit-content;
  height: 22px;
  font-weight: 600;
  font-size: 13px;
  line-height: 22px;
  text-transform: uppercase;
  color: white;
  text-align: center;
`;

export interface ITagProps {
  name: string;
}

export const Tag: React.FC<ITagProps> = ({ name }) => {
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const intToRGB = (i: number) => {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();
    console.log(name, i, i & 0x00ffffff);
    return {
      isDark: (i & 0x00ffffff) < 11725151,
      inputColor: '#' + '00000'.substring(0, 6 - c.length) + c,
    };
  };

  const intToHSL = (i: number) => {
    var shortened = i % 360;
    return { inputColor: 'hsl(' + shortened + ',70%,38%)' };
  };

  return <TagItem {...intToHSL(hashCode(name))}>{name}</TagItem>;
};
