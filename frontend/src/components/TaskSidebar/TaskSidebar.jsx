import { useState, useMemo } from 'react';

export default function TaskSidebar({ tasks = [], onToggle, onCreate }) {
  const [showInput, setShowInput] = useState(false);
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (description.trim()) {
      onCreate({ description: description.trim() });
      setDescription('');
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setShowInput(false);
    setDescription('');
  };

  const styles = {
    sidebar: {
      width: '300px',
      backgroundColor: '#2e2e2e',
      color: 'white',
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    heading: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    createButton: {
      backgroundColor: '#2f80ed',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '0.3rem 0.75rem',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    inputRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    input: {
      flex: 1,
      padding: '0.3rem 0.5rem',
      fontSize: '0.9rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
    },
    plusButton: {
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      fontSize: '1.25rem',
      cursor: 'pointer',
      lineHeight: '1',
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      fontSize: '1.25rem',
      cursor: 'pointer',
      lineHeight: '1',
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    completedTask: {
      textDecoration: 'line-through',
      color: '#aaa',
    },
    divider: {
      borderTop: '1px solid #555',
      margin: '1rem 0',
    },
  };

  const [incompleteTasks, completedTasks] = useMemo(() => {
    const sorted = [...tasks].sort((a, b) =>
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    return [
      sorted.filter((t) => !t.isCompleted),
      sorted.filter((t) => t.isCompleted),
    ];
  }, [tasks]);

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <span style={styles.heading}>🧠 Tasks</span>
        {!showInput && (
          <button onClick={() => setShowInput(true)} style={styles.createButton}>
            + Task
          </button>
        )}
      </div>

      {showInput && (
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="New task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <button onClick={handleAddTask} style={styles.plusButton}>+</button>
          <button onClick={handleCancel} style={styles.cancelButton}>×</button>
        </div>
      )}

      {incompleteTasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.description}</span>
        </div>
      ))}

      {completedTasks.length > 0 && <div style={styles.divider} />}

      {completedTasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
          />
          <span style={styles.completedTask}>{task.description}</span>
        </div>
      ))}
    </aside>
  );
}
