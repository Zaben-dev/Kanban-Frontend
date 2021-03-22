import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { SpinnerComponent } from 'react-element-spinner';
import { Add } from '@styled-icons/ionicons-outline/Add';

const StyledAddButton = styled.button`
  margin-left: 40px;
  margin-top: 20px;
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

const StyledModal = styled(Modal)`
  margin-top: 10vh;
  width: 500px;
  height: 280px;
  margin-left: auto;
  margin-right: auto;
  background-color: #b4e1ff;
  border: none;
  outline: none;
`;

const StyledGridContainer = styled.div`
  display: grid;
  width: 90%;
  height: 160px;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 100px 350px;
  grid-template-rows: 30px 30px;
  grid-row-gap: 50px;
`;

const StyledDescription = styled.div`
  line-height: 30px;
`;

const StyledTextInput = styled.input`
  font-size: 17px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const StyledNumberInput = styled.input`
  font-size: 17px;
  width: 15%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const StyledCloseButton = styled.button`
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
  background-color: #008cba;
  border: none;
  outline: none;
  color: white;
  padding: 9px 18px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: #007da7;
  }
`;

interface Props {
  handleSubmit: () => void;
  openModal: () => void;
  closeModal: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  modalIsOpen: boolean;
  inputName: string;
  inputLimit: number;
  isLoading: boolean;
}

const AddColumn: React.FunctionComponent<Props> = ({
  handleSubmit,
  openModal,
  modalIsOpen,
  closeModal,
  inputName,
  handleNameChange,
  inputLimit,
  handleLimitChange,
  isLoading,
}) => {
  Modal.setAppElement('#root');
  return (
    <>
      <StyledAddButton onClick={openModal}>
        add column
        <StyledAddIcon size="28" />
      </StyledAddButton>
      <StyledModal isOpen={modalIsOpen}>
        <StyledGridContainer>
          <StyledDescription>name:</StyledDescription>
          <StyledTextInput
            type="text"
            placeholder="To do"
            value={inputName}
            onChange={handleNameChange}
          />
          <StyledDescription>tasks limit:</StyledDescription>
          <StyledNumberInput
            type="number"
            value={inputLimit}
            onChange={handleLimitChange}
            min="0"
          />
        </StyledGridContainer>
        <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        <StyledSubmitButton onClick={handleSubmit}>submit</StyledSubmitButton>
        <SpinnerComponent
          loading={isLoading}
          position="global"
          color="#498DFF"
        />
      </StyledModal>
    </>
  );
};

export default AddColumn;
