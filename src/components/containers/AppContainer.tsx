import { useState, useEffect, useCallback } from 'react';
import { ColumnData, TaskData } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import getTasks from 'src/api/getTasks';
import Column from 'src/components/presentational/Column';
import columnsContext from 'src/contexts/columnsContext';
import tasksContext from 'src/contexts/tasksContext';
import App from 'src/components/presentational/App';
import { SpinnerComponent } from 'react-element-spinner';

const AppContainer = () => {
  const [columns, setColumns] = useState<ColumnData[] | null>(null);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);

  const getAppData = useCallback(async (): Promise<void> => {
    try {
      const columns = await getColumns();
      setColumns(columns);
      const tasks = await getTasks();
      setTasks(tasks);
    } catch {
      return window.location.reload();
    }
  }, []);

  useEffect(() => {
    getAppData();
  }, [getAppData]);

  if (columns === null || tasks === null) {
    return (
      <SpinnerComponent loading={true} position="global" color="#008cba" />
    );
  } else {
    return (
      <columnsContext.Provider value={{ columns, setColumns }}>
        <App>
          <tasksContext.Provider value={{ tasks, setTasks }}>
            {columns.map((column, index) => (
              <Column
                key={index}
                id={column.id}
                name={column.name}
                limit={column.limit}
              />
            ))}
          </tasksContext.Provider>
        </App>
      </columnsContext.Provider>
    );
  }
};

export default AppContainer;
