import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MenuOutline } from '@styled-icons/evaicons-outline/MenuOutline';
import DeleteColumn from 'src/components/logic/DeleteColumn';
import EditColumn from 'src/components/logic/EditColumn';

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
  z-index: 1;
`;

const StyledMenuButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  font-size: 25px;
`;

const StyledIcon = styled(MenuOutline)`
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
        <StyledIcon size="32" />
      </StyledMenuButton>
      <StyledMenu isActive={isActive}>
        <EditColumn />
        <DeleteColumn />
      </StyledMenu>
    </StyledContainer>
  );
};

export default ColumnMenu;
