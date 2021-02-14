import React from 'react';
import { MainComponent } from './components/organisms/MainComponent';
import { Provider } from 'react-redux';
import './App.css';
import { configureStore } from './store';

function App() {

  const store = configureStore();

  return (
    <div>
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
