import React, { ChangeEvent, useState } from 'react';
import ImageSlider from './ImageSlider';
import { useParams } from 'react-router';
import axios from 'axios';

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
					'Content-Type': 'multipart/form-data'
				}
			});
			alert('Image submitted');
		}

	};

	return (
		<>
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

// class ImageUpload extends Component {
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			file: null,
// 		};
// 	}
//
// 	handleChange(e) {
// 		let file = e.target.files[0];
// 		this.setState({
// 			file: file,
// 		});
// 	}
//
// 	handleUpload(e) {
// 		const partyID = this.props.partyID;
// 		console.log(partyID);
//
// 		let file = this.state.file;
// 		let formData = new FormData();
//
// 		formData.append('image', file);
//
// 		const res = axios.post(`${apiRoute}/api/images/uploadimage/${partyID}`, { formData });
// 		alert('Your image has been uploaded successfully');
// 	}
//
// 	render() {
// 		return (
// 			<>
// 				<div>
// 					<label>Select File </label>
// 					<input type='file' name='file' accept='image/png, image/jpeg' onChange={(e) => this.handleChange(e)} />
// 					<button type='button' onClick={(e) => this.handleUpload(e)}>
// 						Upload
// 					</button>
// 				</div>
// 				<br />
// 				<br />
// 				<div>
// 					<ImageSlider partyID={this.props.partyID} />
// 				</div>
// 			</>
// 		);
// 	}
// }
//
// ImageUpload.propTypes = {
// 	userName: PropTypes.string,
// 	partyID: PropTypes.string,
// };
export default ImageUpload;
