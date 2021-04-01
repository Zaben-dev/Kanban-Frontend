import axios from 'axios';
import { TaskData, priority, difficulty } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const parseTask = (task: TaskData): TaskData => {
  return {
    id: Number(task.id),
    title: String(task.title),
    description: String(task.description),
    priority: String(task.priority) as priority,
    difficulty: String(task.difficulty) as difficulty,
    columnId: Number(task.columnId),
    position: Number(task.position),
  };
};

const addTask = async (
  title: string,
  description: string,
  priority: priority,
  difficulty: difficulty,
  columnId: number
): Promise<TaskData> => {
  try {
    const response = await axios.post(DOMAIN + '/Tasks/', {
      title,
      description,
      priority,
      difficulty,
      columnId,
    });
    return parseTask(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addTask;
