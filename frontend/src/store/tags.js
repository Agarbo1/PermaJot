import { csrfFetch } from "./csrf";

const SET_TAGS = "tags/SET_TAGS";
const ADD_TAG = "tags/ADD_TAG";
const UPDATE_TAG = "tags/UPDATE_TAG";
const DELETE_TAG = "tags/DELETE_TAG";

// Action Creators
export const setTags = (tags) => ({
  type: SET_TAGS,
  tags,
});
export const addTag = (tag) => ({
  type: ADD_TAG,
  tag,
});
export const updateTag = (tag) => ({
  type: UPDATE_TAG,
  tag,
});
export const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  tagId,
});
// Thunk Action Creators
export const fetchTags = () => async (dispatch) => {
  const response = await csrfFetch("/api/tags");
  if (response.ok) {
    const tags = await response.json();
    dispatch(setTags(tags));
  }
};
export const fetchTagDetails = (tagId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tagId}`);
  if (response.ok) {
    const tag = await response.json();
    dispatch(setTags([tag]));
  }
};
export const createTag = (tag) => async (dispatch) => {
  const response = await csrfFetch("/api/tags", {
    method: "POST",
    body: JSON.stringify(tag),
  });
  if (response.ok) {
    const newTag = await response.json();
    dispatch(addTag(newTag));
  }
};
export const updateTagDetails = (tag) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tag.id}`, {
    method: "PUT",
    body: JSON.stringify(tag),
  });
  if (response.ok) {
    const updatedTag = await response.json();
    dispatch(updateTag(updatedTag));
  }
};
export const deleteTagDetails = (tagId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tagId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteTag(tagId));
  }
};
// Reducer
const initialState = { tags: [] };
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, tags: action.tags };
    case ADD_TAG:
      return { ...state, tags: [...state.tags, action.tag] };
    case UPDATE_TAG:
      return {
        ...state,
        tags: state.tags.map((tag) =>
          tag.id === action.tag.id ? action.tag : tag
        ),
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.tagId),
      };
    default:
      return state;
  }
};

export default tagsReducer;
