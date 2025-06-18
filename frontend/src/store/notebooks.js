import { csrfFetch } from './csrf';

const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const SET_NOTEBOOK_NOTES = 'notebooks/SET_NOTEBOOK_NOTES';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const REMOVE_NOTEBOOK = 'notebooks/REMOVE_NOTEBOOK';

// Action Creators
export const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  notebooks,
});

export const addNotebook = (notebook) => ({
  type: ADD_NOTEBOOK,
  notebook,
});

export const setNotebookNotes = (notebookId, notes) => ({
  type: SET_NOTEBOOK_NOTES,
  notebookId,
  notes,
});

export const updateNotebook = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  notebook,
});

export const removeNotebook = (id) => ({
  type: REMOVE_NOTEBOOK,
  id,
});

// Thunk Actions
export const fetchNotebooks = () => async (dispatch) => {
  const res = await csrfFetch('/api/notebooks');
  if (res.ok) {
    const data = await res.json(); // { notebooks: [...] }
    dispatch(setNotebooks(data.notebooks)); // ✅ extract the array
  }
};

export const fetchNotebookDetails = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`);
  if (response.ok) {
    const notebook = await response.json();
    dispatch(setNotebooks([notebook]));
  }
};

export const createNotebook = (notebook) => async (dispatch) => {
  const response = await csrfFetch('/api/notebooks', {
    method: 'POST',
    body: JSON.stringify(notebook),
  });
  if (response.ok) {
    const newNotebook = await response.json();
    dispatch(addNotebook(newNotebook));
    return newNotebook;
  }
};

export const fetchNotebookNotes = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}/notes`);
  if (response.ok) {
    const notes = await response.json();
    dispatch(setNotebookNotes(notebookId, notes));
  }
};

export const editNotebook = (notebook) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
    method: 'PUT',
    body: JSON.stringify(notebook),
  });
  if (response.ok) {
    const updatedNotebook = await response.json();
    dispatch(updateNotebook(updatedNotebook));
    return updatedNotebook;
  }
};

export const deleteNotebook = (notebookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeNotebook(notebookId));
  }
};

const initialState = {
  notebooks: {},
  notebookNotes: {},
};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTEBOOKS: {
      const normalized = {};
      if (!Array.isArray(action.notebooks)) {
        console.error('Expected array for notebooks, got:', action.notebooks);
        return state;
      }

      action.notebooks.forEach((notebook) => {
        normalized[notebook.id] = notebook;
      });

      return {
        ...state,
        notebooks: normalized,
      };
    }

    case ADD_NOTEBOOK:
    case UPDATE_NOTEBOOK: {
      return {
        ...state,
        notebooks: {
          ...state.notebooks,
          [action.notebook.id]: action.notebook,
        },
      };
    }

    case REMOVE_NOTEBOOK: {
      const newNotebooks = { ...state.notebooks };
      delete newNotebooks[action.id];
      return {
        ...state,
        notebooks: newNotebooks,
      };
    }

    case SET_NOTEBOOK_NOTES:
      return {
        ...state,
        notebookNotes: {
          ...state.notebookNotes,
          [action.notebookId]: action.notes,
        },
      };

    default:
      return state;
  }
};


export default notebooksReducer;
