import * as express from 'express';
import * as _ from 'lodash';
import { IImage, Image } from '../models/image';

const imageRouter: express.Router = express.Router();

export default imageRouter;

//Upload Image
imageRouter.post(
	'/upload/:uid/:pid/:link',

	async (req: express.Request, res: express.Response) => {
		try {
			const newImage: IImage = new Image({
				userId: req.params.uid,
				partyId: req.params.pid,
				link: req.params.link,
			});
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

//Delete Image
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
