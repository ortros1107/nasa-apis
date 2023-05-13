"use client"
import {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  axios.get(url)
  .then(response => {
    setData(response.data);
    console.log(response.data);
  })
  .catch(err => {
    setError(err);
  })
  .finally(() => {
    setIsLoading(false);
  });
  }, [url])
  
  return {data, isLoading, error};
}

export default useFetch