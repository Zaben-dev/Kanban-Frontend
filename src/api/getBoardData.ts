import axios from 'axios';
import {
  ColumnData,
  TaskData,
  boardData,
  priority,
  difficulty,
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
    columnId: Number(task.columnId),
    position: Number(task.position),
  }));
  return parsedTasks;
};

const parseBoardData = (
  columns: ColumnData[],
  tasks: TaskData[]
): boardData[] => {
  const boardData = columns.map((column) => ({
    ...column,
    tasks: tasks.filter((tasks) => tasks.columnId === column.id),
  }));
  return boardData;
};

const getBoardData = async (): Promise<boardData[]> => {
  try {
    const columnsResponse = await axios.get('http://127.0.0.1:8000/Columns/');
    const tasksResponse = await axios.get('http://127.0.0.1:8000/Tasks/');
    const parsedColumns = parseColumns(columnsResponse.data);
    const parsedTasks = parseTasks(tasksResponse.data);
    const boardData = parseBoardData(parsedColumns, parsedTasks);
    return boardData;
  } catch {
    return [];
  }
};

export default getBoardData;
