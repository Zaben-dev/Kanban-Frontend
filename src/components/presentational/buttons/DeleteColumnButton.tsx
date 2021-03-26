import React from 'react';
import styled from 'styled-components';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';

const StyledDeleteButton = styled.button`
  background-color: #008cba;
  margin-top: 2px;
  border: none;
  outline: none;
  color: white;
  padding: 4px 20px;
  text-align: center;
  width: 160px;
  height: 30px;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #0083af;
  }
`;

const StyledDeleteIcon = styled(DeleteOutline)`
  padding-bottom: 4px;
`;

interface Props {
  openModal: () => void;
}

const DeleteColumnButton: React.FunctionComponent<Props> = ({ openModal }) => {
  return (
    <StyledDeleteButton onClick={openModal}>
      delete column
      <StyledDeleteIcon size="24" />
    </StyledDeleteButton>
  );
};

export default DeleteColumnButton;
