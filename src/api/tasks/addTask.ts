import axios from 'axios';
import { TaskData, priority, difficulty } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

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
    const response = await axios.post(DOMAIN + '/Tasks/', {
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
