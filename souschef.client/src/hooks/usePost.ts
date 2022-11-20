import {useState} from 'react';

export const usePost = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  const post = async (json: {}): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        setData(await response.json());
        return true;
      } else {
        setError(await response.json());
        return false;
      }
    } catch (error) {
      setError(error);
      return false;
    }
  };

  return {post, data, loading, error};
};
