import React from 'react';
import { useState, useEffect, useRef } from 'react';
import spinner from '../assets/spinner.svg';
export default function List() {
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
		</>
	);
}
