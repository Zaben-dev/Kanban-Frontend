import { boardData, ColumnData } from 'src/api/models';

const findColumnIndex = (
  currentColumnId: number,
  boardData: boardData[]
): number => {
  const columnIndex = boardData.findIndex(
    (column: ColumnData) => column.id === currentColumnId
  );
  return columnIndex;
};

export default findColumnIndex;
