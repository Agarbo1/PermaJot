import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import notebooksReducer from "./notebooks.js";
import notesReducer from "./notes.js";
import tagsReducer from "./tags.js";

const rootReducer = combineReducers({
  session: sessionReducer,
  notebooks: notebooksReducer,
  notes: notesReducer,
  tags: tagsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
