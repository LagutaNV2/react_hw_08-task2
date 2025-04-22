import { useState } from 'react';

interface UseJsonFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string | object | null;
}
/**
 * Хук для выполнения JSON-запросов с обработкой ошибок и состоянием загрузки.
 *
 * @param url - URL для запроса.
 * @param opts - Опции запроса (метод, заголовки, тело).
 * @returns Массив из данных, состояния загрузки, ошибки, функции для повторного запроса и сброса состояния.
 */
function useJsonFetch<T = {}>(url: string, opts: UseJsonFetchOptions = {}): [T | null, boolean, Error | null, () => void, () => void] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: opts.method || 'GET',
        headers: opts.headers || {},
        body: opts.body ? JSON.stringify(opts.body) : undefined,
      });

      // Попытка распарсить JSON
      let jsonData: T | null = null;
      try {
        jsonData = await response.json();
      } catch (parseErr) {
        throw new Error('Parsing error');
      }

      if (!response.ok) {
        // Если HTTP-статус не успешный, но JSON был распарсен, устанавливаем ошибку ответа
        setError(new Error(`${JSON.stringify(jsonData)}, Status: ${response.status}`));
      } else {
        // Если HTTP-статус успешный, устанавливаем данные
        setData(jsonData);
      }
    } catch (err) {
      // Обработка ошибок (сетевых или парсинга)
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return [data, loading, error, fetchData, resetState];
}

export default useJsonFetch;
