import axios from 'axios';
import { TaskData, priority, difficulty } from 'src/api/models';

const parseTasks = (tasks: TaskData[]): TaskData[] => {
  const parsedTasks = tasks.map((task) => ({
    id: Number(task.id),
    title: String(task.title),
    description: String(task.description),
    priority: String(task.priority) as priority,
    difficulty: String(task.difficulty) as difficulty,
    columnId: Number(task.columnId),
  }));
  return parsedTasks;
};

const getTasks = async (): Promise<TaskData[] | null> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/Columns/');
    return parseTasks(response.data);
  } catch (e) {
    return null;
  }
};

export default getTasks;
