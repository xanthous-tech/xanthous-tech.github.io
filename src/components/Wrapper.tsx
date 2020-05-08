import * as React from 'react';
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
`;

interface WrapperProps {
  className?: string;
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ children, className }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

export default Wrapper;
