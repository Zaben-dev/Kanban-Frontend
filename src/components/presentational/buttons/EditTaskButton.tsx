import React from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/boxicons-regular/Edit';

const StyledEditButton = styled.button`
  background-color: #008cba;
  border: none;
  outline: none;
  color: white;
  padding: 2px 20px;
  text-align: center;
  width: 140px;
  height: 30px;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #0083af;
  }
`;

const StyledEditIcon = styled(Edit)`
  padding-bottom: 3px;
`;

interface Props {
  openModal: () => void;
}

const EditTaskButton: React.FunctionComponent<Props> = ({ openModal }) => {
  return (
    <StyledEditButton onClick={openModal}>
      edit task <StyledEditIcon size="23" />
    </StyledEditButton>
  );
};

export default EditTaskButton;
