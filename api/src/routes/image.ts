import * as express from 'express';
import * as _ from 'lodash';
import { IImage, Image } from '../models/image';
import * as multer from 'multer';
import { memoryStorage } from 'multer';
import * as FormData from 'form-data';
import axios from 'axios';


const imageRouter: express.Router = express.Router();
const storage = memoryStorage();
const upload = multer({storage});


export default imageRouter;

//Upload Image
imageRouter.post(
	'/uploadimage/:pid',
	upload.single('image'),
	async (req: express.Request, res: express.Response) => {
		try {
			const reqData = new FormData();
			reqData.append('image', req.file.buffer.toString('base64'));
			reqData.append('type', 'base64');
			const {data} = await axios.post('https://api.imgur.com/3/image', reqData, {
				headers: {
					Authorization: 'Client-ID 32d18e1fe0b8209',
					...reqData.getHeaders(),
				}
			});

			const link = data.data.link;
			const newImage: IImage = new Image({
				partyId: req.params.pid,
				link
			});

			await newImage.save();
			res.status(200).json({id: newImage._id, link: newImage.link});
		} catch (e) {
			console.log(e);
			res.status(500).json('Oops something went wrong');
		}
	}
);

// Fetch Party Images
imageRouter.get(
	'/party-image/:id',
	async (req: express.Request, res: express.Response) => {
		try {
			const idTofind = req.params.id;
			const foundImages = await Image.find({
				partyId: idTofind
			});
			if (_.isEmpty(foundImages)) {
				res.status(404).send('You have no parties');
			} else {
				res.status(200).json(foundImages.map((img: IImage) => img.link)); // send to  party image html page
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

imageRouter.delete(
	'/:id',
	async (req: express.Request, res: express.Response) => {
		const imageID = req.params.id;
		try {
			const delImage = await Image.findByIdAndDelete(imageID);
			if (!delImage) {
				res.status(404).send('No image of this id exists');
			} else {
				res.status(200).json(delImage);
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);
