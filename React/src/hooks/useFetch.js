import { useState, useEffect } from 'react';

export const useFetch = (initialUrl, initialOptions) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState(); 
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setData(json.data);
      

    } catch (e) {
      setError(e);
    }
    setLoading(false);
    setRefresh(!refresh);
  }


  useEffect(() => {
    console.log(url)

    setLoading(true);
    setError(undefined);
    setRefresh(refresh);
   
    fetchData();
  }, [url, options]);

  return { data, error, loading, setUrl, setOptions };
}