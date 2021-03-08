import React, { MutableRefObject } from 'react';
import styled, { keyframes } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import DeleteColumnContainer from 'src/components/containers/DeleteColumnContainer';

const Container = styled.div`
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

const Menu = styled.div<MenuProps>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  animation: ${({ isActive }) => isActive && fadeIn} 0.2s linear;
  position: absolute;
  border-radius: 5px;
  box-shadow: 4px 3px rgb(211, 211, 211);
  background-color: white;
  right: 5px;
  opacity: 1;
`;

const MenuButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  font-size: 25px;
  padding-top: 6px;
`;

interface props {
  isActive: boolean;
  dropdownRef: MutableRefObject<null>;
  onClick: () => void;
}

const ColumnMenu: React.FunctionComponent<props> = ({
  isActive,
  dropdownRef,
  onClick,
}) => {
  return (
    <Container>
      <MenuButton onClick={onClick}>
        <GiHamburgerMenu />
      </MenuButton>
      <Menu ref={dropdownRef} isActive={isActive}>
        <DeleteColumnContainer />
      </Menu>
    </Container>
  );
};

export default ColumnMenu;
