import React from 'react';
import TestComponent from './components/TestComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Custom Fetch Hook примеры:</h1>
      <TestComponent url="http://localhost:7070/data" label="1. Успешная загрузка" />
      <TestComponent url="http://localhost:7070/error" label="2. Ошибка ответа" />
      <TestComponent url="http://localhost:7070/dataX" label="3. Ошибка парсинга" />
      <TestComponent url="http://localhost:7070/loading" label="4. Loading ..." />
    </div>
  );
};

export default App;
