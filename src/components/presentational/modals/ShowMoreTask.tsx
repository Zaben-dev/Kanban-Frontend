import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledModal = styled(Modal)`
  margin-top: 130px;
  width: 500px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  background-color: #b4e1ff;
  border: none;
  outline: none;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 80px 265px 45px;
  grid-row-gap: 15px;
`;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  margin-left: 60px;
  margin-right: 60px;
  word-break: break-all;
  padding-top: 15px;
  word-break: break-word;
`;

const StyledDescription = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  word-break: break-word;
`;

const StyledCloseButton = styled.button`
  height: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: #f35f5f;
  border: none;
  outline: none;
  color: white;
  padding: 6px 19px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: #e95656;
  }
`;

interface Props {
  closeModal: () => void;
  title: string;
  description: string;
  modalIsOpen: boolean;
}

const ShowMoreTask: React.FunctionComponent<Props> = ({
  modalIsOpen,
  closeModal,
  title,
  description,
}) => {
  return (
    <>
      <StyledModal isOpen={modalIsOpen}>
        <StyledContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
          <StyledCloseButton onClick={closeModal}>close</StyledCloseButton>
        </StyledContainer>
      </StyledModal>
    </>
  );
};

export default ShowMoreTask;
