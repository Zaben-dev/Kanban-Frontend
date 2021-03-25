import React from 'react';
import styled from 'styled-components';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';
import Modal from 'react-modal';

const StyledDeleteButton = styled.button`
  background-color: #008cba;
  margin-top: 2px;
  border: none;
  outline: none;
  color: white;
  padding: 4px 20px;
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

const StyledModal = styled(Modal)`
  margin-top: 130px;
  width: 500px;
  height: 215px;
  margin-left: auto;
  margin-right: auto;
  background-color: #b4e1ff;
  border: none;
  outline: none;
`;

const StyledDeleteIcon = styled(DeleteOutline)`
  padding-bottom: 4px;
`;

const StyledText = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

const StyledCloseButton = styled.button`
  margin-top: 50px;
  margin-left: 125px;
  margin-right: 80px;
  background-color: #f35f5f;
  border: none;
  outline: none;
  color: white;
  padding: 9px 18px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: #e95656;
  }
`;

const StyledSubmitButton = styled.button`
  margin-top: 50px;
  background-color: #cf4141;
  border: none;
  outline: none;
  color: white;
  padding: 9px 18px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: #c43c3c;
  }
`;

interface Props {
  handleDelete: () => void;
  closeModal: () => void;
  openModal: () => void;
  taskTitle: string;
  modalIsOpen: boolean;
}

const DeleteTask: React.FunctionComponent<Props> = ({
  handleDelete,
  modalIsOpen,
  closeModal,
  openModal,
  taskTitle,
}) => {
  return (
    <>
      <StyledDeleteButton onClick={openModal}>
        delete task
        <StyledDeleteIcon size="24" />
      </StyledDeleteButton>
      <StyledModal isOpen={modalIsOpen}>
        <StyledText>
          Are you sure you want to delete task {taskTitle}?
        </StyledText>
        <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        <StyledSubmitButton onClick={handleDelete}>Delete</StyledSubmitButton>
      </StyledModal>
    </>
  );
};

export default DeleteTask;
