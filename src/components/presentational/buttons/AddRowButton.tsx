import React from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';

const StyledAddButton = styled.button`
  margin-left: 7px;
  margin-top: 9px;
  background-color: #008cba;
  border: none;
  outline: none;
  color: #ffffff;
  padding: 9px 13px 6px 18px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #0083af;
  }
`;

const StyledAddIcon = styled(Add)`
  color: white;
  padding-bottom: 3px;
  padding-left: 4px;
`;

interface Props {
  openModal: () => void;
}

const AddColumnButton: React.FunctionComponent<Props> = ({ openModal }) => {
  return (
    <StyledAddButton onClick={openModal}>
      add row
      <StyledAddIcon size="28" />
    </StyledAddButton>
  );
};

export default AddColumnButton;
