import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
export default function LastPhoto(props) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (props.refs.current) {
			const observer = new IntersectionObserver(([entry]) => {
				if (
					entry.isIntersecting &&
					props.photosApiData.maxPages !== props.pageNumber
				) {
					props.refs.current = null;
					observer.disconnect();
					props.updatePhotos();
				}
			});
			observer.observe(props.refs.current);
		}
	}, [props.photosApiData]);
	return (
		<>
			<li
				key={props.keys}
				ref={props.refs}>
				<img
					onClick={() => setShowModal(!showModal)}
					className='w-full h-full object-cover'
					src={props.source}
					alt={props.alt}
				/>
			</li>
			{showModal &&
				createPortal(
					<ModalContent
						source={props.source}
						closeModal={() => setShowModal(!showModal)}
					/>,
					document.body
				)}
		</>
	);
}
