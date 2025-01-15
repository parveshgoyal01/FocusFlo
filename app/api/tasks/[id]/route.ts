import { readTasks, writeTasks, Task } from '@/lib/fileHandler';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const tasks = readTasks();
  const body: Partial<Task> = await req.json();
  const updatedTasks = tasks.map(task => task.id === params.id ? { ...task, ...body } : task);
  writeTasks(updatedTasks);
  return NextResponse.json({ message: 'Task updated' });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const tasks = readTasks();
  const filteredTasks = tasks.filter(task => task.id !== params.id);
  writeTasks(filteredTasks);
  return NextResponse.json({ message: 'Task deleted' });
}

