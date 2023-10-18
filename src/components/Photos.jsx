import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
export default function Photos(props) {
	const [showModal, setShowModal] = useState(false);
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
