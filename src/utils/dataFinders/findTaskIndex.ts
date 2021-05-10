import { boardData, ColumnData, rowData } from 'src/api/models';

const findTaskIndex = (
  currentColumnId: number,
  currentRowId: number,
  currentTaskId: number,
  boardData: boardData[]
): number => {
  const columnIndex = boardData.findIndex(
    (column: ColumnData) => column.id === currentColumnId
  );

  const rowIndex = boardData[columnIndex].rows.findIndex(
    (row: rowData) => row.id === currentRowId
  );

  const taskIndex = boardData[columnIndex].rows[rowIndex].tasks.findIndex(
    (task) => task.id === currentTaskId
  );

  return taskIndex;
};

export default findTaskIndex;
