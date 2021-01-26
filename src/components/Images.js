import React, { useEffect, useRef, useState } from 'react';
import Image from './Image';
import useFetchImage from '../utils/hooks/useFetchImage';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../utils/hooks/useDebounce';

export default function Images() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );

  // const scrollPosition = useScroll();

  // const [newImageUrl, setNewImageUrl] = useState('');

  // const inputRef = useRef(null);
  // const varRef = useRef(images.length);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   varRef.current = varRef.current + 1;
  // });

  // const handleAdd = () => {
  //   if (newImageUrl != '') {
  //     setImages([newImageUrl, ...images]);
  //     setNewImageUrl('');
  //   }
  // };

  // const handleChange = (event) => {
  //   setNewImageUrl(event.target.value);
  // };

  // useEffect(() => {
  //   if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
  //     setPage(page + 1);
  //   }
  // }, [scrollPosition]);

  const handleRemove = (index) => {
    //setImages(images.filter((image, i) => i != index)); //filtered array

    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  const ShowImage = () => {
    return (
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        className="flex flex-wrap"
      >
        {images.map((img, index) => (
          <Image
            image={img.urls.regular}
            handleRemove={handleRemove}
            index={index}
            key={index}
          />
        ))}
      </InfiniteScroll>
    );
  };

  const debounce = useDebounce();

  const handleInput = (e) => {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  };

  return (
    <section>
      <div className="my-5">
        <input
          type="text"
          onChange={handleInput}
          className="w-full border rounded shadow p-2"
          placeholder="Search Image"
        />
      </div>

      {errors.length > 0 && (
        <div className="flex h-screen">
          <p className="m-auto">{errors[0]}</p>
        </div>
      )}
      {/* <p>Component is updated {varRef.current} times</p> */}
      <ShowImage />
      {isLoading && <Loading />}
      {/* {errors.length === 0 && (
        <button onClick={() => setPage(page + 1)}>Load More</button>
      )} */}
      {/* 
      <div className="flex justify-betwe en my-5">
        <div className="w-full">
          <input
            type="text"
            id="inputBox"
            ref={inputRef}
            className="p-2 border border-gray-800 shadow w-full"
            value={newImageUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            disabled={newImageUrl == ''}
            className={`p-2 text-white ml-2 ${
              newImageUrl != '' ? ' bg-green-600' : ' bg-green-300'
            }`}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div> */}
    </section>
  );
}
