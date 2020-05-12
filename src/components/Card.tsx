import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';
import ChatIcon from './icons/chat';

const CardWrapper = styled.div`
  width: 50%;
  display: inline-block;
  height: 318px;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  background: ${colors.backgroundgray};
  padding: 53px 20px;
  margin: 36px 0;
  width: 48%;
  max-height: 440px;
  @media (max-width: 950px) {
    flex-direction: column;
    width: 100%;
    margin: 30px 50px;
  }
  /* @media (max-width: 1270px) {
    max-width: 400px;
  }
  @media (max-width: 1070px) {
    max-width: 300px;
  } */
`;

const CardDescription = styled.div`
  font-family: Sarala;
  font-size: 26px;
  line-height: 36px;
  @media (max-width: 420px) {
    font-size: 20px;
    line-height: 30px;
  }
`;

const Icon = styled.div`
  position: absolute;
  z-index: 10;
  left: 19px;
  top: -43px;
`;

export interface ICard {
  text: string;
}

const CardComponent: React.FC<ICard> = ({ text }) => {
  const maxLength = 220;
  const sentenceCutter = (sentence = '') =>
    sentence.length > maxLength ? sentence.substr(0, maxLength) + '...' : sentence;
  console.log(text, sentenceCutter(text));
  return (
    <Card>
      <Icon>
        <ChatIcon />
      </Icon>
      <CardDescription>{sentenceCutter(text)}</CardDescription>
    </Card>
  );
};

export default CardComponent;
