import React, { useState, useEffect } from 'react';
import { ColumnData } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import server from 'src/api/mockServer';
import Column from 'src/Column';
import styled from 'styled-components';

server();

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  height: 90vh;
`;

const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[] | null>(null);

  useEffect(() => {
    getColumns().then((columns: ColumnData[] | null) => {
      setColumns(columns);
    });
  }, []);

  if (columns === null) {
    return <div>LOADING...</div>;
  } else {
    return (
      <Container>
        {columns.map((column, index) => (
          <Column
            key={index}
            id={column.id}
            name={column.name}
            limit={column.limit}
          />
        ))}
      </Container>
    );
  }
};

export default App;
