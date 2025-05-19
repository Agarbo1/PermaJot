// src/components/TaskFormModal/TaskFormModal.jsx
import TaskForm from '../TaskForm/TaskForm';
import { useModal } from '../../context/Modal';

export default function TaskFormModal({ task = {}, onSubmit }) {
  const { closeModal } = useModal();

  const handleSubmit = (formData) => {
    onSubmit(formData);
    closeModal(); // Close modal after form is submitted
  };

  return (
    <div className="task-form-modal">
      <h2>{task.id ? 'Edit Task' : 'Create Task'}</h2>
      <TaskForm task={task} onSubmit={handleSubmit} onCancel={closeModal} />
    </div>
  );
}
