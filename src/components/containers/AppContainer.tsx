import { useState, useEffect } from 'react';
import { ColumnData } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import Column from 'src/components/presentational/Column';
import columnsContext from 'src/utils/columnsContext';
import App from 'src/components/presentational/App';
import { SpinnerComponent } from 'react-element-spinner';

const AppContainer = () => {
  const [columns, setColumns] = useState<ColumnData[] | null>(null);

  useEffect(() => {
    getColumns().then((columns: ColumnData[] | null) => {
      setColumns(columns);
    });
  }, []);

  if (columns === null) {
    return (
      <SpinnerComponent loading={true} position="global" color="#008cba" />
    );
  } else {
    return (
      <columnsContext.Provider value={{ columns, setColumns }}>
        <App>
          {columns.map((column, index) => (
            <Column
              key={index}
              id={column.id}
              name={column.name}
              limit={column.limit}
            />
          ))}
        </App>
      </columnsContext.Provider>
    );
  }
};

export default AppContainer;
