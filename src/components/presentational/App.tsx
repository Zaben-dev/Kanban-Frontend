import React, { ReactNode } from 'react';
import styled from 'styled-components';
import AddColumnContainer from 'src/components/containers/AddColumnContainer';
import { ToastContainer } from 'react-toastify';

const StyledContainer = styled.div`
  display: flex;
  margin-top: 18px;
  margin-left: 20px;
`;

interface Props {
  children: ReactNode;
}

const App: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <AddColumnContainer /> <StyledContainer>{children}</StyledContainer>{' '}
      <ToastContainer />
    </>
  );
};

export default App;
