import {useState} from 'react';

export const useGet = <T>(url: string, defaultData?: T) => {
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<T | undefined>(defaultData);

  const get = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {method: 'GET'});

      if (response.ok) {
        setData(await response.json());
      } else {
        setError(await response.json());
      }
    } catch (error) {
      setError(error);
    }
  };

  return {get, data, loading, error};
};
