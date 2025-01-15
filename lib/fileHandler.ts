import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'tasks.json');

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export function readTasks(): Task[] {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);
}

export function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
}

