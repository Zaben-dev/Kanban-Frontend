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

export interface ColumnData {
  id: number;
  name: string;
  limit: number | null;
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: priority;
  difficulty: difficulty;
  columnId: number;
  rowId?: number;
  position: number;
}

export interface rowData {
  id: number;
  name: string;
  tasks: TaskData[];
}

export interface boardData {
  id: number;
  name: string;
  limit: number | null;
  rows: rowData[];
}
