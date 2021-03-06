import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {
  priority as priorityEnum,
  difficulty as difficultyEnum,
} from 'src/api/models';

const StyledModal = styled(Modal)`
  margin-top: 130px;
  width: 500px;
  height: 480px;
  margin-left: auto;
  margin-right: auto;
  background-color: #b4e1ff;
  border: none;
  outline: none;
`;

const StyledGridContainer = styled.div`
  display: grid;
  width: 90%;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 100px 350px;
  grid-template-rows: 30px 115px 30px 30px;
  grid-row-gap: 35px;
  margin-bottom: 60px;
`;

const StyledDescription = styled.div`
  line-height: 30px;
`;

const StyledTitleInput = styled.input`
  font-size: 17px;
  width: 335px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const StyledCharactersLimit = styled.div`
  margin-top: 5px;
`;

const StyledDescriptionInput = styled.textarea`
  font-size: 17px;
  padding: 2px 3px;
  font-family: Roboto;
  min-height: 105px;
  width: 335px;
  border: 1px solid #ccc;
  border-radius: 4px;

  resize: none;
`;

const StyledSelect = styled.select`
  display: block;
  font-size: 17px;
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

const StyledCloseButton = styled.button`
  margin-left: 135px;
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

interface Props {
  modalIsOpen: boolean;
  inputTitle: string;
  inputDescription: string;
  inputPriority: priorityEnum;
  inputDifficulty: difficultyEnum;
  closeModal: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handlePriorityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: () => void;
}

const TaskDataForm: React.FunctionComponent<Props> = ({
  modalIsOpen,
  inputTitle,
  inputDescription,
  inputPriority,
  inputDifficulty,
  closeModal,
  handleTitleChange,
  handleDescriptionChange,
  handlePriorityChange,
  handleDifficultyChange,
  handleSubmit,
}) => {
  return (
    <>
      <StyledModal isOpen={modalIsOpen}>
        <StyledGridContainer>
          <StyledDescription>title:</StyledDescription>
          <div>
            <StyledTitleInput
              type="text"
              placeholder="add functionality"
              value={inputTitle}
              onChange={handleTitleChange}
            />
            <StyledCharactersLimit>
              {inputTitle.length > 54 && inputTitle.length + '/70'}
            </StyledCharactersLimit>
          </div>
          <StyledDescription>description:</StyledDescription>
          <div>
            <StyledDescriptionInput
              placeholder="functionality that allows to do new things"
              value={inputDescription}
              onChange={handleDescriptionChange}
            />
            <StyledCharactersLimit>
              {inputDescription.length > 350 &&
                inputDescription.length + '/400'}
            </StyledCharactersLimit>
          </div>
          <StyledDescription>priority:</StyledDescription>
          <StyledSelect value={inputPriority} onChange={handlePriorityChange}>
            <option value={priorityEnum.Low}>low</option>
            <option value={priorityEnum.Medium}>medium</option>
            <option value={priorityEnum.High}>high</option>
          </StyledSelect>
          <StyledDescription>difficulty:</StyledDescription>
          <StyledSelect
            value={inputDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value={difficultyEnum.Easy}>easy</option>
            <option value={difficultyEnum.Intermediate}>intermediate</option>
            <option value={difficultyEnum.Hard}>hard</option>
          </StyledSelect>
        </StyledGridContainer>
        <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        <StyledSubmitButton onClick={handleSubmit}>submit</StyledSubmitButton>
      </StyledModal>
    </>
  );
};

export default TaskDataForm;
