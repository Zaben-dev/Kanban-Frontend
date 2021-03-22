import React from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import Modal from 'react-modal';
import { SpinnerComponent } from 'react-element-spinner';
import {
  priority as priorityEnum,
  difficulty as difficultyEnum,
} from 'src/api/models';

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

const StyledModal = styled(Modal)`
  margin-top: 10vh;
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
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const StyledDescriptionInput = styled.textarea`
  font-size: 17px;
  padding: 2px 3px;
  font-family: Roboto;
  min-height: 105px;
  max-width: 340px;
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
  isLoading: boolean;
  inputTitle: string;
  inputDescription: string;
  inputPriority: priorityEnum;
  inputDifficulty: difficultyEnum;
  openModal: () => void;
  closeModal: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handlePriorityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: () => void;
}

const AddTask: React.FunctionComponent<Props> = ({
  modalIsOpen,
  isLoading,
  inputTitle,
  inputDescription,
  inputPriority,
  inputDifficulty,
  openModal,
  closeModal,
  handleTitleChange,
  handleDescriptionChange,
  handlePriorityChange,
  handleDifficultyChange,
  handleSubmit,
}) => {
  return (
    <>
      <StyledAddButton onClick={openModal}>
        add task
        <StyledAddIcon size="27">
          <Add />
        </StyledAddIcon>
      </StyledAddButton>
      <StyledModal isOpen={modalIsOpen}>
        <StyledGridContainer>
          <StyledDescription>title:</StyledDescription>
          <StyledTitleInput
            type="text"
            placeholder="add functionality"
            value={inputTitle}
            onChange={handleTitleChange}
          />
          <StyledDescription>description:</StyledDescription>
          <StyledDescriptionInput
            placeholder="functionality that allows to do new things"
            value={inputDescription}
            onChange={handleDescriptionChange}
          />
          <StyledDescription>priority:</StyledDescription>
          <StyledSelect value={inputPriority} onChange={handlePriorityChange}>
            <option value={priorityEnum.Low}>low</option>
            <option value={priorityEnum.Medium}>medium</option>
            <option value={priorityEnum.High}>high</option>
          </StyledSelect>
          <StyledDescription>priority:</StyledDescription>
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
        <SpinnerComponent
          loading={isLoading}
          position="global"
          color="#498DFF"
        />
      </StyledModal>
    </>
  );
};

export default AddTask;
