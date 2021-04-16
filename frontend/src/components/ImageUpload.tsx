import React, { ChangeEvent, useState } from 'react';
import ImageSlider from './ImageSlider';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from './shared/Header';
import styles from './Image.module.scss';

// Using this component:   <ImageUpload partyID={'testParty'} />  partyID needs to be passed

type Params = {
	id: string;
};

const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

const ImageUpload = (): JSX.Element => {
	const { id } = useParams<Params>();
	const [file, setFile] = useState<File>();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const image = e.target.files[0];
			if (image) {
				setFile(image);
			}
		}
	};

	const upload = async () => {
		const formData = new FormData();
		if (file) {
			formData.append('image', file);
			await axios.post(`${apiRoute}/api/images/uploadimage/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			alert('Image submitted');
		}
	};

	return (
		<>
			<Header></Header>
			<div>
				<label>Select File </label>
				<input type='file' name='file' accept='image/png, image/jpeg' onChange={onChange} />
				<button type='button' onClick={upload}>
					Upload
				</button>
			</div>
			<br />
			<br />
			<div>
				<ImageSlider partyID={id} />
			</div>
		</>
	);
};

export default ImageUpload;
