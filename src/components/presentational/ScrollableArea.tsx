import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: inline-block;
  margin-top: 4px;
  height: 92%;
  width: 280px;
  padding-left: 3px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-color: #008cba transparent !important;
  scrollbar-width: thin !important;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #008cba;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

interface Props {
  children: ReactNode;
}

const ScrollableArea: React.FunctionComponent<Props> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default ScrollableArea;
