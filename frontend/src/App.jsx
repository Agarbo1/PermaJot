import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { restoreUser } from './store/session';
import getRoutes from './Routes';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const element = useRoutes(getRoutes({ isLoaded }));

  return element;
}

export default App;
