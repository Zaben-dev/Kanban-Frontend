import React from 'react';
import styled from 'styled-components';
import { ColumnData } from 'src/api/models';

const Container = styled.div`
  background-color: rgb(219, 218, 218);
  min-width: 240px;
  margin-left: 20px;
  height: 100%;
  border-radius: 6px;
  box-shadow: 4px 3px rgb(211, 211, 211);
  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Name = styled.div`
  padding-left: 15px;
  margin-top: 8px;
  font-size: 17px;
  font-weight: 400;
`;

const Column: React.FunctionComponent<ColumnData> = ({ id, name, limit }) => {
  return (
    <Container>
      <Name>{name}</Name>
    </Container>
  );
};

export default Column;
