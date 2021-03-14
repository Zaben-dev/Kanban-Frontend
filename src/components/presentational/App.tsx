import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ColumnData } from 'src/api/models';
import AddColumnContainer from 'src/components/containers/AddColumnContainer';

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  height: 90vh;
`;

interface Props {
  children: ReactNode;
}

const App: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <AddColumnContainer /> <Container>{children}</Container>
    </>
  );
};

export default App;
