import styled from '@emotion/styled';

const PostFullFoot = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default PostFullFoot;
