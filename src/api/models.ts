export interface ColumnData {
  id: number;
  name: string;
  limit: number;
}

export enum priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum difficulty {
  easy = 'easy',
  intermediate = 'intermediate',
  hard = 'hard',
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: priority;
  difficulty: difficulty;
  columnId: number;
}
