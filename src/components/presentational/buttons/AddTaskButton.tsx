import React from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';

const StyledAddButton = styled.button`
  background-color: #008cba;
  border: none;
  outline: none;
  color: white;
  padding: 2px 20px;
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

const StyledAddIcon = styled(Add)`
  color: white;
  padding-bottom: 5px;
  padding-left: 4px;
`;

interface Props {
  openModal: () => void;
}

const AddTaskButton: React.FunctionComponent<Props> = ({ openModal }) => {
  return (
    <StyledAddButton onClick={openModal}>
      add task
      <StyledAddIcon size="27">
        <Add />
      </StyledAddIcon>
    </StyledAddButton>
  );
};

export default AddTaskButton;
