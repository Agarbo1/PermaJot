import { useState, useEffect } from 'react';
import './TaskSidebar.css';

export default function TaskSidebar({ tasks, onToggle }) {
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    setSortedTasks(sorted);
  }, [tasks]);

const handleCheckboxChange = (task) => {
  onToggle(task.id, !task.isCompleted);
};

  const incomplete = sortedTasks.filter(task => !task.isCompleted);
  const completed = sortedTasks.filter(task => task.isCompleted);

  return (
    <aside className="task-sidebar">
      <h3>Tasks</h3>
      <ul>
        {tasks.length === 0 && <p>No tasks yet!</p>}
        {incomplete.length === 0 && completed.length > 0 && <p>All tasks completed!</p>}
        {incomplete.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleCheckboxChange(task)}
              />
              {task.title}
            </label>
          </li>
        ))}
        {completed.length > 0 && <hr />}
        {completed.map(task => (
          <li key={task.id} className="completed-task">
            <label>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleCheckboxChange(task)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
