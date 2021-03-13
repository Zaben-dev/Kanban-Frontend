import { useState, useEffect } from 'react';
import { ColumnData } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import Column from 'src/components/presentational/Column';
import columnsContext from 'src/utils/columnsContext';
import App from 'src/components/presentational/App';
import AddColumnContainer from 'src/components/containers/AddColumnContainer';

const AppContainer = () => {
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
          <AddColumnContainer />
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
