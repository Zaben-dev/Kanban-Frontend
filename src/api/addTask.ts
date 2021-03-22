import axios from 'axios';
import { TaskData, priority, difficulty } from 'src/api/models';

const parseTask = (task: TaskData): TaskData => {
  return {
    id: Number(task.id),
    title: String(task.title),
    description: String(task.description),
    priority: String(task.priority) as priority,
    difficulty: String(task.difficulty) as difficulty,
    columnId: Number(task.column_id),
    position: Number(task.position),
  };
};

const addTask = async (
  title: string,
  description: string,
  priority: priority,
  difficulty: difficulty,
  column_id: number
): Promise<TaskData> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/Tasks/', {
      title,
      description,
      priority,
      difficulty,
      column_id,
    });
    return parseTask(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addTask;
