import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function usePhotos(querySearch, pageIndex) {
	const [error, setError] = useState({
		msg: '',
		state: false,
	});

	const [photos, setPhotos] = useState([]);
	const [maxPages, setMaxPages] = useState(0);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch(
			`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${
				import.meta.env.VITE_UNSPLASH_KEY
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPhotos(data.results);
				setMaxPages(data.total_pages);
				setLoading(false);
			});
	}, [querySearch, pageIndex]);
	return { error, photos, maxPages, loading };
}
