import { csrfFetch } from './csrf';

const SET_NOTES = 'notes/SET_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const SET_NOTE_TAG = 'notes/SET_NOTE_TAGS';
const REMOVE_NOTE_TAG = 'notes/REMOVE_NOTE_TAG';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

// Action Creators
export const setNotes = (notes) => ({
  type: SET_NOTES,
  notes,
});
export const addNote = (note) => ({
  type: ADD_NOTE,
  note,
});
export const setNoteTags = (noteId, tags) => ({
  type: SET_NOTE_TAG,
  noteId,
  tags,
});
export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  note,
});
export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId,
});


export const fetchNotebookNotes = (notebookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/notebook/${notebookId}`);
  if (res.ok) {
    const notes = await res.json();
    dispatch(setNotes(notes));
  }
};

export const fetchNoteDetails = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`);
  if (response.ok) {
    const note = await response.json();
    dispatch(setNotes([note]));
  }
};

export const createNote = (note) => async (dispatch) => {
  const response = await csrfFetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const newNote = await response.json();
    dispatch(addNote(newNote));
  }
};

export const updateNoteDetails = (note) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${note.id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const updatedNote = await response.json();
    dispatch(updateNote(updatedNote));
  }
};

export const deleteNoteDetails = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteNote(noteId));
  }
};

export const fetchNoteTags = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}/tags`);
  if (response.ok) {
    const tags = await response.json();
    dispatch(setNoteTags(noteId, tags));
  }
};

export const addNoteTag = (noteId, tag) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}/tags`, {
    method: 'POST',
    body: JSON.stringify(tag),
  });
  if (response.ok) {
    const newTag = await response.json();
    dispatch(setNoteTags(noteId, newTag));
  }
};

export const removeNoteTag = (noteId, tagId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}/tags/${tagId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(fetchNoteTags(noteId));
  }
};

// Initial State
const initialState = {
  notes: [],
  noteTags: {},
};

// Reducer
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return { ...state, notes: action.notes };
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.note] };
    case SET_NOTE_TAG:
      return {
        ...state,
        noteTags: {
          ...state.noteTags,
          [action.noteId]: action.tags,
        },
      };
    case REMOVE_NOTE_TAG:
      return {
        ...state,
        noteTags: {
          ...state.noteTags,
          [action.noteId]: state.noteTags[action.noteId].filter(
            (tag) => tag.id !== action.tagId
          ),
        },
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.noteId),
      };
    default:
      return state;
  }
};

export default notesReducer;
