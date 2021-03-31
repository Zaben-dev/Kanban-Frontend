import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

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

const StyledText = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
  margin-left: 15px;
  margin-right: 15px;
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
  name: string;
  modalIsOpen: boolean;
}

const DeleteConfirmation: React.FunctionComponent<Props> = ({
  handleDelete,
  modalIsOpen,
  closeModal,
  name,
}) => {
  return (
    <>
      <StyledModal isOpen={modalIsOpen}>
        <StyledText>Are you sure you want to delete {name}?</StyledText>
        <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        <StyledSubmitButton onClick={handleDelete}>Delete</StyledSubmitButton>
      </StyledModal>
    </>
  );
};

export default DeleteConfirmation;
