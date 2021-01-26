import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API = process.env.REACT_APP_UNSPLASH_API;

export default function useFetchImage(page, searchTerm) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = () => {
    const url =
      searchTerm === null ? 'photos?' : `search/photos?query=${searchTerm}&`;

    axios
      .get(`${API}/${url}client_id=${KEY}&page=${page}`)
      .then((res) => {
        searchTerm === null ? fetchRandom(res) : fetchSearch(res);

        setIsLoading(false);
      })
      .catch((e) => {
        setErrors(['Unable to fetch images']);
        setIsLoading(false);
      });
  };

  const fetchSearch = (res) => {
    page > 1
      ? setImages([...images, ...res.data.results])
      : setImages([...res.data.results]);
  };

  const fetchRandom = (res) => {
    setImages([...images, ...res.data]);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [page, searchTerm]);

  //   useEffect(() => {
  //     if (searchTerm === null) return;
  //     setIsLoading(true);
  //     fetch();
  //   }, [searchTerm]);

  return [images, setImages, errors, isLoading];
}
