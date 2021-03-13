import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ColumnData } from 'src/api/models';

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
  return <Container>{children}</Container>;
};

export default App;
