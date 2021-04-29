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
    id: Number(column.id),
    name: String(column.name),
    limit: column.limit === null ? null : Number(column.limit),
  }));
  return parsedColumns;
};

const parseTasks = (tasks: TaskData[]): TaskData[] => {
  const parsedTasks = tasks.map((task: TaskData) => ({
    id: Number(task.id),
    title: String(task.title),
    description: String(task.description),
    priority: String(task.priority) as priority,
    difficulty: String(task.difficulty) as difficulty,
    rowId: Number(task.rowId),
    columnId: Number(task.columnId),
    position: Number(task.position),
  }));
  return parsedTasks;
};

const parseRows = (tasks: any): any => {
  const parsedRows = tasks.map((row: rowData) => ({
    id: Number(row.id),
    name: String(row.name),
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
        console.log(row.id);
        return task.columnId === column.id && task.rowId === row.id;
      }),
    })),
  }));
  console.log(boardData);
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
