import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import AddColumn from 'src/components/logic/columns/AddColumn';
import AddRowContainer from 'src/components/logic/rows/AddRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: 10px;
`;

interface Props {
  children: ReactNode;
}

const App: React.FunctionComponent<Props> = ({ children }) => {
  Modal.setAppElement('#root');
  return (
    <>
      <AddColumn /> <AddRowContainer />{' '}
      <StyledContainer>{children}</StyledContainer> <ToastContainer />
    </>
  );
};

export default App;
