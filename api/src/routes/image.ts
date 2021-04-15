import * as express from 'express';
import * as _ from 'lodash';
import { IImage, Image } from '../models/image';
import { ImageService } from '../image/ImageService';
import * as multer from 'multer';
import { memoryStorage } from 'multer';
import * as path from 'path';
import { ImgurClient } from 'imgur';


const imageRouter: express.Router = express.Router();
const storage = memoryStorage();
const upload = multer({storage});
const client = new ImgurClient({
	username: 'partyplannerx1',
	password: 'UOM2021abc',
	clientId: '32d18e1fe0b8209',
});


export default imageRouter;

//Upload Image
imageRouter.post(
	'/uploadimage/:pid',
	upload.single('image'),
	async (req: express.Request, res: express.Response) => {
		try {
			const uploadImage = new ImageService();
			const imagePath = path.join(__dirname, 'testimage.png');
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const {data} = await client.upload({
				image: req.file.buffer.toString('base64'),
				title: req.file.originalname,
			});

			const ImageToAdd: IImage = new Image({
				partyId: req.params.pid,
				link: data.link
			});

			const newImage: IImage = new Image(ImageToAdd);
			await newImage.save();
			res.status(200).json({id: newImage._id, ...ImageToAdd});
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
				res.status(200).json(foundImages); // send to  party image html page
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
