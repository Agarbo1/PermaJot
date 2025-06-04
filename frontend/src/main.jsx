import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';
import { ModalProvider } from "./context/Modal";
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
  </BrowserRouter>
</Provider>
);
