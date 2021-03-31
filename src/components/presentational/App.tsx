import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import AddColumnContainer from 'src/components/containers/AddColumnContainer';
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
      <AddColumnContainer /> <StyledContainer>{children}</StyledContainer>{' '}
      <ToastContainer />
    </>
  );
};

export default App;
