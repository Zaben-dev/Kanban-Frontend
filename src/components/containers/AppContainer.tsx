import { useState, useEffect, useCallback } from 'react';
import { boardData } from 'src/api/models';
import getBoardData from 'src/api/getBoardData';
import Column from 'src/components/presentational/Column';
import boardDataContext from 'src/contexts/boardDataContext';
import App from 'src/components/presentational/App';
import { SpinnerComponent } from 'react-element-spinner';
import { DragDropContext } from 'react-beautiful-dnd';
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

  const onDragEnd = async (result: {
    destination?: { droppableId: string; index: number };
    source?: { droppableId: string; index: number };
  }) => {
    if (!result || !result.destination || !result.source) {
      return;
    }
    let sourceIds = result.source?.droppableId.split(',');
    let sourceColumnId = +sourceIds[0];
    let sourceRowId = +sourceIds[1];

    let destinationIds = result.destination?.droppableId.split(',');
    let destinationColumnId = +destinationIds[0];
    let destinationRowId = +destinationIds[1];

    const sourceColumnIndex = (): number =>
      boardData.findIndex((column) => column.id === sourceColumnId);

    const sourceRowIndex = (): number =>
      boardData[sourceColumnIndex()].rows.findIndex(
        (row) => row.id === sourceRowId
      );

    const destinationColumnIndex = (): number =>
      boardData.findIndex((column) => column.id === destinationColumnId);

    const destinationRowIndex = (): number =>
      boardData[destinationColumnIndex()].rows.findIndex(
        (row) => row.id === destinationRowId
      );

    if (
      result.source.droppableId !== result.destination.droppableId &&
      boardData[destinationColumnIndex()].rows[sourceRowIndex()].tasks
        .length === boardData[destinationColumnIndex()].limit
    ) {
      newNotification("Can't add more than row's task limit.");
      return;
    }

    const task =
      boardData[sourceColumnIndex()].rows[sourceRowIndex()].tasks[
        result.source.index
      ];
    let newBoardData = [...boardData];
    let newSourceTasks = [
      ...boardData[sourceColumnIndex()].rows[sourceRowIndex()].tasks.slice(
        0,
        result.source.index
      ),
      ...newBoardData[sourceColumnIndex()].rows[sourceRowIndex()].tasks.slice(
        result.source.index + 1
      ),
    ];
    newBoardData[sourceColumnIndex()].rows[
      sourceRowIndex()
    ].tasks = newSourceTasks;

    for (
      let i = result.source.index;
      i < boardData[sourceColumnIndex()].rows[sourceRowIndex()].tasks.length;
      i++
    ) {
      newBoardData[sourceColumnIndex()].rows[sourceRowIndex()].tasks[i]
        .position--;
    }

    let newDestinationTasks = [
      ...boardData[destinationColumnIndex()].rows[
        destinationRowIndex()
      ].tasks.slice(0, result.destination.index),
      task,
      ...newBoardData[destinationColumnIndex()].rows[
        destinationRowIndex()
      ].tasks.slice(result.destination.index),
    ];

    for (
      let i = result.destination.index;
      i <
      boardData[destinationColumnIndex()].rows[destinationRowIndex()].tasks
        .length;
      i++
    ) {
      newBoardData[destinationColumnIndex()].rows[destinationRowIndex()].tasks[
        i
      ].position++;
    }
    newBoardData[destinationColumnIndex()].rows[
      destinationRowIndex()
    ].tasks = newDestinationTasks;
    newBoardData[destinationColumnIndex()].rows[destinationRowIndex()].tasks[
      result.destination.index
    ].position = result.destination.index + 1;

    setBoardData(newBoardData);

    try {
      await moveTask(
        task.id,
        task.title,
        task.description,
        +destinationRowId,
        +destinationColumnId,
        +result.destination.index + 1
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
