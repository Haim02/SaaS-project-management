export type TaskStatus = 'todo' | 'inprogress' | 'done' ;

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo'|'inprogress'|'done';
  priority?: 'low'|'medium'|'high';
  assigneeName?: string;
  order: number;
  labels?: string[]; 
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
