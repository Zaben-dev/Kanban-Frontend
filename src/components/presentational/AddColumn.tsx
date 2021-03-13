import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  margin-top: 10vh;
  width: 500px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(219, 218, 218);
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
}

const AddColumn: React.FunctionComponent<Props> = ({
  handleSubmit,
  openModal,
  modalIsOpen,
  closeModal,
  inputNameValue,
  handleNameChange,
  inputLimitValue,
  handleLimitChange,
}) => {
  Modal.setAppElement('#root');
  return (
    <>
      <button onClick={openModal}>add</button>
      <StyledModal isOpen={modalIsOpen}>
        <button onClick={closeModal}>close</button>
        <input type="text" value={inputNameValue} onChange={handleNameChange} />
        <input
          type="number"
          value={inputLimitValue}
          onChange={handleLimitChange}
          min="0"
        />
        <button onClick={handleSubmit}>submit</button>
      </StyledModal>
    </>
  );
};

export default AddColumn;
