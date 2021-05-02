import axios from 'axios';
import {
  ColumnData,
  TaskData,
  boardData,
  priority,
  difficulty,
  rowData,
} from 'src/api/models';

const parseColumns = (columns: ColumnData[]): ColumnData[] => {
  const parsedColumns = columns.map((column) => ({
    id: +column.id,
    name: column.name + '',
    limit: column.limit === null ? null : +column.limit,
  }));
  return parsedColumns;
};

const parseTasks = (tasks: TaskData[]): TaskData[] => {
  const parsedTasks = tasks.map((task: TaskData) => ({
    id: +task.id,
    title: task.title + '',
    description: task.description + '',
    priority: task.priority as priority,
    difficulty: task.difficulty as difficulty,
    rowId: +task.rowId,
    columnId: +task.columnId,
    position: +task.position,
  }));
  return parsedTasks;
};

const parseRows = (tasks: any): any => {
  const parsedRows = tasks.map((row: rowData) => ({
    id: +row.id,
    name: row.name + '',
  }));
  return parsedRows;
};

const parseBoardData = (
  columns: ColumnData[],
  tasks: TaskData[],
  rows: any
): boardData[] => {
  const boardData = columns.map((column) => ({
    ...column,
    rows: rows.map((row: any) => ({
      ...row,
      tasks: tasks.filter((task) => {
        return task.columnId === column.id && task.rowId === row.id;
      }),
    })),
  }));
  return boardData;
};

const getBoardData = async (): Promise<boardData[]> => {
  try {
    const columnsResponse = await axios.get('http://127.0.0.1:8000/Columns/');
    const tasksResponse = await axios.get('http://127.0.0.1:8000/Tasks/');
    const rowsResponse = await axios.get('http://127.0.0.1:8000/Rows/');
    const parsedColumns = parseColumns(columnsResponse.data);
    const parsedTasks = parseTasks(tasksResponse.data);
    const parsedRows = parseRows(rowsResponse.data);
    const boardData = parseBoardData(parsedColumns, parsedTasks, parsedRows);

    return boardData;
  } catch {
    return [];
  }
};

export default getBoardData;
