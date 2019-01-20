import * as React from 'react';
import styled from '@emotion/styled';

const PostFullFoot = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 3vw 0 6vw 0;
  max-width: 840px;

  @media (max-width: 900px) {
    margin: 0 20px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const PostFullFooter: React.FunctionComponent = props => (
  <PostFullFoot>{props.children}</PostFullFoot>
);

export default PostFullFooter;
