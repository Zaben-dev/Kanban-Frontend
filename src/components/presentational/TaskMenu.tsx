import React from 'react';
import DeleteTaskContainer from 'src/components/containers/DeleteTaskContainer';
import styled, { keyframes } from 'styled-components';
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded';

const StyledContainer = styled.div`
  position: relative;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

interface MenuProps {
  isActive: boolean;
}

const StyledMenu = styled.div<MenuProps>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  animation: ${({ isActive }) => isActive && fadeIn} 0.2s linear;
  position: absolute;
  border: 2px solid #b4e1ff;
  background-color: #b4e1ff;
  right: 5px;
  opacity: 1;
`;

const StyledMenuButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding-bottom: 13px;
`;

const StyledIcon = styled(DotsHorizontalRounded)`
  color: #1a5669;
`;

interface props {
  isActive: boolean;
  onClick: () => void;
}

const ColumnMenu: React.FunctionComponent<props> = ({ isActive, onClick }) => {
  return (
    <StyledContainer>
      <StyledMenuButton onClick={onClick}>
        <StyledIcon size="25" />
      </StyledMenuButton>
      <StyledMenu isActive={isActive}>
        <DeleteTaskContainer />
      </StyledMenu>
    </StyledContainer>
  );
};

export default ColumnMenu;
