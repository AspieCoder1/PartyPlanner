import React, { ChangeEvent, useState } from 'react';
import ImageSlider from './ImageSlider';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from './shared/Header';
import styles from './Image.module.scss';
import ReactModal from 'react-modal';
import headerStyles from './shared/Header.module.scss';
import { Link } from 'react-router-dom';
import {apiRoute} from '../utils/api';
// Using this component:   <ImageUpload partyID={'testParty'} />  partyID needs to be passed

type Params = {
	id: string;
};

const ImageUpload = (): JSX.Element => {
	const { id } = useParams<Params>();
	const [file, setFile] = useState<File>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const openModal = () => {
		setModalOpen((modalOpen: boolean) => !modalOpen);
	};

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
			await axios.post(`${apiRoute}/images/uploadimage/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			openModal();
		}
	};

	return (
		<>
			<Header>
				<Link className={headerStyles.headerLink} to={'/dashboard'}>Dashboard</Link>
				<Link className={headerStyles.headerLink} to={`/chat/${id}`}>Chat</Link>
				<Link className={headerStyles.headerLink} to={`/party/${id}`}>Party</Link>
				<button className={headerStyles.headerLink} onClick={openModal}>Add image</button>
			</Header>
			<div>
				<ImageSlider partyID={id} />
			</div>
			<ReactModal className={styles.modal} overlayClassName={styles.overlay} isOpen={modalOpen}>
				<div className={styles.header}>
					<h1>Upload an image</h1>
					<button className={styles.closeButton} onClick={openModal}>&times;</button>
				</div>
				<div className={styles.container}>
					<input type='file' name='file' accept='image/png, image/jpeg' onChange={onChange} />
					<button className={styles.buttonSubmit} type='button' onClick={upload}>
						Upload
					</button>
				</div>
			</ReactModal>

		</>
	);
};

export default ImageUpload;
