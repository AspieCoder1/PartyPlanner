import React, { Component } from 'react';
import { Store } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { Mongoose } from 'mongoose';
import PropTypes from 'prop-types';
import * as FormData from 'form-data';
import ImageSlider from '../components/ImageSlider';

// Using this component:   <ImageUpload partyID={'testParty'} />  partyID needs to be passed


const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

class ImageUpload extends Component {
 
    constructor(props) {
        super(props);
		

        this.state = { 
			file: null,
		};
	}

	handleChange(e){
		let file = e.target.files[0];
		this.setState({ 
            file: file,
        });
	}

	handleUpload(e){
		const partyID = this.props.partyID;
		console.log(partyID);
		
		let file = this.state.file;
		let formData = new FormData();

		formData.append('image', file);

		const res = axios.post(`${apiRoute}/api/images/uploadimage/${partyID}`,{formData});
		alert('Your image has been uploaded successfully');
	}

 
    render() {
        return (
			<>
            <div>
				<label>Select File    </label>
				<input type="file" name="file" accept="image/png, image/jpeg" onChange={(e)=>this.handleChange(e)} />
				<button type="button" onClick={(e)=>this.handleUpload(e)}>Upload</button>
			</div>
			<br/><br/>
			<div>
				<ImageSlider partyID={this.props.partyID}/>
			</div>
			</>
        );
    }
}

ImageUpload.propTypes = {
	userName: PropTypes.string,
	partyID: PropTypes.string,
};
export default ImageUpload;
