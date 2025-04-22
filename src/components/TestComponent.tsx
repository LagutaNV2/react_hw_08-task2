import React from 'react';
import useJsonFetch from '../hooks/useJsonFetch';

interface TestComponentProps {
  url: string;
  label: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ url, label }) => {
  const [data, loading, error, fetchData, resetState] = useJsonFetch<{ status: string }>(url);

  const handleTestClick = () => {
    resetState();
    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  return (
    <div className="component">
      <h2>{label}</h2>
      <button onClick={handleTestClick}>Test</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} {/* Текст ошибки */}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default TestComponent;
