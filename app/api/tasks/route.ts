import { readTasks, writeTasks, Task } from '@/lib/fileHandler';
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = readTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const tasks = readTasks();
  const body: Partial<Task> = await req.json();
  const newTask: Task = { id: Date.now().toString(), text: body.text || '', completed: false };
  tasks.push(newTask);
  writeTasks(tasks);
  return NextResponse.json(newTask, { status: 201 });
}

