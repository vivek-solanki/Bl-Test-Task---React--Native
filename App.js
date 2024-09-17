import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import { loadCartFromStorage } from './src/redux/cartSlice';

export default function App() {
  useEffect(() => {
    loadCartFromStorage(store.dispatch);
  }, []);
  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
}
