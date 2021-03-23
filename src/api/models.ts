export interface ColumnData {
  id: number;
  name: string;
  limit: number;
}

export enum priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum difficulty {
  Easy = 'Easy',
  Intermediate = 'Intermediate',
  Hard = 'Hard',
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: priority;
  difficulty: difficulty;
  columnId: number;
  position: number;
}
