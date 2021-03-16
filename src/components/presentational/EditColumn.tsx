import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { SpinnerComponent } from 'react-element-spinner';
import { Edit } from '@styled-icons/boxicons-regular/Edit';

const StyledEditButton = styled.button`
  background-color: #008cba;
  border: none;
  outline: none;
  color: white;
  padding: 4px 20px;
  text-align: center;
  width: 120px;
  height: 30px;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background: #0083af;
  }
`;

const StyledEditIcon = styled(Edit)`
  padding-bottom: 5px;
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
`;

interface Props {
  handleSubmit: () => void;
  openModal: () => void;
  closeModal: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  modalIsOpen: boolean;
  inputNameValue: string;
  inputLimitValue: number;
  isLoading: boolean;
}

const EditColumn: React.FunctionComponent<Props> = ({
  handleSubmit,
  openModal,
  modalIsOpen,
  closeModal,
  inputNameValue,
  handleNameChange,
  inputLimitValue,
  handleLimitChange,
  isLoading,
}) => {
  Modal.setAppElement('#root');
  return (
    <>
      <StyledEditButton onClick={openModal}>
        edit <StyledEditIcon size="21" />
      </StyledEditButton>
      <StyledModal isOpen={modalIsOpen}>
        <StyledGridContainer>
          <StyledDescription>name:</StyledDescription>
          <StyledTextInput
            type="text"
            value={inputNameValue}
            onChange={handleNameChange}
          />
          <StyledDescription>tasks limit:</StyledDescription>
          <StyledNumberInput
            type="number"
            value={inputLimitValue}
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

export default EditColumn;
