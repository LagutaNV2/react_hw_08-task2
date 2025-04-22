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

  // Набор условий действует для каждого из компонентов (label) независимо,
  // потому что каждый компонент использует свой собственный экземпляр хука useJsonFetch
  // Состояния data, loading и error одного компонента не влияют на состояния другого компонента
  // порядок гарантирует, что только одно из трёх состояний (loading, error, data)
  // будет отображаться в любой момент времени.
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
