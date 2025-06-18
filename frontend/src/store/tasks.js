import { csrfFetch } from './csrf';

const SET_TASKS = 'tasks/SET_TASKS';
const ADD_TASK = 'tasks/ADD_TASK';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';
const TOGGLE_TASK = 'tasks/TOGGLE_TASK';

// Action Creators
export const setTasks = (tasks) => ({
  type: SET_TASKS,
  tasks,
});
export const addTask = (task) => ({
  type: ADD_TASK,
  task,
});
export const updateTask = (task) => ({
  type: UPDATE_TASK,
  task,
});
export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId,
});
export const toggleTask = (task) => ({
  type: TOGGLE_TASK,
  task,
});

// Thunk Action Creators
export const fetchTasks = () => async (dispatch) => {
  const response = await csrfFetch('/api/tasks');
  if (response.ok) {
    const tasks = await response.json();
    console.log('Fetched tasks:', tasks);
    dispatch(setTasks(tasks));
  }
};
export const createTask = (task) => async (dispatch) => {
  const response = await csrfFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
  if (response.ok) {
    const newTask = await response.json();
    dispatch(addTask(newTask));
  }
};
export const updateTaskDetails = (task) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
  if (response.ok) {
    const updatedTask = await response.json();
    dispatch(updateTask(updatedTask));
  }
};
export const removeTask = (taskId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${taskId}/toggle`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteTask(taskId));
  }
};
export const toggleTaskStatus = (taskId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${taskId}/toggle`, {
    method: 'PATCH',
  });
  if (response.ok) {
    const updatedTask = await response.json();
    dispatch(toggleTask(updatedTask));
  }
};
// Reducer
const initialState = [];

const tasksReducer = (state = initialState, action) => {
  console.log('🧠 tasksReducer received state:', state, 'action:', action);
  switch (action.type) {
    case SET_TASKS:
      return action.tasks; // should be an array
    case ADD_TASK:
      return [...state, action.task];
    case UPDATE_TASK:
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.taskId);
    default:
      return state;
  }
};



export default tasksReducer;
