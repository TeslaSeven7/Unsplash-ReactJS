import React from 'react';

export default function ModalContent(props) {
	return (
		<div
			className='modal-content '
			onClick={props.closeModal}>
			<div className='mx-auto'>
				<img
					className='max-h-[90vh]  shadow-xl shadow-black-500/80'
					src={props.source}
				/>
			</div>
		</div>
	);
}
