import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../components/ImageSlider.css';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from './Image.module.scss';
import * as _ from 'lodash';
import {apiRoute} from '../utils/api';

type Params = {
	id: string;
};

const ImageSlider = (): JSX.Element => {
	const { id } = useParams<Params>();
	const [slides, setSlides] = useState<string[]>([]);

	const fetchData = async () => {
		try {
			const { data } = await axios.get(`${apiRoute}/images/party-image/${id}`);
			setSlides(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={styles.gallery}>
			{ slides.length > 0 ? slides.map((link: string) => {
				return (
					<div key={_.uniqueId()} className={styles.gridItem}>
						<img  className={styles.image} src={link} />
					</div>
				);
			}) : null}
		</div>
	);
};

ImageSlider.propTypes = {
	slides: PropTypes.node,
	partyID: PropTypes.string,
};

export default ImageSlider;
