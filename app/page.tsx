'use client';

import TaskItem from '@/components/TaskItem';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const addTask = async () => {
    if (!taskText.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText })
    });
    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
  };

  return (
    <div className="container">
      <h1>FocusFlo</h1>
      <div className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

