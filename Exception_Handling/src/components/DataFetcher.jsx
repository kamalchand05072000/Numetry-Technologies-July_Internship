import React, { useEffect, useState } from 'react';
import { fetchData } from '../apiService';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('/posts'); 
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="data-container">
      <h1>Data Fetched from API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
