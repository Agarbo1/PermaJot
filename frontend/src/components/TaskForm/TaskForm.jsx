// src/components/TaskForm/TaskForm.jsx
import { useState } from 'react';

export default function TaskForm({ task = {}, onSubmit, onCancel }) {
  const [description, setDescription] = useState(task.description || '');
  const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...task, // include id if editing
      description: description.trim(),
      isCompleted,
    };

    onSubmit(formData); // Parent component handles dispatch or save logic
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Task</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted((prev) => !prev)}
          />
          Completed
        </label>
      </div>

      <div className="task-form-buttons">
        <button type="submit">{task.id ? 'Update' : 'Create'} Task</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
