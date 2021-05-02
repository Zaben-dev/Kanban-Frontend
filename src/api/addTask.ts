import axios from 'axios';
import { TaskData, priority, difficulty } from 'src/api/models';

const parseTask = (task: TaskData): TaskData => {
  return {
    id: +task.id,
    title: task.title + '',
    description: task.description + '',
    priority: task.priority as priority,
    difficulty: task.difficulty as difficulty,
    columnId: +task.columnId,
    position: +task.position,
    rowId: +task.rowId,
  };
};

const addTask = async (
  title: string,
  description: string,
  priority: priority,
  difficulty: difficulty,
  columnId: number,
  rowId: number
): Promise<TaskData> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/Tasks/', {
      title,
      description,
      priority,
      difficulty,
      columnId,
      rowId,
    });
    return parseTask(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addTask;
