import React from 'react';
import { useState, useEffect, useRef } from 'react';
import spinner from '../assets/spinner.svg';
import usePhotos from '../hooks/usePhotos';

export default function List() {
	const [query, setQuery] = useState('random');
	const [pageNumber, setPageNumber] = useState(1);
	const photosApiData = usePhotos(query, pageNumber);
	console.log(photosApiData);
	const lastPicRef = useRef();
	return (
		<>
			<h1 className='text-4xl'>Unsplash Clone</h1>
			<form>
				<label
					className='block mb-4'
					htmlFor='action'>
					Search for images
				</label>
				<input
					className='block w-full mb-14 text-slate-800 py-3 px-2 text-md rounded outline-gray-500 border broder-slate-400'
					placeholder='Look for something....'
					type='text'
				/>
			</form>
			<ul className='grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center'>
				{!photosApiData.loader &&
					photosApiData.photos.length !== 0 &&
					photosApiData.photos.map((photo, index) => {
						if (photosApiData.photos.length === index + 1) {
							return (
								<li
									key={photo.id}
									ref={lastPicRef}>
									<img
										className='w-full h-full object-cover border-4 border-red-500'
										src={photo.urls.regular}
										alt={photo.alt_description}
									/>
								</li>
							);
						} else {
							return (
								<li key={photo.id}>
									<img
										className='w-full h-full object-cover'
										src={photo.urls.regular}
										alt={photo.alt_description}
									/>
								</li>
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
		</>
	);
}
