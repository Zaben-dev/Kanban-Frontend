import React from 'react';
import { SpinnerComponent } from 'react-element-spinner';
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
  width: 120px;
  height: 30px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #0083af;
  }
`;

const StyledDeleteIcon = styled(DeleteOutline)`
  padding-bottom: 4px;
`;

interface Props {
  handleDelete: () => void;
  isLoading: boolean;
}

const DeleteColumn: React.FunctionComponent<Props> = ({
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <SpinnerComponent loading={isLoading} position="global" />
      <StyledDeleteButton onClick={handleDelete}>
        delete
        <StyledDeleteIcon size="22" />
      </StyledDeleteButton>
    </>
  );
};

export default DeleteColumn;
