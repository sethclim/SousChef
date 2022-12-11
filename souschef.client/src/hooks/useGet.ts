import {useState} from 'react';

export const useGet = <T>(url: string, defaultData?: T) => {
  const [data, setData] = useState<T | undefined>(defaultData);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const get = async () => {
    try {
      setSuccess(false);
      setLoading(true);
      const response = await fetch(url, {method: 'GET'});

      if (response.ok) {
        setSuccess(true);
        setLoading(false);
        setData(await response.json());
      } else {
        setLoading(false);
        setError(await response.text());
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {get, data, success, loading, error};
};
