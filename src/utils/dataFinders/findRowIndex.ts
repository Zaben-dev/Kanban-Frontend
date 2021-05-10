import { boardData, ColumnData, rowData } from 'src/api/models';

const findRowIndex = (
  currentColumnId: number,
  currentRowId: number,
  boardData: boardData[]
): number => {
  const columnIndex = boardData.findIndex(
    (column: ColumnData) => column.id === currentColumnId
  );

  const rowIndex = boardData[columnIndex].rows.findIndex(
    (row: rowData) => row.id === currentRowId
  );

  return rowIndex;
};

export default findRowIndex;
