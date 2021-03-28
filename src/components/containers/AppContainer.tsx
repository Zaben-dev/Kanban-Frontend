import { useState, useEffect, useCallback } from 'react';
import { boardData } from 'src/api/models';
import getBoardData from 'src/api/getBoardData';
import Column from 'src/components/presentational/Column';
import boardDataContext from 'src/contexts/boardDataContext';
import App from 'src/components/presentational/App';
import { SpinnerComponent } from 'react-element-spinner';

const AppContainer = () => {
  const [boardData, setBoardData] = useState<boardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAppData = useCallback(async (): Promise<void> => {
    try {
      const boardData = await getBoardData();
      setBoardData(boardData);
      setIsLoading(false);
    } catch {
      return window.location.reload();
    }
  }, []);

  useEffect(() => {
    getAppData();
  }, [getAppData]);

  if (isLoading === true) {
    return (
      <SpinnerComponent loading={true} position="global" color="#008cba" />
    );
  } else {
    return (
      <boardDataContext.Provider value={{ boardData, setBoardData }}>
        <App>
          {boardData.map((column, index) => (
            <Column
              key={index}
              id={column.id}
              name={column.name}
              limit={column.limit}
            />
          ))}
        </App>
      </boardDataContext.Provider>
    );
  }
};

export default AppContainer;
