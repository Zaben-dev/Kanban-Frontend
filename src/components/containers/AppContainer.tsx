import React, { useState, useEffect } from 'react';
import { ColumnData } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import server from 'src/api/mockServer';
import Column from 'src/components/presentational/Column';
import styled from 'styled-components';
import columnsContext from 'src/utils/columnsContext';
import App from 'src/components/presentational/App';

server();

const AppContainer: React.FC = () => {
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
      <App>
        <columnsContext.Provider value={{ columns, setColumns }}>
          {columns.map((column, index) => (
            <Column
              key={index}
              id={column.id}
              name={column.name}
              limit={column.limit}
            />
          ))}
        </columnsContext.Provider>
      </App>
    );
  }
};

export default AppContainer;
