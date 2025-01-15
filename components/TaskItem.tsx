interface TaskItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggle(task.id, task.completed)}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

