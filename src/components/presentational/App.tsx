import React, { ReactNode } from 'react';
import styled from 'styled-components';
import AddColumnContainer from 'src/components/containers/AddColumnContainer';

const StyledContainer = styled.div`
  display: flex;
  margin-top: 18px;
  margin-left: 20px;
  height: 90vh;
`;

interface Props {
  children: ReactNode;
}

const App: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <AddColumnContainer /> <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default App;
