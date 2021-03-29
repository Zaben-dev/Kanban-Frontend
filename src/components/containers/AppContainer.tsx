import { useState, useEffect, useCallback } from 'react';
import { boardData } from 'src/api/models';
import getBoardData from 'src/api/getBoardData';
import Column from 'src/components/presentational/Column';
import boardDataContext from 'src/contexts/boardDataContext';
import App from 'src/components/presentational/App';
import { SpinnerComponent } from 'react-element-spinner';
import { DragDropContext, BeforeCapture } from 'react-beautiful-dnd';
import newNotification from 'src/utils/newNotification';
import moveTask from 'src/api/moveTask';

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

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceColumnIndex = (): number =>
      boardData.findIndex(
        (column) => column.id === Number(result.source.droppableId)
      );

    const destinationColumnIndex = (): number =>
      boardData.findIndex(
        (column) => column.id === Number(result.destination.droppableId)
      );

    if (
      boardData[destinationColumnIndex()].tasks.length ===
      boardData[destinationColumnIndex()].limit
    ) {
      newNotification("Can't add more than column's task limit.");
      return;
    }

    const task = boardData[sourceColumnIndex()].tasks[result.source.index];
    let newBoardData = [...boardData];
    let newSourceTasks = [
      ...boardData[sourceColumnIndex()].tasks.slice(0, result.source.index),
      ...newBoardData[sourceColumnIndex()].tasks.slice(result.source.index + 1),
    ];
    newBoardData[sourceColumnIndex()].tasks = newSourceTasks;

    for (
      let i = result.source.index;
      i < boardData[sourceColumnIndex()].tasks.length;
      i++
    ) {
      newBoardData[sourceColumnIndex()].tasks[i].position--;
    }

    let newDestinationTasks = [
      ...boardData[destinationColumnIndex()].tasks.slice(
        0,
        result.destination.index
      ),
      task,
      ...newBoardData[destinationColumnIndex()].tasks.slice(
        result.destination.index
      ),
    ];

    for (
      let i = result.destination.index;
      i < boardData[destinationColumnIndex()].tasks.length;
      i++
    ) {
      newBoardData[destinationColumnIndex()].tasks[i].position++;
    }

    newBoardData[destinationColumnIndex()].tasks = newDestinationTasks;

    newBoardData[destinationColumnIndex()].tasks[
      result.destination.index
    ].position = result.destination.index + 1;

    setBoardData(newBoardData);

    try {
      await moveTask(
        task.id,
        task.title,
        task.description,
        result.destination.droppableId,
        Number(result.destination.index) + 1
      );
    } catch {
      const boardData = await getBoardData();
      setBoardData(boardData);
      newNotification('Sorry, something went wrong.');
    }
  };

  if (isLoading === true) {
    return (
      <SpinnerComponent loading={true} position="global" color="#008cba" />
    );
  } else {
    return (
      <boardDataContext.Provider value={{ boardData, setBoardData }}>
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </boardDataContext.Provider>
    );
  }
};

export default AppContainer;
