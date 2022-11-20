import {useState} from 'react';

export const useGet = (url: string) => {
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>(null);

  const get = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {method: 'GET'});
      setData(await response.json());
    } catch (error) {
      setError(error);
    }
  };

  return {get, data, loading, error};
};
