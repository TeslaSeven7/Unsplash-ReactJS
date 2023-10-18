import React from 'react';
import { useState, useEffect, useRef } from 'react';
import spinner from '../assets/spinner.svg';
import usePhotos from '../hooks/usePhotos';

import LastPhoto from './LastPhoto';
import Photos from './Photos';
export default function List() {
	const [query, setQuery] = useState('random');
	const [pageNumber, setPageNumber] = useState(1);
	const photosApiData = usePhotos(query, pageNumber);
	const lastPicRef = useRef();
	const searchRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		if (searchRef.current.value !== query) {
			setQuery(searchRef.current.value);
			setPageNumber(1);
		}
	}
	function updateContent() {
		setPageNumber(pageNumber + 1);
	}
	return (
		<>
			<h1 className='text-4xl'>Unsplash Clone</h1>
			<form onSubmit={handleSubmit}>
				<label
					className='block mb-4'
					htmlFor='action'>
					Search images
				</label>
				<input
					ref={searchRef}
					className='block w-full mb-14 text-slate-800 py-3 px-2 text-md rounded outline-gray-500 border broder-slate-400'
					placeholder='Look for something....'
					type='text'
				/>
			</form>
			{photosApiData.error.state && <p>{photosApiData.error.msg}</p>}
			{photosApiData.photos.length === 0 &&
				!photosApiData.error.state &&
				!photosApiData.loading && <p>No image available for this query</p>}
			<ul className='grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center'>
				{!photosApiData.loader &&
					photosApiData.photos.length !== 0 &&
					photosApiData.photos.map((photo, index) => {
						if (photosApiData.photos.length === index + 1) {
							return (
								<LastPhoto
									keys={photo.id}
									updatePhotos={updateContent}
									photosApiData={photosApiData}
									source={photo.urls.regular}
									alt={photo.alt_description}
									refs={lastPicRef}
									pageNumber={pageNumber}
								/>
							);
						} else {
							return (
								<Photos
									keys={photo.id}
									source={photo.urls.regular}
									alt={photo.alt_description}
								/>
							);
						}
					})}
			</ul>
			{photosApiData.loading && photosApiData.error.state && (
				<img
					className='block mx-auto'
					src={spinner}
					alt='loader'
				/>
			)}
			{photosApiData.maxPages === pageNumber && (
				<p className='mt-10 mb-5 text-center'>
					No more images to show for that query
				</p>
			)}
		</>
	);
}
