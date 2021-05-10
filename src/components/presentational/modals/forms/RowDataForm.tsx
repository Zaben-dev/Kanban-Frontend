import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  margin-top: 130px;
  width: 500px;
  height: 170px;
  margin-left: auto;
  margin-right: auto;
  background-color: #b4e1ff;
  border: none;
  outline: none;
`;

const StyledGridContainer = styled.div`
  display: grid;
  width: 90%;
  height: 60px;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 100px 100px 250px;
  grid-template-rows: 30px 30px;
  grid-row-gap: 50px;
`;

const StyledDescription = styled.div`
  line-height: 30px;
  grid-column: 1/2;
`;

const StyledTextInput = styled.input`
  width: 330px;
  font-size: 17px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  grid-column: 2/4;
`;

const StyledCharactersLimit = styled.div`
  margin-top: 5px;
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
  closeModal: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  modalIsOpen: boolean;
  inputName: string;
}

const RowDataForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  modalIsOpen,
  closeModal,
  inputName,
  handleNameChange,
}) => {
  return (
    <>
      <StyledModal isOpen={modalIsOpen}>
        <StyledGridContainer>
          <StyledDescription>name:</StyledDescription>
          <div>
            <StyledTextInput
              type="text"
              placeholder="Backend"
              value={inputName}
              onChange={handleNameChange}
            />
            <StyledCharactersLimit>
              {inputName.length > 29 && inputName.length + '/40'}
            </StyledCharactersLimit>
          </div>
        </StyledGridContainer>
        <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        <StyledSubmitButton onClick={handleSubmit}>submit</StyledSubmitButton>
      </StyledModal>
    </>
  );
};

export default RowDataForm;
