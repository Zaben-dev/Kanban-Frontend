import React from 'react';
import AddTask from 'src/components/logic/AddTask';
import DeleteRow from 'src/components/logic/DeleteRow';
import EditRow from 'src/components/logic/EditRow';
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
  right: 36px;
  top: 7px;
  opacity: 1;
  overflow: visible;
`;

const StyledMenuButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const StyledIcon = styled(DotsHorizontalRounded)`
  color: #1a5669;
`;

interface props {
  isActive: boolean;
  onClick: () => void;
}

const RowMenu: React.FunctionComponent<props> = ({ isActive, onClick }) => {
  return (
    <StyledContainer>
      <StyledMenuButton onClick={onClick}>
        <StyledIcon size="26" />
      </StyledMenuButton>
      <StyledMenu isActive={isActive}>
        <AddTask />
        <EditRow />
        <DeleteRow />
      </StyledMenu>
    </StyledContainer>
  );
};

export default RowMenu;
