import {useState} from 'react';

export const usePost = <T>(url: string, defaultData?: T) => {
  const [data, setData] = useState<T | undefined>(defaultData);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const setDefault = () => {
    setSuccess(false);
    setLoading(true);
    setError(undefined);
    setData(defaultData);
  };

  const post = async (params?: {json?: {}; query?: {}}) => {
    try {
      setDefault();
      const response = await fetch(
        url + '?' + new URLSearchParams(params?.query),
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params?.json),
        },
      );

      if (response.ok) {
        setSuccess(true);
        setLoading(false);
        setData(await response.json());
        return true;
      } else {
        setLoading(false);
        setError(await response.text());
        return false;
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      return false;
    }
  };

  return {post, data, success, loading, error};
};
